const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const blogRoutes = require('./routes/blog');

const app = express();

mongoose.connect('mongodb://localhost/xjera-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', blogRoutes);

app.listen(3000, () => {
  console.log('Xjera Blog running at http://localhost:3000');
});
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
