const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();

// Blog index - display all blogs
router.get('/', (req, res) => {
  Blog.find().sort({ createdAt: -1 }) // sort by creation time descending
    .then(result => {
      res.render('index', { blogs: result, title: 'All Blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

// Redirect to the create new blog page
router.get('/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// View a single blog post
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
        res.status(404).render('404', { title: 'Blog not found' });
    });
});

// Create a new blog (handle POST request)
router.post('/', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
});

// Delete a blog
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      // AJAX request expects a JSON response
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
