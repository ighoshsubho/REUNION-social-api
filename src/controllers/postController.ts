import { Request, Response } from 'express';
import Post from '../models/postModel';
import { IPost } from "../models/postModel";


interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    _id: string;
  };
}

export const createPost = async (req: AuthenticatedRequest, res: Response) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  const newPost: IPost = new Post({
    title,
    description,
    user: userId,
  });

  try {
    const savedPost: IPost = await newPost.save();

    res.json({
      id: savedPost._id,
      title: savedPost.title,
      description: savedPost.description,
      createdTime: savedPost.createdAt.toUTCString(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req: AuthenticatedRequest, res: Response, next) => {
    try {
        const post = await Post.findById(req.params.id);
    
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        if (post.author.toString() !== req.user._id.toString()) {
          return res.status(401).json({ message: 'You are not authorized to delete this post' });
        }
    
        await post.remove();
    
        res.json({ message: 'Post deleted successfully' });
      } catch (err) {
        next(err);
      }
}
