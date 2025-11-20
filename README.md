# Brain Tumor Detection App

A full-stack application for detecting brain tumors from MRI images using Deep Learning (VGG16).

## Features
- **MRI Upload**: Drag & drop interface for uploading MRI scans.
- **Tumor Classification**: Classifies images into Glioma, Meningioma, Pituitary, or No Tumor.
- **Explainability**: Uses Grad-CAM to visualize the regions of interest in the image.
- **Modern UI**: Built with React, Tailwind CSS, and Framer Motion.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Python, FastAPI, TensorFlow/Keras

## Setup Instructions

### Prerequisites
- Node.js and npm
- Python 3.8+

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the server:
   ```bash
   python main.py
   ```
   The API will run at `http://localhost:8000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The app will run at `http://localhost:5173`.

## Model Training
To train the model on your own dataset:
1. Organize your data in a `dataset` folder with subfolders for each class (`Glioma`, `Meningioma`, `No Tumor`, `Pituitary`).
2. Run the training script:
   ```bash
   python backend/train.py
   ```

## Note
The application currently uses an untrained model structure for demonstration if no weights are found. For accurate predictions, please train the model or place a trained `brain_tumor_model.h5` in the backend directory.
