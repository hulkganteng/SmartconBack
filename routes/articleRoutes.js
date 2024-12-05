const express = require("express");
const db = require("../models/db");

const {
  getAllArticles,
  getArticleById,
  uploadArticle,
  uploadMiddleware,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");

const { authenticateToken, authorizeRole } = require("../middlewares/authMiddleware"); // Import middleware

const router = express.Router();

// Route untuk mendapatkan semua artikel
router.get("/", getAllArticles);

// Route untuk mendapatkan artikel berdasarkan ID
router.get("/:id", getArticleById);

// Route untuk upload artikel baru dengan gambar, hanya bisa diakses oleh admin
router.post("/upload", authenticateToken, authorizeRole("admin"), uploadMiddleware, uploadArticle);

// Route untuk memperbarui artikel berdasarkan ID
router.put("/:id", authenticateToken, authorizeRole("admin"), uploadMiddleware, updateArticle);

// Route untuk menghapus artikel berdasarkan ID
router.delete("/:id", authenticateToken, authorizeRole("admin"), deleteArticle);

module.exports = router;
