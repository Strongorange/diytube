import express from "express";
import {
  getJoin,
  getLogin,
  logOut,
  postJoin,
  postLogin,
} from "../controllers/userController";
import { search, home } from "../controllers/videoController";
import { protectMiddleware, publicOnly } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);
rootRouter.route("/join").all(publicOnly).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnly).get(getLogin).post(postLogin);
rootRouter.all(protectMiddleware).get("/logout", logOut);

export default rootRouter;
