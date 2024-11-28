const express = require("express");
const db = require("../models/db");

const {
  getAllArticles,
  uploadArticle,
  uploadMiddleware,
} = require("../controllers/articleController");

const router = express.Router();

// Route untuk mendapatkan semua artikel
router.get("/", getAllArticles);

// Route untuk mendapatkan artikel berdasarkan ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  // Log ID untuk debugging
  console.log("Fetching article with ID:", id);

  // Query database untuk mendapatkan artikel berdasarkan ID
  db.query("SELECT * FROM articles WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Database error:", err.message); // Debugging log
      return res.status(500).json({ error: "Gagal mengambil artikel." });
    }

    if (results.length === 0) {
      console.log("Artikel tidak ditemukan untuk ID:", id); // Debugging log
      return res.status(404).json({ error: "Artikel tidak ditemukan." });
    }

    console.log("Artikel ditemukan:", results[0]); // Debugging log artikel
    res.status(200).json(results[0]); // Kirim data artikel
  });
});

// Route untuk upload artikel baru dengan gambar
router.post("/upload", uploadMiddleware, uploadArticle);

module.exports = router;