import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, UserDoc } from '../models/userModel';

interface LoginResponse {
  token: string;
  message: string;
}

export const login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
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