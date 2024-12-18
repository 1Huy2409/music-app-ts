import {Router} from "express"
const router: Router = Router();
import * as controller from "../../controller/client/song.controller"
router.get('/:topicSlug', controller.list);

export const songRoutes: Router = router;