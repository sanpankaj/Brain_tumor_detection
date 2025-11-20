from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import io
import base64
from model import BrainTumorModel
from utils import preprocess_image, make_gradcam_heatmap, save_and_display_gradcam

app = FastAPI(title="Brain Tumor Detection API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize model
tumor_model = BrainTumorModel()

@app.get("/")
def read_root():
    return {"message": "Brain Tumor Detection API is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        contents = await file.read()
        processed_img, original_img = preprocess_image(contents)
        
        prediction, confidence, probabilities = tumor_model.predict(processed_img)
        
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
