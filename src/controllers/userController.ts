import { Request, Response } from 'express';
import { User } from '../models/userModel';

interface AuthenticatedRequest extends Request {
    user: {
      _id: string;
    };
  }

export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { name, followers, following } = user;
    return res.json({ name, followers, following });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
