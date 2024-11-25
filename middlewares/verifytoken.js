const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Cek apakah header Authorization ada
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token tidak ditemukan atau tidak valid" });
  }

  const token = authHeader.split(" ")[1]; // Ambil token setelah "Bearer "

  try {
    // Verifikasi token dengan secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Tambahkan data token ke request object
    next(); // Lanjutkan ke middleware atau route handler berikutnya
  } catch (err) {
    console.error("JWT verification error:", err);

    // Tangani error berdasarkan jenisnya
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token telah kedaluwarsa" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token tidak valid" });
    }

    return res.status(500).json({ message: "Terjadi kesalahan pada verifikasi token" });
  }
};

module.exports = verifyToken;