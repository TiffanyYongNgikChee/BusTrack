import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const Register = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  // Capture image from webcam
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  // Send image to backend
  const uploadImage = async (imageData) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/get-face-encoding",
        { image: imageData },  // Make sure the data is in JSON format
        {
          headers: {
            "Content-Type": "application/json", // ✅ Required to avoid 415 error
          },
        }
      );
  
      console.log("Face encoding received:", response.data);
      return response.data.encoding;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Register Your Face</h1>

      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="border rounded" />

      {image && <img src={image} alt="Captured" className="mt-4 border rounded" />}

      <button onClick={capture} className="mt-2 bg-blue-500 text-white p-2 rounded">Take Picture</button>
      <button onClick={() => uploadImage(image)} className="mt-2 bg-green-500 text-white p-2 rounded">
        Register Face
      </button>

      {message && <p className="mt-4 text-lg font-semibold">{message}</p>}
    </div>
  );
};

export default Register;
