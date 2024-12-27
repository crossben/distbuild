import mongoose, { Model } from "mongoose";
export interface IMessage {
    sender: mongoose.Schema.Types.ObjectId;
    message: string;
    chatId: mongoose.Schema.Types.ObjectId;
}
export declare const Message: Model<IMessage>;
