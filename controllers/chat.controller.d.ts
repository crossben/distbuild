import { Request, Response } from "express";
declare module "express" {
    interface Request {
        rootUserId?: string;
        rootUser?: string;
    }
}
export declare const accessChats: (req: Request, res: Response) => Promise<void>;
export declare const fetchAllChats: (req: Request, res: Response) => Promise<void>;
export declare const creatGroup: (req: Request, res: Response) => Promise<void>;
export declare const renameGroup: (req: Request, res: Response) => Promise<void>;
export declare const addToGroup: (req: Request, res: Response) => Promise<void>;
export declare const removeFromGroup: (req: Request, res: Response) => Promise<void>;
