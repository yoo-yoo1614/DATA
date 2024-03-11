import base64
import requests

# URL of your FastAPI endpoint
url = "http://127.0.0.1:8000/predict/image"

# Path to the image file you want to send for prediction
image_path = "jpg_1.jpg"

# Read the image file as binary
with open(image_path, "rb") as file:
    image_data = file.read()

# Encode the image data as base64
encoded_image = base64.b64encode(image_data).decode("utf-8")

# Construct the request body with the data URL
payload = {"data_url": f"data:image/jpeg;base64,{encoded_image}"}

# Send a POST request to the FastAPI endpoint
response = requests.post(url, json=payload)

# Check the response
if response.status_code == 200:
    # Print the prediction result
    print(response.json())
else:
    # Print the error message
    print("Error:", response.text)

