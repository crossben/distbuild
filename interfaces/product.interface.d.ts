import { IUser } from "../schemas/user.schema";
import { Document } from 'mongoose';
interface Image extends Document {
    images: [string];
}
interface Like extends Document {
    sender: any;
    product: any;
    typee: string;
}
interface Comment extends Document {
    sender: any;
    product: any;
    content: string;
}
export interface IProduct extends Document {
    title: string;
    description: string;
    discount?: number;
    prix: Number;
    category?: string;
    quantity: number;
    owner: IUser;
    image?: Image[];
    like?: Like[];
    comment?: Comment[];
}
export {};
