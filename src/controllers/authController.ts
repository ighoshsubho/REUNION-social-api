import { RequestHandler, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config()

interface LoginResponse {
  token: string;
  message: string;
}

export const login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid user' });
      }
      const isPasswordValid = (password === user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
      const response: LoginResponse = {
        token,
        message: 'Login successful',
      };
      return res.json(response);
    } catch (error) {
      next(error);
    }
  };


  export const validateToken = async (
    req: any,
    res: Response,
    next
  ) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ message: 'Missing authorization token' });
    }
  
    try {
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedToken.id;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Invalid authorization token' });
    }
  }