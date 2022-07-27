const express = require('express');
const router = express.Router();
const controllers = require('../controllers/blogs');

router.get('/blogs', controllers.getBlogs);
router.post('/blog', controllers.postBlog);
router.put('/blog/:postID', controllers.updateBlog);
router.delete('/blog/:postID', controllers.deleteBlog);

module.exports = router;
