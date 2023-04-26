import express from 'express';
import { validateToken } from '../controllers/authController'
import { createPost, deletePost, getAllPosts, getPost } from '../controllers/postController';

const postRoute = express.Router();

postRoute.post('/posts/:id', validateToken, createPost);
postRoute.delete('/posts/:id', validateToken, deletePost);
postRoute.get('/posts/:id', validateToken, getPost);
postRoute.get('/all_posts', validateToken, getAllPosts);

export default postRoute;