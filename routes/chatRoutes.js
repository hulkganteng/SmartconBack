const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const { authenticateToken, authorizeRole } = require("../middlewares/authMiddleware"); // Pastikan middleware sudah ada

// Middleware untuk autentikasi
router.use(authenticateToken);

// Mendapatkan semua pesan di room tertentu
router.get("/:roomId/messages", chatController.getMessages);

// Mengirim pesan ke room tertentu
router.post("/send", authorizeRole("user"), chatController.sendMessage);

// Route untuk menghapus riwayat chat berdasarkan room_id
router.delete("/:roomId", authenticateToken, chatController.deleteChatHistory);


module.exports = router;
