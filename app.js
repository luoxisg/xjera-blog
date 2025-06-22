require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`数据库连接成功，服务器正在监听端口 ${port}`);
    });
  })
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => res.redirect('/blogs'));
app.use('/blogs', blogRoutes);
app.use((req, res) => res.status(404).render('404', { title: '404 - 页面未找到' }));
