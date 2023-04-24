import express from 'express';
import { login } from '../controllers/authController'
import { createPost, deletePost } from '../controllers/postController';

const postRoute = express.Router();

postRoute.post('/posts', login, createPost);
postRoute.delete('/:id', login, deletePost);

export default postRoute;