import { Document, Schema, model } from 'mongoose';
import { IPost } from './postModel';
import { UserDoc } from './userModel';

export interface IComment extends Document {
  _id: string;
  post: IPost["_id"];
  user: UserDoc["_id"];
  comment: string;
  createdAt: Date;
  save: () => Promise<IComment>;
}

const commentSchema: Schema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IComment>('Comment', commentSchema);
