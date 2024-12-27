import { Model } from "mongoose";
import mongoose from 'mongoose';
export interface IChat {
    photo: string;
    chatName: string;
    isGroup: boolean;
    users: mongoose.Schema.Types.ObjectId[];
    latestMessage: mongoose.Schema.Types.ObjectId;
    groupAdmin: mongoose.Schema.Types.ObjectId;
}
export declare const Chat: Model<IChat>;
