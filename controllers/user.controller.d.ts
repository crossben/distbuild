import { Request, Response } from 'express';
export declare const authController: (req: Request, res: Response) => Promise<void>;
export declare const GetUserById: (req: Request, res: Response) => Promise<void>;
export declare const UpdateUser: (req: Request, res: Response) => Promise<void>;
export declare const DeleteUser: (req: Request, res: Response) => Promise<void>;
export declare const GetAllUsers: (req: Request, res: Response) => Promise<void>;
export declare const GetUserByMail: (req: Request, res: Response) => Promise<void>;
