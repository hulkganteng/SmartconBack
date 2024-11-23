const express = require("express");
const { getAllArticles, createArticle, deleteArticle } = require("../controllers/articleController");
const { authenticateToken, authorizeRole } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getAllArticles);
router.post("/", authenticateToken, authorizeRole("admin"), createArticle);
router.delete("/:id", authenticateToken, authorizeRole("admin"), deleteArticle);

module.exports = router;