const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();
router.get('/', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => res.render('index', { blogs: result, title: '所有博客' }))
    .catch(err => console.log(err));
});
router.get('/create', (req, res) => res.render('create', { title: '创建一篇新博客' }));
router.get('/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then(result => res.render('details', { blog: result, title: '博客详情' }))
    .catch(() => res.status(404).render('404', { title: '博客未找到' }));
});
router.post('/', (req, res) => {
  new Blog(req.body).save()
    .then(() => res.redirect('/blogs'))
    .catch(err => console.log(err));
});
router.delete('/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => res.json({ redirect: '/blogs' }))
    .catch(err => console.log(err));
});
module.exports = router;