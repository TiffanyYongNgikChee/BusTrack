const express = require('express');
const app = express();
const port = 5001;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require('cors');
const bodyParser = require('body-parser');

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from frontend running on localhost:3000
  methods: ['GET', 'POST'],        // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization']  // Allowed headers
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ limit: "10mb" })); // Allow large image uploads

// MongoDB connection and models
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Admin:Admin@cluster0.uxdft.mongodb.net/DB11', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// Import Routes
const faceRoutes = require("./routes/faceRoutes");
app.use("/api", faceRoutes);

// Your routes and other middleware
app.post('/get-face-encoding', (req, res) => {
  // Handle your face encoding logic here
  res.send('Face encoding response');
});

app.listen(port, () => {
  console.log("Server running on http://localhost:5001");
});