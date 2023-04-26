import { Schema } from 'mongoose';
import mongoose from 'mongoose';

export interface UserDoc extends mongoose.Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  followers: string[];
  following: string[];
}

const userSchema = new mongoose.Schema<UserDoc>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export const User = mongoose.model<UserDoc>('User', userSchema);