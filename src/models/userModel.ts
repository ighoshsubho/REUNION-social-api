import { Schema } from 'mongoose';
import mongoose from 'mongoose';

export interface UserDoc extends mongoose.Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  followers: string[];
  following: number;
}

const userSchema = new mongoose.Schema<UserDoc>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: { type: Number, default: 0 },
});

export const User = mongoose.model<UserDoc>('User', userSchema);