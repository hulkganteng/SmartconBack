// routes/forumRoutes.js
const express = require("express");
const { getForumPosts, createForumPost, deleteForumPost, getForumPostComments, createForumPostComment } = require("../controllers/forumController");
const { authenticateToken, authorizeRole } = require("../middlewares/authMiddleware"); // Pastikan autentikasi sudah benar
const router = express.Router();

// Endpoint untuk mengambil semua postingan forum
router.get("/", getForumPosts);

// Endpoint untuk membuat postingan forum baru (hanya untuk pengguna terautentikasi)
router.post("/", authenticateToken, createForumPost);

// Endpoint untuk menghapus postingan forum (admin saja)
router.delete("/:id", authenticateToken, authorizeRole("admin"), deleteForumPost);

// Endpoint untuk mengambil semua komentar dari postingan tertentu
router.get("/:id/comments", getForumPostComments);

// Endpoint untuk menambahkan komentar pada postingan tertentu
router.post("/:id/comments", authenticateToken, createForumPostComment);

module.exports = router;
