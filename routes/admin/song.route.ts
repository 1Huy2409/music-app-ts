import { Router } from "express";
import * as controller from "../../controller/admin/song.controller";
import * as uploadCloud from "../../middleware/uploadCloud.middleware";
// import * as middle from "../../middleware/test.middleware";
import multer from "multer";
const upload = multer();
const router: Router = Router();
// [GET] /admin/songs
router.get("/", controller.index);
// [GET] /admin/songs/create
router.get("/create", controller.create);
// [POST] /admin/songs/create
router.post("/create", upload.single("avatar"), uploadCloud.uploadSingle, controller.createPost);

export const songRoute : Router = router;