import { Request, Response } from 'express';
import Comment, { IComment } from '../models/commentModel';

interface AuthenticatedRequest extends Request {
    user: {
      _id: any;
      id: string;
    };
  }

export const addComment = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { comment } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;

    const postToComment = await Comment.findById({postId:postId});

    if (!postToComment) {
        res.status(404).json({ message: 'Post not found' });
        return;
      }

    const newComment: IComment = new Comment({
      post: postId,
      user: userId,
      comment,
    });

    const savedComment: IComment = await newComment.save();

    res.status(201).json({ commentId: savedComment._id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
