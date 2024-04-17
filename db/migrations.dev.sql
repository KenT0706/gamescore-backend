/* Database schema for the twitter_clone_dev database.
 This file is used to create the database and tables.
 To run this file, follow the steps below:
 
 1. Make sure to start the mysql server before running this file.
 docker run --name=mysql-local-server -p 3306:3306 -e MYSQL_ROOT_PASSWORD=sigma12345 -d mysql:8.0
 
 2. Open up Beekeeper Studio and connect to the database.
 
 3. Copy and paste the contents of this file into the query editor.
 
 4. Run the query.
 */
CREATE DATABASE gamescore_dev;
USE gamescore_dev;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    role ENUM('user', 'admin') DEFAULT 'user',
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE scores (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    score INT NOT NULL,
    game_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE leaderboard (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    score INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE regions (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE teams (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    region_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (region_id) REFERENCES regions(id)
);

CREATE TABLE `games` ( 
    `id` INT AUTO_INCREMENT NOT NULL,
    `user_id` INT NOT NULL,
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `title` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `platform` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `genre` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `release_date` DATE NOT NULL,
    `additional_note` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
    `tags` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `progress` FLOAT NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
);

ALTER TABLE users 
ADD COLUMN region_id INT;
ALTER TABLE users 
ADD COLUMN team_id INT;
ALTER TABLE users 
ADD COLUMN game_id INT;

ALTER TABLE users
ADD FOREIGN KEY (region_id) REFERENCES regions(id);
ALTER TABLE users
ADD FOREIGN KEY (game_id) REFERENCES games(id);
ALTER TABLE users
ADD FOREIGN KEY (team_id) REFERENCES teams(id);

ALTER TABLE users 
ADD COLUMN score INT;