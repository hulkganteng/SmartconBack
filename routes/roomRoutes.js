// routes/roomRoutes.js
const express = require("express");
const router = express.Router();
const { createRoom, joinRoom, getRoomHistory } = require("../controllers/roomController");

// Membuat room baru
router.post("/create", createRoom);

// Bergabung ke room yang ada
router.post("/join", joinRoom);

// Mengambil riwayat chat dalam room
router.get("/:roomId/history", getRoomHistory);

module.exports = router;
