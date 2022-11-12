CREATE TABLE IF NOT EXISTS `user` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `youtubevideos` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  videoid varchar(255) NOT NULL,
  title varchar(255) NOT NULL,
  channelTitle varchar(255) NOT NULL,
  defaultAudioLanguage varchar(255) NULL,
  publishedAt date NOT NULL,
  email varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;