import { Router } from "express";
import * as controller from "../../controller/client/user.controller"
const router: Router = Router();

router.get("/register", controller.register);
router.post("/register", controller.registerPost);
router.get("/login", controller.login);

export const userRoutes : Router = router;