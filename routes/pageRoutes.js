const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/login");
});

router.get("/register", (req, res) => {
  res.render("pages/register");
});

router.get("/dashboard", (req, res) => {
  res.render("pages/dashboard");
});

router.get("/create-post", (req, res) => {
  res.render("pages/createPost");
});

router.get("/post/:id", (req, res) => {
  res.render("pages/post", {
    postId: req.params.id
  });
});

module.exports = router;