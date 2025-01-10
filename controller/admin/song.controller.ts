import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";
// [GET] /admin/songs
export const index = async (req: Request, res: Response) : Promise<void> =>
{
    const songs = await Song.find(
        {
            deleted: false,
            status: "active"
        }
    )
    res.render("admin/pages/songs/index.pug", 
        {
            songs: songs,
            pageTitle: "QUẢN LÝ BÀI HÁT"
        }
    )
}

// [GET] /admin/songs/create
export const create = async (req: Request, res: Response) : Promise<void> =>
{
    const topics = await Topic.find(
        {
            deleted: false,
            status: "active"
        }
    ).select("title");
    const singers = await Singer.find(
        {
            deleted: false, 
            status: "active"
        }
    ).select("fullName");
    res.render("admin/pages/songs/create", 
        {
            pageTitle: "THÊM MỚI BÀI HÁT",
            singers: singers,
            topics: topics
        }
    )
}
export const createPost = async (req: Request, res: Response) : Promise<void> =>
{
    console.log(req.body);
    res.redirect(`${systemConfig.prefixAdmin}/songs`);
}