const express = require("express");
const router = express.Router();
const { authenticateUser, getChatHistory } = require("../controllers/chatController");

// Route untuk mengambil riwayat chat berdasarkan roomId
router.get("/:roomId/history", authenticateUser, getChatHistory);

module.exports = router;
