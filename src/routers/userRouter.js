import express from "express";
import {
  finishGithubLogin,
  startGithubLogin,
  startKakaoLogin,
  finishKakaoLogin,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { protectMiddleware, publicOnly, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter
  .route("/edit")
  .all(protectMiddleware)
  .get(getEdit)
  .post(uploadAvatar.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.all(publicOnly).get("/github/start", startGithubLogin);
userRouter.all(publicOnly).get("/github/finish", finishGithubLogin);
userRouter.all(publicOnly).get("/kakao/start", startKakaoLogin);
userRouter.all(publicOnly).get("/kakao/finish", finishKakaoLogin);

export default userRouter;
