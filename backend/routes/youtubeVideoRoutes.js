import express from "express";
import {
  addYouTubeVideo,
  getAllUserYouTubeVideos,
  deleteYouTubeVideo,
} from "../controllers/youtubeVideoController.js";

const youtube_router = express.Router();

youtube_router.post("/add", addYouTubeVideo);
youtube_router.get("/youtubevideos/:userid", getAllUserYouTubeVideos);
youtube_router.delete("/delete/:youtubevideoid", deleteYouTubeVideo);

export default youtube_router;