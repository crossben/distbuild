import { IUser } from "../schemas/user.schema";
export declare const authService: (userData: IUser) => Promise<{
    message: string;
    user: import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
}>;
export declare const getUserByEmail: (email: string) => Promise<IUser | unknown>;
export declare const getAllUsers: () => Promise<IUser | unknown>;
export declare const updateUser: (id: unknown, userData: IUser) => Promise<IUser | unknown>;
export declare const getUserById: (id: string) => Promise<IUser | unknown>;
export declare const deleteUser: (id: unknown) => Promise<IUser | unknown>;
