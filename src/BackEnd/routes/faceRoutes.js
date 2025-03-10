const express = require("express");
const router = express.Router();
const { registerFace } = require("../controllers/faceController");

router.post("/register-face", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  }, registerFace);
  
  module.exports = router;