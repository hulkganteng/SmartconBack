const db = require("../models/db");

const chatController = {
  getMessages: (req, res) => {
    const { roomId } = req.params;

    // Mengambil riwayat pesan dari room
    db.query("SELECT * FROM messages WHERE room_id = ? ORDER BY timestamp ASC", [roomId], (err, messages) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching messages" });
      }

      return res.status(200).json(messages);
    });
  },

  sendMessage: (req, res) => {
    const { content, roomId } = req.body;
    const senderId = req.user.user_id;  // Mengambil ID pengirim dari token

    if (!content || !roomId) {
      return res.status(400).json({ message: "Content and roomId are required" });
    }

    // Simpan pesan ke database
    db.query(
      "INSERT INTO messages (sender_id, room_id, content, timestamp) VALUES (?, ?, ?, NOW())",
      [senderId, roomId, content],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Error saving message" });
        }

        return res.status(200).json({ message: "Message sent successfully" });
      }
    );
  }
};

module.exports = chatController;
