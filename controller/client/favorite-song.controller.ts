import {Request, Response} from "express"
import FavoriteSong from "../../models/favorite-song.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
export const index = async (req: Request, res: Response) : Promise<void> => {
    //lay ra danh sach cac bai hat duoc yeu thich
    const favoriteSongs = await FavoriteSong.find({
        deleted: false
    })
    for (let song of favoriteSongs) {
        const infoSong = await Song.findOne(
            {
                deleted: false,
                _id: song.songId
            }   
        )
        const infoSinger = await Singer.findOne(
            {
                _id: infoSong.singerId
            }
        )
        song["infoSong"] = infoSong;
        song["infoSinger"] = infoSinger;
    }
    res.render("client/pages/favorite-songs/index.pug", {
        pageTitle: "Trang bài hát yêu thích",
        songs: favoriteSongs
    })
}