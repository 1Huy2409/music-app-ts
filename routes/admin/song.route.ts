import { Router } from "express";
import * as controller from "../../controller/admin/song.controller";
import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware";
// import * as middle from "../../middleware/test.middleware";
import multer from "multer";
const upload = multer();
const router: Router = Router();
// [GET] /admin/songs
router.get("/", controller.index);
// [GET] /admin/songs/create
router.get("/create", controller.create);
// [POST] /admin/songs/create
router.post("/create", 
    upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), 
    uploadCloud.uploadFields, 
    controller.createPost
);
// [GET] /admin/songs/edit/:id
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", controller.editPatch);
export const songRoute : Router = router;