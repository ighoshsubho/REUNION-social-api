import { Request, Response } from 'express';
import { Document } from 'mongoose';
import Like from "../models/likeModel";

interface AuthenticatedRequest extends Request {
    user: {
      _id: any;
      id: string;
    };
  }

export const likePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;

    // Check if user has already liked the post
    const existingLike = await Like.findOne({ userId: userId, postId: postId });
    if (existingLike) {
      return res.status(400).json({ message: 'User has already liked the post' });
    }

    const newLike: Document = await Like.create({
      userId: userId,
      postId: postId,
    });

    return res.json(newLike);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const unlikePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;

    const deletedLike = await Like.findOneAndDelete({ userId: userId, postId: postId });

    if (!deletedLike) {
      return res.status(404).json({ message: 'Like not found' });
    }

    return res.json(deletedLike);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};