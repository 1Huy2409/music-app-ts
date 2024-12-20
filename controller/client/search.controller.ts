import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import * as convertHelper from "../../helper/convertToSlug";
export const result = async (req: Request, res: Response): Promise<void> => {
    const typeSearch: string = req.params.typeSearch;
    const keyword: string = `${req.query.keyword}`;
    const slug: string = convertHelper.convertSlug(keyword);
    const slugRegex = new RegExp(slug, "i");
    const keywordRegex = new RegExp(keyword, "i");
    const songDetails = [];
    if (keyword) {
        const songs = await Song.find({
            $or: [{ title: keywordRegex }, { slug: slugRegex }],
            deleted: false,
            status: "active",
        }).select("_id slug singerId title avatar like");
        for (let item of songs) {
            const singerInfo = await Singer.findOne({
                deleted: false,
                _id: item.singerId,
            });
            songDetails.push({
                _id: item.id,
                title: item.title,
                avatar: item.avatar,
                slug: item.slug,
                like: item.like,
                singer: {
                    fullName: singerInfo.fullName, //lay ra duoc ten cua singer
                },
            });
        }
    }
    switch (typeSearch) {
        case "result":
            res.render("client/pages/search/result.pug", {
                pageTitle: "Trang kết quả tìm kiếm",
                songs: songDetails,
                keyword: keyword,
            });
            break;
        case "suggest":
            //tra ve mot api json
            res.json({
                code: 200,
                message: "Success",
                songs: songDetails,
            });
    }
};
