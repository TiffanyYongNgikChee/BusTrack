from flask import Flask, request, jsonify
import face_recognition
import numpy as np
import base64
import cv2
import os

app = Flask(__name__)

@app.route("/get-face-encoding", methods=["POST"])
def get_face_encoding():
    data = request.json
    image_data = data.get("image", "")

    if not image_data:
        return jsonify({"error": "No image received"}), 400

    # Convert base64 to OpenCV image
    image_bytes = base64.b64decode(image_data.split(",")[1])
    np_arr = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    # Detect face and get encoding
    face_locations = face_recognition.face_locations(image)
    if len(face_locations) == 0:
        return jsonify({"error": "No face detected"}), 400

    face_encodings = face_recognition.face_encodings(image, face_locations)

    return jsonify({"encoding": face_encodings[0].tolist()})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
