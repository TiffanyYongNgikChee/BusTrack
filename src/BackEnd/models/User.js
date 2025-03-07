const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  faceImage: { type: String, required: false }, // Path to the saved image
  faceEncoding: { type: Array, required: false }, // Face encoding array from Python API
});

module.exports = mongoose.model("User", UserSchema);
