import mongoose, { Document } from 'mongoose';
interface IImage {
    url: string;
    alt: string;
}
interface IReview {
    user: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
}
interface ILike {
    user: mongoose.Types.ObjectId;
    liketype: string;
}
export interface IPost extends Document {
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    category: string[];
    subcategory: string;
    brand: string;
    quantity: number;
    creator: string;
    ownerId: mongoose.Schema.Types.ObjectId;
    ownerRole: string;
    images: IImage[];
    likes: ILike[];
    reviews: IReview[];
    tags: string[];
    weight: string;
    isActive: boolean;
}
export declare const Post: mongoose.Model<IPost, {}, {}, {}, mongoose.Document<unknown, {}, IPost> & IPost & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
