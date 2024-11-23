const db = require("../models/db");

exports.getForumPosts = (req, res) => {
  db.query("SELECT * FROM forums", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createForumPost = (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  db.query(
    "INSERT INTO forums (title, content, author_id) VALUES (?, ?, ?)",
    [title, content, userId],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Forum post created successfully!" });
    }
  );
};

exports.deleteForumPost = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM forums WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: "Forum post deleted successfully!" });
  });
};