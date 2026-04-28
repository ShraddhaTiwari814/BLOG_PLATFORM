const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = new Post({
      title,
      content,
      author: req.user.id
    });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getAllPosts = async (req, res) => {
  try {const posts = await Post.find().populate("author", "name email");

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email"
    );

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message
    }); }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not allowed"
      });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not allowed"
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({
      message: "Post deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,getSinglePost,
  updatePost,
  deletePost
};