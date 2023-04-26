import { Router } from 'express';
import { validateToken } from '../controllers/authController';
import { likePost, unlikePost } from '../controllers/likeController';

const likeRoute = Router();

likeRoute.post('/like/:id', validateToken, likePost);
likeRoute.post('/unlike/:id', validateToken, unlikePost);

export default likeRoute;