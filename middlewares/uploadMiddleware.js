const express = require("express");
const { uploadArticle, uploadMiddleware } = require("../controllers/articleController");

const router = express.Router();

router.post("/upload", uploadMiddleware, uploadArticle);

module.exports = router;