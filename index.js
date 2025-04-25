const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const Contact = require("./models/Contacct");

const app = express();

// CORS config for Vercel frontend
app.use(cors({
  origin: "https://spialfrontend.vercel.app",
  credentials: true,
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb+srv://abhirambca2021:spiral@cluster0.efympxy.mongodb.net/spiralEd?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB error:", err));

app.post("/api/contact", async (req, res) => {
  const { name, number, email } = req.body;

  if (!name || !number || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newContact = new Contact({ name, number, email });
    await newContact.save();
    res.status(201).json({ message: "✅ Contact saved successfully!" });
  } catch (err) {
    console.error("❌ Error saving contact:", err);
    res.status(500).json({ message: "Server error." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
