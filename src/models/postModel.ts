import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    _id: string;
    title: string;
    description: string;
    createdAt?: Date;
    save: () => Promise<IPost>;
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