import express from "express";
import {
  createYouTubeVideo,
  findAllYouTubeVideos,
  deleteYouTubeVideo,
} from "../controllers/youtubeVideoController.js";

const youtube_router = express.Router();

youtube_router.post("/create", createYouTubeVideo);
youtube_router.get("/youtubevideos/:userid", findAllYouTubeVideos);
youtube_router.delete("/delete/:youtubevideoid", deleteYouTubeVideo);

// module.exports = youtube_router;
export default youtube_router;
