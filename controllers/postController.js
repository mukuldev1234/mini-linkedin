const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const post = await Post.create({ content: req.body.content, author: req.user.id });
  res.json(post);
};

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "name").sort({ createdAt: -1 });
  res.json(posts);
};

exports.getPostsByUser = async (req, res) => {
  const posts = await Post.find({ author: req.params.userId }).populate("author", "name");
  res.json(posts);
};
