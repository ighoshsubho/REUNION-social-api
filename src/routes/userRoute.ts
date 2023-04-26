import express from 'express';
import { validateToken } from '../controllers/authController'
import { getUserProfile } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/user', validateToken, getUserProfile);

export default userRouter;