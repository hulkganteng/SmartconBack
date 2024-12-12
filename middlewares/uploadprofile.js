const multer = require("multer");
const path = require("path");

// Konfigurasi penyimpanan untuk file foto profil
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const profileUploadDir = path.join(__dirname, "../uploads/profiles");
    cb(null, profileUploadDir); // Tentukan folder penyimpanan
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Penamaan file dengan timestamp
  },
});

// Filter untuk memastikan hanya file gambar yang diterima
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".png", ".jpg", ".jpeg"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file gambar yang diizinkan!"), false);
  }
};

// Middleware multer
const uploadProfilePhoto = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // Maksimal ukuran file 2MB
});

module.exports = uploadProfilePhoto.single("photo");
