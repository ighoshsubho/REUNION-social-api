import mongoose, { Schema, Document } from 'mongoose';
import { ILike } from './likeModel';
import { IComment } from './commentModel';

export interface IPost extends Document {
    _id: string;
    title: string;
    description: string;
    createdAt?: Date;
    user: string;
    likes: ILike[];
    comments: IComment[];
    remove: () => Promise<IPost>;
  }

const PostSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model<IPost>('Post', PostSchema);

export default Post;