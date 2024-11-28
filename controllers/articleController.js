const multer = require("multer");
const path = require("path");
const db = require("../models/db");

// Middleware untuk upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder tempat file disimpan
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Penamaan file unik dengan timestamp
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; // Validasi tipe file
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      cb(null, true); // File valid
    } else {
      cb(new Error("Hanya file gambar dengan format JPEG, JPG, atau PNG yang diperbolehkan!"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran file maksimal 5 MB
});

// Middleware untuk upload gambar
const uploadMiddleware = upload.single("image");

// Controller untuk mendapatkan semua artikel
const getAllArticles = (req, res) => {
  db.query("SELECT * FROM articles", (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: "Gagal mendapatkan artikel." });
    }
    res.status(200).json(results); // Mengembalikan semua artikel
  });
};

// Controller untuk mengunggah artikel
const uploadArticle = (req, res) => {
  const { title, content, author, categories } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null; // Path file gambar

  // Validasi input
  if (!title || !content || !author) {
    return res.status(400).json({ error: "Semua data wajib diisi!" });
  }

  // Simpan artikel ke database
  db.query(
    "INSERT INTO articles (title, content, author, categories, image, date) VALUES (?, ?, ?, ?, ?, NOW())",
    [title, content, author, categories, image],
    (err) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ error: "Gagal menyimpan artikel." });
      }
      res.status(201).json({ message: "Artikel berhasil diunggah!", image });
    }
  );
};

// Ekspor semua fungsi
module.exports = {
  getAllArticles,
  uploadArticle,
  uploadMiddleware,
};
