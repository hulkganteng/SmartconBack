// controllers/forumController.js
const db = require("../models/db"); // Pastikan Anda sudah memiliki koneksi database

// Ambil semua postingan forum
exports.getForumPosts = (req, res) => {
  db.query("SELECT * FROM forums", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results); // Mengirimkan daftar postingan forum
  });
};

// Buat postingan forum baru
exports.createForumPost = (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // Mengambil ID pengguna yang login

  db.query(
    "INSERT INTO forums (title, content, author_id) VALUES (?, ?, ?)",
    [title, content, userId],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Forum post created successfully!" });
    }
  );
};

// Hapus postingan forum
exports.deleteForumPost = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM forums WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: "Forum post deleted successfully!" });
  });
};

// Ambil komentar untuk sebuah postingan forum
exports.getForumPostComments = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM comments WHERE post_id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results); // Mengirimkan daftar komentar untuk postingan tertentu
  });
};

// Tambahkan komentar ke sebuah postingan forum
exports.createForumPostComment = (req, res) => {
  const { id } = req.params; // Ambil ID postingan
  const { content } = req.body; // Ambil konten komentar
  const userId = req.user.id; // Ambil ID pengguna yang sedang login

  db.query(
    "INSERT INTO comments (post_id, content, user_id) VALUES (?, ?, ?)",
    [id, content, userId],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Komentar berhasil ditambahkan!" });
    }
  );
};
