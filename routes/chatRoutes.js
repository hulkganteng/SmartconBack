const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const { authenticateToken, authorizeRole } = require("../middlewares/authMiddleware");  // Pastikan import dengan benar

// Semua rute ini dilindungi oleh middleware autentikasi
router.use(authenticateToken);  // Middleware untuk autentikasi

// Contoh rute untuk mendapatkan riwayat pesan dari room
router.get("/:roomId/messages", chatController.getMessages);

// Contoh rute untuk mengirim pesan ke room (hanya jika pengguna memiliki role tertentu)
router.post("/send", authorizeRole("user"), chatController.sendMessage);  // Misalnya, hanya pengguna dengan role 'user' yang bisa mengirim pesan

module.exports = router;
