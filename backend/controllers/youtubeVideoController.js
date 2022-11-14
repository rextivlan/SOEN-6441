import YouTubeVideo from "../models/youtubeVideoModel.js";
import axios from "axios";

export const addYouTubeVideo = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  const apiUrl = process.env.YOUTUBE_URL;

  const url = `${apiUrl}/videos?id=${req.body.videoid}&key=${apiKey}&part=snippet`;

  const response = await axios.get(url);

  req.body.title = response.data.items[0].snippet.title;
  req.body.channelTitle = response.data.items[0].snippet.channelTitle;
  req.body.defaultAudioLanguage =
    response.data.items[0].snippet.defaultAudioLanguage;
  req.body.publishedAt = response.data.items[0].snippet.publishedAt;

  const youtubevideo = new YouTubeVideo({
    videoid: req.body.videoid,
    title: req.body.title,
    channelTitle: req.body.channelTitle,
    defaultAudioLanguage: req.body.defaultAudioLanguage,
    publishedAt: req.body.publishedAt,
    userid: req.body.userid,
  });

  YouTubeVideo.add(youtubevideo, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while adding the YouTube video.",
      });
    else res.send(data);
  });
};

export const getAllUserYouTubeVideos = async (req, res) => {
  try {
    const userid = req.params.userid;
    const videos = await YouTubeVideo.getUserVideos(userid);
    if (videos.length === 0) {
      throw "Some error occurred while retrieving the YouTube videos.";
    }
    res.status(200).send(videos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

export const deleteYouTubeVideo = async (req, res) => {
  try {
    const videoid = req.params.youtubevideoid;
    const msg = await YouTubeVideo.remove(videoid);
    if (msg === "Not_found") {
      res.status(404).json({
        error: `Not found YouTube video with id ${videoid}`,
      });
    }
    res.status(202).send({ message: "YouTube video was deleted successfully!" });
    console.log("deleted youtube video with id: ", videoid);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Could not delete YouTube video with id ${videoid}`,
    });
  }
};
