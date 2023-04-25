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

    return res.json({
      id: savedPost._id,
      title: savedPost.title,
      description: savedPost.description,
      createdTime: savedPost.createdAt.toUTCString(),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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

export const getAllPosts = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const posts: IPost[] = await Post.find({user: req.user._id })
        .sort({ createdAt: -1 })
        .populate("comments")
        .lean()
        .exec();
  
      const transformedPosts = posts.map((post) => {
        return {
          id: post._id,
          title: post.title,
          desc: post.description,
          created_at: post.createdAt,
          comments: post.comments,
          likes: post.likes.length,
        };
      });
  
      return res.status(200).json(transformedPosts);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  export const getPost = async (req: Request, res: Response) => {
    const postId = req.params.id;
  
    try {
      const post: IPost | null = await Post.findById(postId).populate('user', 'username').populate('likes').populate('comments');
      if (post) {
        return res.status(200).json({ success: true, post });
      } else {
        return res.status(404).json({ success: false, error: 'Post not found' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
  };
