const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const CommentController = require('./controllers/CommentController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.delete('/posts/:id', PostController.delete);

routes.get('/posts', PostController.index);

// fileUpload for image
routes.post('/posts', upload.single('image'), PostController.store);

routes.post('/posts/:id/like', LikeController.store);

/// comments routers
routes.post('/posts/:id/comment', CommentController.store);

routes.delete('/posts/:id/comment', CommentController.destroy);


module.exports = routes;