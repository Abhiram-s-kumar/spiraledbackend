const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
  email: String,
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);

