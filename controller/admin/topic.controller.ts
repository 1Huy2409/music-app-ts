import {Request, Response} from "express";
import Topic from "../../models/topic.model";

export const index = async (req: Request, res: Response) : Promise<void> =>
{
    const topics = await Topic.find(
        {
            deleted: false,
            status: "active"
        }
    )
    res.render("admin/pages/topics/index.pug", 
        {
            pageTitle: "QUẢN LÝ CHỦ ĐỀ BÀI HÁT",
            topics: topics
        }
    )
}