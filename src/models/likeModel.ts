import mongoose, { Schema, Document } from 'mongoose';
import { UserDoc } from './userModel';
import { IPost } from './postModel';

export interface ILike extends Document {
  postId: IPost["_id"];
  userId: UserDoc["_id"];
}

const LikeSchema: Schema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<ILike>('Like', LikeSchema);