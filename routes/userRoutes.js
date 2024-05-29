import { Router } from "express";
import {
  getUserTasks,
  loginUser,
  registerdUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const routerUser = Router();

routerUser.route("/register").post(registerdUser);
routerUser.route("/login").post(loginUser);

//getuserTasks Route

routerUser.route("/usertasks").get(protect, getUserTasks);

export default routerUser;
