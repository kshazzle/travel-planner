const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
});

module.exports = mongoose.model("Location", LocationSchema);
