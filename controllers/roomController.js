const db = require("../models/db");

// Fungsi untuk membuat room baru
exports.createRoom = (req, res) => {
  const { roomName } = req.body;
  const userId = req.user.user_id; // ID pengguna yang membuat room

  db.query("INSERT INTO rooms (name, created_by) VALUES (?, ?)", [roomName, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to create room", error: err });
    }

    const roomId = result.insertId;
    // Tambahkan user ke room_members setelah room dibuat
    db.query("INSERT INTO room_members (room_id, user_id) VALUES (?, ?)", [roomId, userId], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Failed to add user to room", error: err });
      }

      res.status(200).json({ message: "Room created successfully", roomId });
    });
  });
};

// Bergabung ke room yang sudah ada
exports.joinRoom = (req, res) => {
  const { roomId } = req.body;
  const userId = req.user.user_id; // ID pengguna yang bergabung

  db.query("INSERT INTO room_members (room_id, user_id) VALUES (?, ?)", [roomId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to join room", error: err });
    }
    res.status(200).json({ message: "Joined room successfully", roomId });
  });
};

// Mengambil riwayat pesan dalam room tertentu
exports.getRoomHistory = (req, res) => {
  const { roomId } = req.params;

  db.query("SELECT * FROM messages WHERE room_id = ? ORDER BY timestamp ASC", [roomId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch room history", error: err });
    }
    res.json(results);
  });
};
