import {Request, Response, NextFunction} from "express";
export const registerValidate = (req: Request, res: Response, next: NextFunction) =>
{
    if (!req.body.fullName)
    {
        console.log("Vui lòng nhập tên!");
        res.redirect("back");
        return;
    }
    if (!req.body.email)
    {
        console.log("Vui lòng nhập email!");
        res.redirect("back");
        return;
    }
    if (!req.body.password) 
    {
        console.log("Vui lòng nhập mật khẩu!");
        res.redirect("back");
        return;
    }
    next();
}
export const loginValidate = (req: Request, res: Response, next: NextFunction) =>
{
    if (!req.body.email)
    {
        console.log("Vui lòng nhập email!");
        res.redirect("back");
        return;
    }
    if (!req.body.password) 
    {
        console.log("Vui lòng nhập mật khẩu!");
        res.redirect("back");
        return;
    }
    next();
}
