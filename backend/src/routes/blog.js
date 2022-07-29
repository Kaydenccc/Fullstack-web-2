const express = require('express');
const router = express.Router();
const controllers = require('../controllers/blogs');

router.get('/blogs', controllers.getBlogs);
router.get('/blog/:search', controllers.getSearch);
router.post('/blog', controllers.postBlog);
router.get('/blog/:postID', controllers.getBlog);
router.put('/blog/:postID', controllers.updateBlog);
router.delete('/blog/:postID', controllers.deleteBlog);

module.exports = router;
