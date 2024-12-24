import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";
export const list = async (req: Request, res: Response): Promise<void> => {
  const topicSlug = req.params.topicSlug;
  const topic = await Topic.findOne({
    slug: topicSlug,
    deleted: false,
    status: "active",
  });
  const songs = await Song.find({
    topicId: topic.id,
    deleted: false,
    status: "active",
  });
  for (let song of songs) {
    const singer = await Singer.findOne({
      deleted: false,
      _id: song.singerId,
    });
    song["singerInfo"] = singer;
  }
  res.render("client/pages/songs/list.pug", {
    pageTitle: "Danh sách bài hát",
    songs: songs,
    topic: topic,
  });
};

export const detail = async (req: Request, res: Response): Promise<void> => {
  const songSlug = req.params.songSlug;
  const song = await Song.findOne({
    deleted: false,
    slug: songSlug,
    status: "active",
  });
  const singer = await Singer.findOne({
    _id: song.singerId,
    deleted: false,
  });
  const topic = await Topic.findOne({
    _id: song.topicId,
    deleted: false,
  });
  res.render("client/pages/songs/detail.pug", {
    pageTitle: "Chi tiết bài hát",
    song: song,
    topic: topic,
    singer: singer,
  });
};
export const like = async (req: Request, res: Response): Promise<void> => {
  const songId: string = req.params.songId;
  const typeLike = req.params.typeLike;
  const song = await Song.findOne({
    _id: songId,
    deleted: false,
    status: "active",
  });
  const newLike = typeLike == "Like" ? song.like + 1 : song.like - 1;
  await Song.updateOne(
    {
      _id: songId,
      deleted: false,
      status: "active",
    },
    {
      like: newLike,
    }
  );
  res.json({
    code: 200,
    msg: "Đã Like",
    like: newLike,
  });
};
export const favorite = async (req: Request, res: Response): Promise<void> => {
  const songId: string = req.params.songId;
  const typeFavorite: string = req.params.typeFavorite;
  switch (typeFavorite) {
    case "Favorite":
      const existFavoriteSong = await FavoriteSong.findOne({
        songId: songId,
      });
      if (!existFavoriteSong) {
        const newFavoriteSong = new FavoriteSong({
          songId: songId,
        });
        newFavoriteSong.save();
      }
      break;
    case "unFavorite":
      await FavoriteSong.deleteOne({
        songId: songId,
      });
      break;
  }
  res.json({
    code: 200,
    msg: "Thành công",
  });
};
export const listen = async (req: Request, res: Response): Promise<void> => {
  const songId: string = req.params.songId;
  const song = await Song.findOne({
    _id: songId,
    deleted: false,
  });
  const listenUpdate = song.listen + 1;
  await Song.updateOne(
    {
      _id: songId,
    },
    {
      listen: listenUpdate,
    }
  );
  const newSongUpdate = await Song.findOne({
    _id: songId,
    listen: listenUpdate,
  });
  res.json({
    code: 200,
    message: "Thành công",
    listen: newSongUpdate.listen,
  });
};
