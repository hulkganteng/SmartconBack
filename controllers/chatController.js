// controllers/chatController.js

const db = require("../models/db"); // Jika Anda perlu mengakses database untuk riwayat chat, dll.
const jwt = require("jsonwebtoken");

// Fungsi untuk memeriksa autentikasi token
exports.authenticateUser = (req, res, next) => {
  const token = req.headers["authorization"];

  // Memeriksa apakah token ada dan memulai dengan 'Bearer'
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(403).json({ message: "No token provided or invalid format" });
  }

  // Mengambil token tanpa 'Bearer ' prefix
  const tokenString = token.split(' ')[1];

  jwt.verify(tokenString, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = decoded; // Menyimpan data pengguna di req.user
    next(); // Lanjutkan ke route selanjutnya
  });
};

// Fungsi untuk mengambil riwayat chat (jika diperlukan)
exports.getChatHistory = (req, res) => {
  const { roomId } = req.params;

  db.query("SELECT * FROM messages WHERE room_id = ?", [roomId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch chat history", error: err });
    }
    res.json(results); // Mengirim riwayat pesan dalam room tertentu
  });
};
