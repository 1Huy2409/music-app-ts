import User from "../../models/user.model";
import { Request, Response } from "express";
import md5 from "md5"
// router register
export const register = async (req: Request, res: Response) : Promise<void> => {
    res.render("client/pages/user/register.pug", {
        pageTitle: "Đăng Ký"
    })
}
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
        console.log("Email nay da ton tai");
        return;
    }
    // khoi tao 1 account
}
// router login
export const login = async (req: Request, res: Response) : Promise<void> => {
    res.send("ok");
}