import app from "./server";
import "./db";
import Video from "./models/Video";

const PORT = 5500;

const handleListen = () => {
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListen);
