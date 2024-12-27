import { NextFunction, Request, Response } from "express";
interface CustomRequest extends Request {
    user?: any;
}
export declare const guard: (req: CustomRequest, res: Response, next: NextFunction) => Promise<any>;
export {};
