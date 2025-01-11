import { Request, Response, NextFunction } from "express";

export const index = async (req: Request, res: Response) : Promise<void> =>
{
    res.render("client/pages/dashboard/index.pug",
        {
            pageTitle: "TRANG TỔNG QUAN"
        }
    )
}