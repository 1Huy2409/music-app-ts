import User from "../../models/user.model";
import { Request, Response } from "express";
import md5 from "md5"
import * as generateHelper from "../../helper/generate";
import { NextFunction } from "express-serve-static-core";
// router register
export const register = async (req: Request, res: Response) : Promise<void> => {
    res.render("client/pages/user/register.pug", {
        pageTitle: "Đăng Ký"
    })
}
// register method post
export const registerPost = async (req: Request, res: Response) : Promise<void> => {
    const email: string = req.body.email;
    const password: string = req.body.password;
    const fullName: string = req.body.fullName;
    const existEmail = await User.findOne(
        {
            deleted: false,
            email: email
        }
    )
    if (existEmail) {
        console.log("Email nay da ton tai"); // thay bang req.flash()
        return;
    }
    const tokenUser = generateHelper.randomString(20);
    const dataUser = 
    {
        fullName: req.body.fullname,
        email: req.body.email,
        password: md5(req.body.password),
        status: "active",
        tokenUser: tokenUser
    }
    res.cookie('tokenUser', tokenUser, { expires: new Date(Date.now() + 900000), httpOnly: true });
    const newUser = new User(dataUser);
    await newUser.save();
    res.redirect("/");
}
// router login
export const login = async (req: Request, res: Response) : Promise<void> => {
    res.render("client/pages/user/login",
        {
            pageTitle: "TRANG ĐĂNG NHẬP"
        }
    )
}
// login method post
export const loginPost = async (req: Request, res: Response) : Promise<void> => {
    // kiểm tra email
    console.log(req.body.email);
    console.log(req.body.password);
    const email: string = req.body.email;
    const password: string = req.body.password;
    const user = await User.findOne(
        {
            deleted: false,
            email: email, 
            status: "active" 
        }
    )
    if (!user)
    {
        console.log("Tài khoản này không tồn tại!");
        return;
    }
    // confirm password
    if (md5(password) !== user.password)
    {
        console.log("Sai mật khẩu, vui lòng nhập lại!");
        return;
    }
    res.cookie('tokenUser', user.tokenUser, { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.redirect("/");
}
export const logout = async (req: Request, res: Response, next: NextFunction) =>
{
    res.clearCookie("tokenUser");
    res.redirect("/user/login");
}   
