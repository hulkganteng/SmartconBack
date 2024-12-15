const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    city,
    province,
    country,
    age,
    role = "user", // Role default adalah user
  } = req.body;

  // Foto default
  const defaultPhoto = "../upload/profiles/profile.png"; // Path foto default di server Anda

  // Validasi input
  if (!first_name || !last_name || !email || !password || !city || !province || !country || !age) {
    return res.status(400).json({ message: "Semua field wajib diisi." });
  }

  try {
    // Cek apakah email sudah terdaftar
    const emailCheck = await new Promise((resolve, reject) => {
      db.query("SELECT email FROM users WHERE email = ?", [email], (err, results) => {
        if (err) return reject(err);
        resolve(results.length > 0);
      });
    });

    if (emailCheck) {
      return res.status(409).json({ message: "Email sudah terdaftar." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database dengan foto default
    db.query(
      `INSERT INTO users 
      (first_name, last_name, email, password, city, province, country, age, role, photo) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name,
        last_name,
        email,
        hashedPassword,
        city,
        province,
        country,
        age,
        role, // Menggunakan role yang diterima dari request
        defaultPhoto, // Foto default
      ],
      (err) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Terjadi kesalahan pada server." });
        }
        res.status(201).json({ message: "User berhasil didaftarkan!" });
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validasi input email dan password
  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password wajib diisi." });
  }

  try {
    // Query ke database
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, users) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Terjadi kesalahan pada server." });
      }

      if (users.length === 0) {
        return res.status(404).json({ message: "Email tidak ditemukan." });
      }

      const user = users[0];

      // Verifikasi password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Password salah." });
      }

      // Buat token JWT
      const token = jwt.sign(
        { user_id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Kirim respons
      res.status(200).json({
        message: "Login berhasil.",
        token,
        user: {
          user_id: user.user_id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
          photo: user.photo,
        },
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params; // ID user dari parameter
  const { first_name, last_name } = req.body; // Data nama dari body request
  const photoPath = req.file ? `/uploads/profiles/${req.file.filename}` : null; // Path foto baru jika ada

  if (!first_name || !last_name) {
    return res.status(400).json({ message: "Nama depan dan nama belakang wajib diisi." });
  }

  try {
    // Buat query update
    const query = photoPath
      ? "UPDATE users SET first_name = ?, last_name = ?, photo = ? WHERE user_id = ?"
      : "UPDATE users SET first_name = ?, last_name = ? WHERE user_id = ?";
    const params = photoPath
      ? [first_name, last_name, photoPath, id]
      : [first_name, last_name, id];

    // Jalankan query untuk update data
    db.query(query, params, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Gagal memperbarui profil." });
      }

      // Ambil data user yang telah diperbarui
      db.query("SELECT * FROM users WHERE user_id = ?", [id], (err, users) => {
        if (err || users.length === 0) {
          console.error("Gagal mengambil data user setelah update:", err);
          return res.status(500).json({ message: "Gagal mengambil data user." });
        }

        res.status(200).json({
          message: "Profil berhasil diperbarui.",
          user: users[0], // Data user yang terbaru
        });
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

exports.getProfile = (req, res) => {
  const { id } = req.params; // Ambil ID user dari parameter

  // Query database untuk mendapatkan user berdasarkan ID
  db.query("SELECT * FROM users WHERE user_id = ?", [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    const user = results[0];

    // Tambahkan path lengkap untuk foto profil jika ada
    if (user.photo && !user.photo.startsWith('/uploads/profiles/')) {
      user.photo = `/uploads/profiles/${user.photo}`; // Tambahkan prefix hanya jika belum ada
    }
    

    res.status(200).json({
      message: "Data user berhasil diambil.",
      user,
    });
  });
};


