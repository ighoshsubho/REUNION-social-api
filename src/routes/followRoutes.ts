import { Router } from 'express';
import { followUser, unfollowUser } from '../controllers/followController';
import { validateToken } from '../controllers/authController';

const followRoutes = Router();

followRoutes.post('/follow/:id', validateToken, followUser);
followRoutes.post('/unfollow/:id', validateToken, unfollowUser);

export default followRoutes;
