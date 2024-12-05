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
    role = "user",  // Role default adalah user
  } = req.body;

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

    // Simpan user ke database
    db.query(
      `INSERT INTO users 
      (first_name, last_name, email, password, city, province, country, age, role) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name,
        last_name,
        email,
        hashedPassword,
        city,
        province,
        country,
        age,
        role,  // Menggunakan role yang diterima dari request
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
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Kirim respons
      res.status(200).json({
        message: "Login berhasil.",
        token,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};
