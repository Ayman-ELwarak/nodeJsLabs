const express = require('express');
const postsController = require('../controllers/posts');
const validate = require('../middlewares/validate');
const schema = require('../schemas')

const router = express.Router();

router.post('/', validate(schema.createPostSchema), postsController.createPost);

router.get('/', postsController.getAllPosts);

router.get('/:id', postsController.getPostById);

router.patch('/:id', postsController.updatePost)

router.delete('/:id', postsController.deletePost);

module.exports = router;