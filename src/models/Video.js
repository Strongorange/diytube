import mongoose, { Schema } from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String }],
  meta: {
    rating: { type: Number, default: 0, required: true },
    views: { type: Number, default: 0, required: true },
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;