import express from "express";
import { trending, search } from "../controllers/videoController";
import { login, join } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/login", login);
globalRouter.get("/join", join);
globalRouter.get("/search", search);

export default globalRouter;
