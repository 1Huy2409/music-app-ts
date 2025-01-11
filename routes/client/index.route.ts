import {Express} from "express";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { favoriteSongRoutes } from "./favorite-song.route";
import { searchRoutes } from "./search.route";
import { userRoutes } from "./user.route";
import { dashboardRoute } from "./dashboard.route";
import * as authMiddleware from "../../middleware/client/auth.middleware";
const clientRoutes = (app: Express): void => {
    app.use("/", authMiddleware.clientMiddleware,dashboardRoute);
    app.use("/topics", authMiddleware.clientMiddleware,topicRoutes);
    app.use("/songs", authMiddleware.clientMiddleware,songRoutes);
    app.use("/favorite-songs", authMiddleware.userMiddleware,favoriteSongRoutes);
    app.use("/search", authMiddleware.clientMiddleware,searchRoutes);
    app.use("/user", userRoutes);
}

export default clientRoutes;