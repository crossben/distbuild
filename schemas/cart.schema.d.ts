import mongoose, { Document } from 'mongoose';
import { IPost } from './post.schema';
export interface ICartPost extends Document {
    owner: mongoose.Types.ObjectId;
    Posts: IPost[];
    postId: mongoose.Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
    bill: number;
}
export declare const Cart: mongoose.Model<ICartPost, {}, {}, {}, mongoose.Document<unknown, {}, ICartPost> & ICartPost & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
