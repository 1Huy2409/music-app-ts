import { Router } from "express";
import * as controller from "../../controller/client/user.controller";
import * as userValidate from "../../validate/user.validate";
const router: Router = Router();

router.get("/register", controller.register);
router.post("/register",userValidate.registerValidate, controller.registerPost);
router.get("/login", controller.login);
router.post("/login", userValidate.loginValidate, controller.loginPost);
router.get("/logout", controller.logout);
export const userRoutes : Router = router;