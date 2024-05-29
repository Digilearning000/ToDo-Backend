import { Router } from "express";
import { loginUser, registerdUser } from "../controllers/userController.js";

const routerUser = Router();

routerUser.route("/register").post(registerdUser);
routerUser.route("/login").get(loginUser);

export default routerUser;
