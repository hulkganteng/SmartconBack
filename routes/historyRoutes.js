// routes/historyRoutes.js

const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");

// Endpoint untuk mengambil riwayat deteksi penyakit
router.get("/", historyController.getHistory);

module.exports = router;
