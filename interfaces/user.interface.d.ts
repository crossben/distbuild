import { Document } from 'mongoose';
export interface User extends Document {
    uid: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: any;
    photo: any;
    password: string;
    role: string;
    created_at: string;
    updated_at: string;
}
