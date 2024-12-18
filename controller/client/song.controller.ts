import {Request, Response} from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
//lay ra danh sach bai hat theo chu de

export const list = async (req: Request, res: Response) : Promise<void> => {
    const topicSlug = req.params.topicSlug;
    const topic = await Topic.findOne(
        {
            slug: topicSlug,
            deleted: false,
            status: "active"
        }
    )
    const songs = await Song.find(
        {
            topicId : topic.id,
            deleted: false,
            status: "active"
        }
    )
    for (let song of songs) {
        const singer = await Singer.findOne(
            {
                deleted: false,
                _id: song.singerId
            }
        )
        song["singerInfo"] = singer;
    }
    res.render("client/pages/songs/list.pug", {
        pageTitle: "Danh sách bài hát",
        songs: songs,
        topic: topic
    })
}