CREATE TABLE IF NOT EXISTS `users` (
  user_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `youtubevideos` (
  youtube_video_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  video_id varchar(255) NOT NULL,
  title varchar(255) NOT NULL,
  channel_title varchar(255) NOT NULL,
  default_audio_language varchar(255) NULL,
  published_at date NOT NULL,
  submitted_by int NOT NULL,
  FOREIGN KEY (`submitted_by`) REFERENCES `users`(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;