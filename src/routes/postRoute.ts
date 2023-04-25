import express from 'express';
import { login } from '../controllers/authController'
import { createPost, deletePost, getAllPosts, getPost } from '../controllers/postController';

const postRoute = express.Router();

postRoute.post('/posts', login, createPost);
postRoute.delete('/posts/:id', login, deletePost);
postRoute.get('/posts/:id', login, getPost);
postRoute.get('/all_posts', login, getAllPosts);

export default postRoute;