import { RequestHandler, Request, Response } from 'express';
import { User } from '../models/userModel';

interface AuthenticatedRequest extends Request {
    user: {
      id: string;
    };
  }

export const followUser: RequestHandler = async (req: AuthenticatedRequest, res: Response, next) => {
  const { id } = req.params;
  const userId = req.params.id;

  try {
    const userToFollow = await User.findById(id);
    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (userToFollow.followers.includes(userId)) {
      return res
        .status(409)
        .json({ message: 'You are already following this user' });
    }

    userToFollow.followers.push(userId);
    await userToFollow.save();

    return res.json({ message: 'User followed successfully' });
  } catch (error) {
    next(error);
  }
};

export const unfollowUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const currentUser = req.params;
      const userToUnfollow = await User.findById(currentUser);
      const userId = req.params.id;

      if (!userToUnfollow) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      if (!userToUnfollow.followers.includes(userId)) {
        res.status(400).json({ message: 'You are not following this user' });
        return;
      }
  
      userToUnfollow.followers.pop(userId);
      await userToUnfollow.save();
  
      res.json({ message: 'Unfollowed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
