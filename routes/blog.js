const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// 定义 Post 模型（可单独放在 models/Post.js）
const Post = mongoose.model('Post', new mongoose.Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}));

// 首页：列出所有文章
router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render('index', { posts });
});

// 新建文章页
router.get('/new', (req, res) => {
  res.render('new');
});

// 提交新文章
router.post('/new', async (req, res) => {
  const { title, content } = req.body;
  await Post.create({ title, content });
  res.redirect('/');
});

module.exports = router;
