const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Import controller untuk deteksi penyakit
const diseaseDetectionController = require("../controllers/diseaseDetectionController");

// Multer untuk deteksi penyakit
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/detection"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Menambahkan timestamp ke nama file
  },
});

const upload = multer({ storage: storage });

// Endpoint untuk upload gambar deteksi penyakit
router.post("/detect", upload.single("image"), diseaseDetectionController.detectDisease);

module.exports = router;
