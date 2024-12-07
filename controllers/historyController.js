// historyController.js
const db = require("../models/db");

const getHistory = (req, res) => {
  const query = "SELECT * FROM history ORDER BY date DESC"; // Menampilkan riwayat berdasarkan tanggal terbaru
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching history:", err);
      return res.status(500).json({ message: "Gagal mengambil riwayat" });
    }
    res.status(200).json(results); // Kirim hasil query ke frontend
  });
};

module.exports = { getHistory };
