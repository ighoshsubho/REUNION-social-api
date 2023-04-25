import { Router } from 'express';
import { login } from '../controllers/authController';
import { likePost, unlikePost } from '../controllers/likeController';

const likeRoute = Router();

likeRoute.post('/like/:id', login, likePost);
likeRoute.post('/unlike/:id', login, unlikePost);

export default likeRoute;