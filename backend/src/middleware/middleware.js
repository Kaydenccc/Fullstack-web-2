const multer = require('multer');
const express = require('express');
const path = require('path');

// ? CONFIG MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  }
  cb(null, false);
};

//? FUNGSI MIDDLEWARE
module.exports = function (app) {
  //?MIDDELWARE
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //?STATIC FILE
  app.use('/images', express.static(path.join(__dirname, '../../', 'images')));

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.use(multer({ storage, fileFilter }).single('image'));
};
