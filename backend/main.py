from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
import io
import base64
import os
import uuid
import shutil
from model import BrainTumorModel
from utils import preprocess_image, make_gradcam_heatmap, save_and_display_gradcam
import database

app = FastAPI(title="Brain Tumor Detection API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize model and database
tumor_model = BrainTumorModel()
database.init_db()

# Ensure uploads directory exists
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount static directory for serving images
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.get("/")
def read_root():
    return {"message": "Brain Tumor Detection API is running"}

@app.get("/history")
def get_history():
    return database.get_history()

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        # Save uploaded file
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        
        contents = await file.read()
        
        # Save to disk
        with open(file_path, "wb") as f:
            f.write(contents)

        processed_img, original_img = preprocess_image(contents)
        
        prediction, confidence, probabilities = tumor_model.predict(processed_img)
        
        # Save to database
        database.add_prediction(
            unique_filename, 
            prediction, 
            float(confidence), 
            [float(p) for p in probabilities]
        )
        
        # Grad-CAM
        last_conv_layer = tumor_model.get_last_conv_layer()
        heatmap_img_base64 = None
        
        if last_conv_layer:
            heatmap = make_gradcam_heatmap(processed_img, tumor_model.model, last_conv_layer.name)
            heatmap_buf = save_and_display_gradcam(original_img, heatmap)
            heatmap_img_base64 = base64.b64encode(heatmap_buf.getvalue()).decode('utf-8')

        return JSONResponse(content={
            "prediction": prediction,
            "confidence": f"{confidence*100:.2f}%",
            "heatmap": heatmap_img_base64,
            "probabilities": {
                "Glioma": float(probabilities[0]),
                "Meningioma": float(probabilities[1]),
                "No Tumor": float(probabilities[2]),
                "Pituitary": float(probabilities[3])
            }
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
