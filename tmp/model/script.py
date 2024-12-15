from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import requests

app = FastAPI()

try:
    model = joblib.load("model.pkl")
except FileNotFoundError:
    raise RuntimeError("Model file 'model.pkl' not found!")

class PredictionInput(BaseModel):
    gender: str
    relationship_status: str
    education: str
    location: str
    sports: list[str]
    favorite_teams: list[str]
    friends_count: int
    posts_count: int
    likes_count: int
    music_count: int

@app.post("/predict")
def predict_and_send(input_data: PredictionInput):
    server_url = "http://127.0.0.1:5000/upload_predictions"

    try:
        data = pd.DataFrame([{
            "gender": input_data.gender,
            "relationship_status": input_data.relationship_status,
            "education": input_data.education,
            "location": input_data.location,
            "sports": [input_data.sports],
            "favorite_teams": [input_data.favorite_teams],
            "friends_count": input_data.friends_count,
            "posts_count": input_data.posts_count,
            "likes_count": input_data.likes_count,
            "music_count": input_data.music_count
        }])

        predictions = model.predict(data).tolist()

        response = requests.post(server_url, json={"predictions": predictions})

        if response.status_code == 200:
            return {"message": "Predictions successfully sent to the server!", "predictions": predictions}
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
