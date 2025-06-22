const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const blogRoutes = require('./routes/blog');
const expressLayouts = require('express-ejs-layouts');

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

app.use(expressLayouts);
app.set('layout', 'layout');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', blogRoutes);

app.listen(3000, () => {
  console.log('Xjera Blog running at http://localhost:3000');
});
