const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const axios = require("axios");

const registerFace = async (req, res) => {
  try {
    const { name, email, image } = req.body;

    if (!image || !name || !email) {
      return res.status(400).json({ message: "Missing data" });
    }

    // Convert base64 to image file
    const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
    const imagePath = path.join(__dirname, `../uploads/${email}.jpg`);
    fs.writeFileSync(imagePath, base64Data, "base64");

    // Send image to Python API for face encoding
    const pythonResponse = await axios.post("http://localhost:5001/get-face-encoding", { image });

    if (!pythonResponse.data.encoding) {
      return res.status(400).json({ message: "Face not detected" });
    }

    // Save user to MongoDB
    const newUser = new User({
      name,
      email,
      faceImage: `/uploads/${email}.jpg`,
      faceEncoding: pythonResponse.data.encoding, // Store encoding from Python API
    });

    await newUser.save();
    console.log("User registered successfully!");
    
    res.json({ message: "Face registered successfully!" });

  } catch (error) {
    console.error("Error in face registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerFace };
