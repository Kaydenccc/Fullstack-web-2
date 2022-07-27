const { Model } = require('mongoose');
const path = require('path');
const ModelBlog = require('../models/models');
const fs = require('fs');

module.exports = {
  //!GET ALL
  getBlogs: function (req, res) {
    ModelBlog.find(function (err, blog) {
      if (err) res.status(500).send(err);
      res.json({
        msg: 'Get Data Successfully',
        data: blog,
      });
    });
  },
  //!POST
  postBlog: function (req, res) {
    if (!req.body.author || !req.body.title || !req.body.body) {
      return res.status(401).json({ msg: 'Invalid Input' });
    }
    if (!req.file) {
      return res.status(422).json({ msg: 'Image harus ditambahkan' });
    }
    const data = {
      author: req.body.author,
      title: req.body.title,
      image: req.file.path,
      body: req.body.body,
    };
    ModelBlog.create(data, function (err, blog) {
      if (err) console.log(err);
      res.status(201).json({
        msg: 'Post blog successfully',
        data,
        timestamp: blog.timestamps,
      });
    });
  },
  //!UPDATE
  updateBlog: function (req, res) {
    if (!req.body.author || !req.body.title || !req.body.body) {
      return res.status(401).json({ msg: 'Invalid Input' });
    }
    const id = req.params.postID;

    ModelBlog.findById(id, function (err, blog) {
      if (err) console.log(err);
      let data;
      if (!req.file) {
        data = {
          author: req.body.author,
          title: req.body.title,
          image: blog.image,
          body: req.body.body,
        };
      } else {
        data = {
          author: req.body.author,
          title: req.body.title,
          image: req.file.path,
          body: req.body.body,
        };
        deleteFile(blog.image);
      }

      ModelBlog.findByIdAndUpdate(blog._id, data, function (err, blog) {
        if (err) return console.log(err);
        res.status(201).json({
          msg: 'Update Blogs successfully',
          data,
        });
      });
    });
  },
  //!DELETE
  deleteBlog: function (req, res) {
    const id = req.params.postID;
    ModelBlog.findByIdAndDelete(id, function (err, blog) {
      if (err) console.log(err);
      deleteFile(blog.image);
      res.status(201).json({
        msg: 'Delete blog successfully',
        data: blog,
      });
    });
  },
};
const deleteFile = (filePath) => {
  let fileDir = path.join(__dirname, '../..', filePath);
  fs.unlink(fileDir, (err) => console.log(err));
};
