
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  }
}, { timestamps: true });

// Add text index for searching
blogSchema.index({ title: 'text', body: 'text' });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;

