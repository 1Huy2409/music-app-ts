import { Request, Response, NextFunction } from "express";
import User from "../../models/user.model";
export const userMiddleware = async (req: Request, res: Response, next: NextFunction) =>
{
    if (req.cookies.tokenUser)
    {
        const user = await User.findOne(
            {
                deleted: false,
                status: "active",
                tokenUser: req.cookies.tokenUser
            }
        );
        res.locals.user = user;
        next();
    }
    else
    {
        res.redirect("/user/login");
    }
}
export const clientMiddleware = async (req: Request, res: Response, next: NextFunction) =>
{
    if (req.cookies.tokenUser)
    {
        const user = await User.findOne(
            {
                deleted: false,
                status: "active",
                tokenUser: req.cookies.tokenUser
            }
        );
        res.locals.user = user;
    }
    next();
}