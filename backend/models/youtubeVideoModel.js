import sql from "../config/db.js";

const YouTubeVideo = function(youtubevideo) {
  this.videoid = youtubevideo.videoid;
  this.title = youtubevideo.title;
  this.channelTitle = youtubevideo.channelTitle;
  this.defaultAudioLanguage = youtubevideo.defaultAudioLanguage;

  this.publishedAt = new Date(youtubevideo.publishedAt).toISOString().substring(0, 10);
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

YouTubeVideo.getAll = result => {
  sql.query("SELECT * FROM youtubevideos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("youtubevideos: ", res);
    result(null, res);
  });
};

YouTubeVideo.remove = (id, result) => {
  sql.query("DELETE FROM youtubevideos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted youtube video with id: ", id);
    result(null, res);
  });
};

export default YouTubeVideo;