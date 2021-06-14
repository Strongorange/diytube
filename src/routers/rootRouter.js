import express from "express";
import {
  getJoin,
  getLogin,
  logOut,
  postJoin,
  postLogin,
} from "../controllers/userController";
import { search, home } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/logout", logOut);

export default rootRouter;
