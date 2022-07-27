const mongoose = require('mongoose');
const { Schema } = mongoose;

// ?! MODELS BLOG
const ModelBlog = Schema(
  {
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('blogs', ModelBlog);
