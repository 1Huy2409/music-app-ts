import {Request, Response} from "express"
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import * as convertHelper from "../../helper/convertToSlug";
export const result = async (req: Request, res: Response) :Promise<void> => {
    const keyword : string= `${req.query.keyword}`;
    const slug: string = convertHelper.convertSlug(keyword);
    const slugRegex = new RegExp(slug, "i");
    const keywordRegex = new RegExp(keyword, "i");

    const songs = await Song.find(
        {
            $or : [
                {title: keywordRegex},
                {slug: slugRegex}
            ]
        }
    )
    for (let item of songs) {
        const singerInfo = await Singer.findOne(
            {
                deleted: false,
                _id: item.singerId
            }
        )
        item["singerInfo"] = singerInfo;
    }
    res.render("client/pages/search/result.pug", {
        pageTitle: "Trang kết quả tìm kiếm",
        songs: songs
    })
}