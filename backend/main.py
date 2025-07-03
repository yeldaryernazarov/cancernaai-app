# 🚀 lung-app-backend/main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse, FileResponse
import os, shutil
from modelloader import load_model
from utils.preproc import preprocess
from utils.postproc import save_prediction
import matplotlib.pyplot as plt
import numpy as np
import os
import torch

from fastapi.middleware.cors import CORSMiddleware




app = FastAPI()
model = load_model()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace * with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    input_tensor, resized_volume = preprocess(file_path)

    with torch.no_grad():
        cls_logits, risk_score, seg_output = model(input_tensor, stage='both')

    prob = torch.sigmoid(cls_logits)[0, 1].item()
    label = int(prob > 0.5)
    risk = risk_score.item()

    image_path = save_prediction(seg_output, resized_volume, '/Users/yeldar/Documents/Web apps/cancernaai_app/backend/static/r1.png')

    return {
        "label": label,
        "malignancy_probability": prob,
        "risk_score": risk,
        "segmentation_image_url": "/r1.png"
    }

@app.get("/r1.png")
def get_image():
    return FileResponse("/Users/yeldar/Documents/Web apps/cancernaai_app/backend/static/r1.png")
