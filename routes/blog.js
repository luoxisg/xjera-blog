const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render('index', { posts });
});

router.get('/new', (req, res) => {
  res.render('new');
});

router.post('/new', async (req, res) => {
  const { title, content } = req.body;
  await Post.create({ title, content });
  res.redirect('/');
});

router.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', { post });
});

module.exports = router;
