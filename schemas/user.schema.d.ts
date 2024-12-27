import { Document } from 'mongoose';
export interface IUser extends Document {
    uid: string;
    firstname?: string;
    lastname?: string;
    email: string;
    displayName?: string;
    telephone?: string;
    motDePasse?: string;
    pays?: string;
    region?: string;
    quartier?: string;
    dateNaissance?: Date;
    sexe?: string;
    photo?: string;
    role: string;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const User: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
