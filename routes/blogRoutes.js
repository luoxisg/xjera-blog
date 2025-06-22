const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();

// Blog index - display all blogs with search and pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6; // Blogs per page
  const searchQuery = req.query.search || '';

  try {
    let query = {};
    if (searchQuery) {
      query = { $text: { $search: searchQuery } };
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const count = await Blog.countDocuments(query);
    const totalPages = Math.ceil(count / limit);

    res.render('index', {
      blogs: blogs,
      title: 'All Blogs',
      totalPages: totalPages,
      currentPage: page,
      searchQuery: searchQuery
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching blogs');
  }
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
        if (result) {
            res.render('details', { blog: result, title: 'Blog Details' });
        } else {
            res.status(404).render('404', { title: 'Blog not found' });
        }
    })
    .catch(err => {
        res.status(404).render('404', { title: 'Blog not found' });
    });
});

// Show edit form for a blog post
router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
             if (result) {
                res.render('edit', { blog: result, title: 'Edit Blog Post' });
            } else {
                res.status(404).render('404', { title: 'Blog not found' });
            }
        })
        .catch(err => {
            res.status(404).render('404', { title: 'Blog not found' });
        });
});

// Update a blog post
router.put('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, req.body, { new: true }) // {new: true} returns the updated document
        .then(result => {
            res.redirect(`/blogs/${result._id}`);
        })
        .catch(err => {
            console.log(err);
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