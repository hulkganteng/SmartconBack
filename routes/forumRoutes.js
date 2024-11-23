const express = require("express");
const { getForumPosts, createForumPost, deleteForumPost } = require("../controllers/forumController");
const { authenticateToken, authorizeRole } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getForumPosts);
router.post("/", authenticateToken, createForumPost);
router.delete("/:id", authenticateToken, authorizeRole("admin"), deleteForumPost);

module.exports = router;