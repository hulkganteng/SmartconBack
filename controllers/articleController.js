const db = require("../models/db");

exports.getAllArticles = (req, res) => {
  db.query("SELECT * FROM articles", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createArticle = (req, res) => {
  const { title, content, author, date, categories } = req.body;

  db.query(
    "INSERT INTO articles (title, content, author, date, categories) VALUES (?, ?, ?, ?, ?)",
    [title, content, author, date, categories],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Article created successfully!" });
    }
  );
};

exports.deleteArticle = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM articles WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: "Article deleted successfully!" });
  });
};