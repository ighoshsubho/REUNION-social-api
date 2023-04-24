import { Router } from 'express';
import { followUser, unfollowUser } from '../controllers/followController';
import { login } from '../controllers/authController';

const followRoutes = Router();

followRoutes.post('/follow/:id', login, followUser);
followRoutes.post('/unfollow/:id', login, unfollowUser);

export default followRoutes;
