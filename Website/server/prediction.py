from io import BytesIO
import numpy as np
from PIL import Image
import tensorflow as tf


interpreter = None

labels = ['Chef', 'Doctor', 'Engineer', 'Journalist', 'Lawyer', 'Nurse', 'Pilot', 'Police', 'Professor']

def load_model(model_path):
    global interpreter
    interpreter = tf.lite.Interpreter(model_path=model_path)
    interpreter.allocate_tensors()
    print("Model loaded successfully")
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    print("Input details:", input_details)
    print("Output details:", output_details)


def predict(image: Image.Image):
    global interpreter
    if interpreter is None:
        load_model("mobilenet_v2.tflite")

    # Preprocess image
    image = image.resize((224, 224))
    image = np.array(image)
    image = (image.astype(np.float32) / 127.5) - 1.0
    image = np.expand_dims(image, axis=0)

    # Set input tensor
    input_details = interpreter.get_input_details()
    interpreter.set_tensor(input_details[0]['index'], image)

    # Perform inference
    interpreter.invoke()

    # Get output tensor
    output_details = interpreter.get_output_details()
    output_data = interpreter.get_tensor(output_details[0]['index'])

    # Post-process output_data
    output_data = np.squeeze(output_data)  # Remove single-dimensional entries
    top_k_indices = np.argsort(output_data)[::-1][:9]  # Get indices of top 9 predictions
    top_k_values = output_data[top_k_indices]  # Get corresponding probabilities

    # Format predictions
    predictions = [{'class': labels[index], 'confidence': str(confidence)} for index, confidence in zip(top_k_indices, top_k_values)]

    return predictions


def read_imagefile(file) -> Image.Image:
    image = Image.open(BytesIO(file))
    return image

