/*
    This table stands for holding comments 
    of problems and information about those
    comments. 
*/
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `problem_id` int(10) unsigned NOT NULL,     # problem, comment belongs to
  `parent_id` int(10) unsigned NOT NULL,      # comment, comment belongs to
  `user_id` int(10) unsigned NOT NULL,        # user, comment belongs to
  `created_date` int(11) unsigned NOT NULL,   # date of create
  `updated_date` int(11) unsigned NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
