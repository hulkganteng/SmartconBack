const express = require("express");
const {
  register,
  login,
  updateProfile, 
} = require("../controllers/authController");
const uploadProfilePhoto = require("../middlewares/uploadprofile"); 

const router = express.Router();

// Route registrasi
router.post("/register", register);

// Route login
router.post("/login", login);

// Route update profil (nama dan foto)
router.put("/profile/:id", uploadProfilePhoto, updateProfile);

module.exports = router;
