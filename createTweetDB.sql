SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

DROP SCHEMA IF EXISTS `superTueTweets` ;
CREATE SCHEMA IF NOT EXISTS `superTueTweets` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
USE `superTueTweets` ;

-- -----------------------------------------------------
-- Table `superTueTweets`.`SuperTuesday`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `superTueTweets`.`SuperTuesday` ;

CREATE  TABLE IF NOT EXISTS `superTueTweets`.`SuperTuesday` (
  `tweet_id` VARCHAR(25) NOT NULL ,
  `user` VARCHAR(60) NULL ,
  `user_id` VARCHAR(60) NULL ,
  `created_at` DATETIME NULL ,
  `text` VARCHAR(160) NULL ,
  `geo` VARCHAR(45) NULL ,
  `coordinates` VARCHAR(45) NULL ,
  `scraped_at` DATETIME NULL ,
  `source` VARCHAR(140) NULL ,
  PRIMARY KEY (`tweet_id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `superTueTweets`.`Romney`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `superTueTweets`.`Romney` ;

CREATE  TABLE IF NOT EXISTS `superTueTweets`.`Romney` (
  `tweet_id` VARCHAR(25) NOT NULL ,
  `user` VARCHAR(60) NULL ,
  `user_id` VARCHAR(60) NULL ,
  `created_at` DATETIME NULL ,
  `text` VARCHAR(160) NULL ,
  `geo` VARCHAR(45) NULL ,
  `coordinates` VARCHAR(45) NULL ,
  `scraped_at` DATETIME NULL ,
  `source` VARCHAR(140) NULL ,
  PRIMARY KEY (`tweet_id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `superTueTweets`.`Santorum`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `superTueTweets`.`Santorum` ;

CREATE  TABLE IF NOT EXISTS `superTueTweets`.`Santorum` (
  `tweet_id` VARCHAR(25) NOT NULL ,
  `user` VARCHAR(60) NULL ,
  `user_id` VARCHAR(60) NULL ,
  `created_at` DATETIME NULL ,
  `text` VARCHAR(160) NULL ,
  `geo` VARCHAR(45) NULL ,
  `coordinates` VARCHAR(45) NULL ,
  `scraped_at` DATETIME NULL ,
  `source` VARCHAR(140) NULL ,
  PRIMARY KEY (`tweet_id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `superTueTweets`.`RonPaul`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `superTueTweets`.`RonPaul` ;

CREATE  TABLE IF NOT EXISTS `superTueTweets`.`RonPaul` (
  `tweet_id` VARCHAR(25) NOT NULL ,
  `user` VARCHAR(60) NULL ,
  `user_id` VARCHAR(60) NULL ,
  `created_at` DATETIME NULL ,
  `text` VARCHAR(160) NULL ,
  `geo` VARCHAR(45) NULL ,
  `coordinates` VARCHAR(45) NULL ,
  `scraped_at` DATETIME NULL ,
  `source` VARCHAR(140) NULL ,
  PRIMARY KEY (`tweet_id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `superTueTweets`.`Gingrich`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `superTueTweets`.`Gingrich` ;

CREATE  TABLE IF NOT EXISTS `superTueTweets`.`Gingrich` (
  `tweet_id` VARCHAR(25) NOT NULL ,
  `user` VARCHAR(60) NULL ,
  `user_id` VARCHAR(60) NULL ,
  `created_at` DATETIME NULL ,
  `text` VARCHAR(160) NULL ,
  `geo` VARCHAR(45) NULL ,
  `coordinates` VARCHAR(45) NULL ,
  `scraped_at` DATETIME NULL ,
  `source` VARCHAR(140) NULL ,
  PRIMARY KEY (`tweet_id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `superTueTweets`.`Obama`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `superTueTweets`.`Obama` ;

CREATE  TABLE IF NOT EXISTS `superTueTweets`.`Obama` (
  `tweet_id` VARCHAR(25) NOT NULL ,
  `user` VARCHAR(60) NULL ,
  `user_id` VARCHAR(60) NULL ,
  `created_at` DATETIME NULL ,
  `text` VARCHAR(160) NULL ,
  `geo` VARCHAR(45) NULL ,
  `coordinates` VARCHAR(45) NULL ,
  `scraped_at` DATETIME NULL ,
  `source` VARCHAR(140) NULL ,
  PRIMARY KEY (`tweet_id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `superTueTweets`.`allTweets`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `superTueTweets`.`allTweets` ;

CREATE  TABLE IF NOT EXISTS `superTueTweets`.`allTweets` (
  `tweet_id` VARCHAR(25) NOT NULL ,
  `user` VARCHAR(60) NULL ,
  `user_id` VARCHAR(60) NULL ,
  `created_at` DATETIME NULL ,
  `text` VARCHAR(160) NULL ,
  `geo` VARCHAR(45) NULL ,
  `coordinates` VARCHAR(45) NULL ,
  `scraped_at` DATETIME NULL ,
  `source` VARCHAR(140) NULL ,
  PRIMARY KEY (`tweet_id`) )
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
