import { Router } from "express";
import * as controller from "../../controller/client/dashboard.controller";
const router: Router = Router();

router.get("/", controller.index);

export const dashboardRoute: Router = router;