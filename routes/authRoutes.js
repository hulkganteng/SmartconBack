const express = require("express");
const {
  register,
  login,
  updateProfile,
  getProfile, // Tambahkan fungsi controller untuk mendapatkan profil
} = require("../controllers/authController");
const uploadProfilePhoto = require("../middlewares/uploadprofile");

const router = express.Router();

// Route registrasi
router.post("/register", register);

// Route login
router.post("/login", login);

// Route untuk mendapatkan profil berdasarkan ID
router.get("/profile/:id", getProfile); // Endpoint GET untuk profil pengguna

// Route update profil (nama dan foto)
router.put("/profile/:id", uploadProfilePhoto, updateProfile);

module.exports = router;
