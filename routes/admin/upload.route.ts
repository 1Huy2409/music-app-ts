import { uploadSingle } from './../../middleware/admin/uploadCloud.middleware';
import { Router } from "express";
import * as controller from "../../controller/admin/upload.controller"
import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware";
import multer from "multer";
const upload = multer();
const router: Router = Router();
// [POST] /admin/upload
router.post("/",
    upload.single("file"), // multer
    uploadCloud.uploadSingle, // upload to cloudinary
    controller.index
);
// chạy qua router /admin/upload => upload image len cloudinary
export const uploadRoute : Router = router;