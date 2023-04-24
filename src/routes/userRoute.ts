import express from 'express';
import { login } from '../controllers/authController'
import { getUserProfile } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/user', login, getUserProfile);

export default userRouter;