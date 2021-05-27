import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 6000;

const app = express();

app.use(morgan("dev"));
app.use("/", globalRouter);
app.use("users", userRouter);
app.use("videos", videoRouter);

const handleListen = () => {
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListen);