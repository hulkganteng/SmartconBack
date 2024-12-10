const db = require("../models/db");

const chatController = {
  // Mengambil semua pesan di room tertentu
  getMessages: (req, res) => {
    const { roomId } = req.params; // Mendapatkan room_id dari parameter URL

    if (!roomId) {
      return res.status(400).json({ message: "Room ID is required." });
    }

    db.query(
      "SELECT * FROM messages WHERE room_id = ? ORDER BY timestamp ASC",
      [roomId],
      (err, messages) => {
        if (err) {
          console.error("Error fetching messages:", err);
          return res.status(500).json({ message: "Error fetching messages." });
        }

        return res.status(200).json(messages); // Kirimkan semua pesan
      }
    );
  },

  // Mengirim pesan ke room tertentu
  sendMessage: (req, res) => {
    const { content, roomId } = req.body;
    const senderId = req.user.user_id; // Mengambil ID pengirim dari token

    if (!content || !roomId) {
      return res.status(400).json({ message: "Content and roomId are required." });
    }

    // Simpan pesan ke database
    db.query(
      "INSERT INTO messages (sender_id, room_id, content, timestamp) VALUES (?, ?, ?, NOW())",
      [senderId, roomId, content],
      (err, result) => {
        if (err) {
          console.error("Error saving message:", err);
          return res.status(500).json({ message: "Error saving message." });
        }

        return res.status(200).json({ message: "Message sent successfully." });
      }
    );
  },
};

module.exports = chatController;
