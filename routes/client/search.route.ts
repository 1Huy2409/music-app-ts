import {Router} from "express"
import * as controller from "../../controller/client/search.controller"
const router: Router = Router();

router.get("/:typeSearch", controller.result);

export const searchRoutes: Router = router;