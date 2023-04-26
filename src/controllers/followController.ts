import { RequestHandler, Request, Response } from 'express';
import { User } from '../models/userModel';

interface AuthenticatedRequest extends Request {
    user: {
      _id: string;
    };
  }

export const followUser: RequestHandler = async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const userId = req.user._id;
    const followId = req.params.id;

    const user = await User.findById(userId);
    const followUser = await User.findById(followId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!followUser) {
      return res.status(404).json({ message: "Follow user not found" });
    }

    if (user.following.includes(followId)) {
      return res.status(400).json({ message: "User is already following this user" });
    }

    user.following.push(followId);
    followUser.followers.push(userId);

    await user.save();
    await followUser.save();

    return res.status(200).json({ message: "User followed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const unfollowUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const unfollowId = req.params.id;

    const user = await User.findById(userId);
    const unfollowUser = await User.findById(unfollowId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!unfollowUser) {
      return res.status(404).json({ message: "Unfollow user not found" });
    }

    if (!user.following.includes(unfollowId)) {
      return res.status(400).json({ message: "User is not following this user" });
    }

    const followingIndex = user.following.indexOf(unfollowId);
    const followersIndex = unfollowUser.followers.indexOf(userId);

    user.following.splice(followingIndex, 1);
    unfollowUser.followers.splice(followersIndex, 1);

    await user.save();
    await unfollowUser.save();

    return res.status(200).json({ message: "User unfollowed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
  };
