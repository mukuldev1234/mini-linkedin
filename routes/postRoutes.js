const express = require("express");
const { createPost, getAllPosts, getPostsByUser } = require("../controllers/postController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect, createPost);
router.get("/feed", getAllPosts);
router.get("/user/:userId", getPostsByUser);

module.exports = router;
