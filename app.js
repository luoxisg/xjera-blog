require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const blogRoutes = require('./routes/blogRoutes');

// Create Express app
const app = express();

// Connect to MongoDB
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
  .then((result) => {
    // Listen for requests after db connection is complete
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Database connected. Server is listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// Blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404 - Page Not Found' });
});