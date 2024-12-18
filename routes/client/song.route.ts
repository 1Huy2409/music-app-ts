import {Router} from "express"
const router: Router = Router();
import * as controller from "../../controller/client/song.controller"
router.get('/:topicSlug', controller.list);
router.get('/detail/:songSlug', controller.detail);
router.get('/like/:typeLike/:songId', controller.like);
export const songRoutes: Router = router;