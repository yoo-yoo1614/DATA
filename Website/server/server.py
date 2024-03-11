from fastapi import FastAPI
from PIL import Image
import io
import base64
from prediction import predict

from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

class PredictRequest(BaseModel):
    data_url: str
 
app = FastAPI()
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict/image")
async def predict_api(data: PredictRequest):
    try:
        # Extract base64 image data from data URL
        _, encoded_image = data.data_url.split(",", 1)
        decoded_image = base64.b64decode(encoded_image)

        # Convert image data to a PIL image
        image = Image.open(io.BytesIO(decoded_image))
      
        # Perform prediction
        prediction = predict(image)

        return {"prediction": prediction}
    except Exception as e:
        # Handle any errors that may occur during prediction
        return {"error": str(e)}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
