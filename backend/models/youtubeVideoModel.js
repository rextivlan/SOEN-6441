import sql from "../config/db.js";

const YouTubeVideo = function(youtubevideo) {
  this.video_id = youtubevideo.videoid;
  this.title = youtubevideo.title;
  this.channel_title = youtubevideo.channelTitle;
  this.default_audio_language = youtubevideo.defaultAudioLanguage;
  this.published_at = new Date(youtubevideo.publishedAt).toISOString().substring(0, 10);
  this.submitted_by = youtubevideo.userid;
};

YouTubeVideo.create = (newYouTubeVideo, result) => {
  sql.query("INSERT INTO youtubevideos SET ?", newYouTubeVideo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created youtube video: ", { id: res.insertId, ...newYouTubeVideo });
    result(null, { id: res.insertId, ...newYouTubeVideo });
  });
};

YouTubeVideo.getAll = (userid, result) => {
  sql.query(`SELECT * FROM youtubevideos WHERE submitted_by = ?`, userid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("youtubevideos: ", res);
    result(null, res);
  });
};

YouTubeVideo.remove = (youtubevideoid, result) => {
  sql.query("DELETE FROM youtubevideos WHERE youtube_video_id = ?", youtubevideoid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted youtube video with id: ", youtubevideoid);
    result(null, res);
  });
};

export default YouTubeVideo;