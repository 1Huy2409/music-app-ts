import { Express } from "express";
import { dashboardRoute } from "./dashboard.route";
import { systemConfig } from "../../config/config";
import { topicRoute } from "./topic.route";
import { songRoute } from "./song.route";
const adminRoutes = (app: Express): void =>
{
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute);
    app.use(`${PATH_ADMIN}/topics`, topicRoute);
    app.use(`${PATH_ADMIN}/songs`, songRoute);
}

export default adminRoutes;