const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost
} = require("../controllers/postController");

router.post("/", authMiddleware, createPost);
router.get("/", getAllPosts);
router.get("/:id", getSinglePost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;