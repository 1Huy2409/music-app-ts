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
// [POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) : Promise<void> =>
{
    const avatarArray: string[] = req.body.avatar;
    const audioArray: string[] = req.body.audio;
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        lyrics: req.body.lyrics,
        status: req.body.status,
        avatar: avatarArray[0],
        audio: audioArray[0]
    }
    const newSong = new Song(dataSong);
    await newSong.save();
    res.redirect(`${systemConfig.prefixAdmin}/songs`);
}
// [GET] /admin/songs/edit/:id
export const edit = async(req: Request, res: Response) : Promise<void>=>
{
    const id = req.params.id;
    const song = await Song.findOne(
        {
            _id: id,
            deleted: false
        }
    )
    const singers = await Singer.find(
        {
            deleted: false, 
            status: "active"
        }
    )
    const topics = await Topic.find(
        {
            deleted: false, 
            status: "active"
        }
    )
    res.render("admin/pages/songs/edit",
        {
            pageTitle: "TRANG CHỈNH SỬA BÀI HÁT",
            song: song, 
            singers: singers,
            topics: topics
        }
    )
}
// [PATCH] /admin/songs/edit/:id
export const editPatch = async(req: Request, res: Response) : Promise<void> =>
{
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        lyrics: req.body.lyrics,
        status: req.body.status
    };
    if (req.body.avatar)
    {
        dataSong["avatar"] = req.body.avatar[0];
    }
    if (req.body.audio)
    {
        dataSong["audio"] = req.body.audio[0];
    }
    await Song.updateOne(
        {
            _id: req.params.id
        },
        dataSong
    )
    res.redirect("back");
}