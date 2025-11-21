import sqlite3
from datetime import datetime
import json

DB_NAME = "history.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            prediction TEXT NOT NULL,
            confidence REAL NOT NULL,
            probabilities TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def add_prediction(filename, prediction, confidence, probabilities):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''
        INSERT INTO predictions (filename, prediction, confidence, probabilities)
        VALUES (?, ?, ?, ?)
    ''', (filename, prediction, confidence, json.dumps(probabilities)))
    conn.commit()
    conn.close()

def get_history():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute('SELECT * FROM predictions ORDER BY timestamp DESC')
    rows = c.fetchall()
    conn.close()
    
    history = []
    for row in rows:
        history.append({
            "id": row["id"],
            "filename": row["filename"],
            "prediction": row["prediction"],
            "confidence": row["confidence"],
            "probabilities": json.loads(row["probabilities"]),
            "timestamp": row["timestamp"]
        })
    return history
