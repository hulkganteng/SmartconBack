const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const diseaseDetectionController = require("../controllers/diseaseDetectionController");

// Konfigurasi Multer untuk upload gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/detection"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Endpoint untuk upload gambar dan deteksi penyakit
router.post("/detect", upload.single("image"), diseaseDetectionController.detectDisease);

module.exports = router;
