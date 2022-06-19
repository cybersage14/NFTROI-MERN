/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 100417
 Source Host           : localhost:3306
 Source Schema         : ticketing

 Target Server Type    : MySQL
 Target Server Version : 100417
 File Encoding         : 65001

 Date: 19/01/2022 06:17:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (1, 'Live Music', '2022-01-15 11:24:00', '2022-01-15 11:24:00');
INSERT INTO `categories` VALUES (2, 'Arts', '2022-01-15 11:24:00', '2022-01-15 11:24:00');
INSERT INTO `categories` VALUES (3, 'Culture', '2022-01-15 11:24:00', '2022-01-15 11:24:00');
INSERT INTO `categories` VALUES (4, 'Festivals', '2022-01-15 11:24:00', '2022-01-15 11:24:00');

-- ----------------------------
-- Table structure for events
-- ----------------------------
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `start` datetime(0) NULL DEFAULT NULL,
  `venueId` int(11) NULL DEFAULT NULL,
  `categoryId` int(11) NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ownerId` int(11) NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of events
-- ----------------------------
INSERT INTO `events` VALUES (1, 'KING GIZZARD One-Off Acoustic Weird-Stuff Night', 'Brazilian Pop/Rock scene from the 80’s, 90’s and 00’s\r\n\r\nFormed in Sydney in 2019, Innoqua Brazilis recollects the best of Brazilian Pop/Rock scene from the 80’s, 90’s and 00’s. Join us to celebrate the end of 2021 and sing along to classics from Legião U', '2022-01-27 04:18:37', 1, 1, 'https://ucarecdn.com/ca7ed4a1-e2b8-41ee-8ca1-c17bf3826442/01.jpg', NULL, 1, '2022-01-14 10:56:19', '2022-01-14 10:56:23');
INSERT INTO `events` VALUES (2, 'TIM FREEDMAN', 'DOORS 6.30PM // DINNER & SHOW FROM 6:30PM // SHOW STARTS 8PM\r\n\r\nThis show has been rescheduled to Wednesday 15 December:\r\n\r\n\r\n\r\nDoors 6:30pm\r\n\r\nDinner from 6:30pm\r\n\r\nTim Freedman 8.15pm - 10pm', '2022-01-25 04:20:31', 2, 1, 'https://ucarecdn.com/471e2b55-4834-4b79-9b48-92f9bc9729e0/03.jpg', NULL, 1, '2022-01-14 10:56:26', '2022-01-14 10:56:28');
INSERT INTO `events` VALUES (3, 'SIR ARCHER W/GUESTS HONEY NOTHINGS + KEENS MUSTARD (SELLING FAST)', 'Fresher than the Colonel’s chicken. Hotter than a seatbelt in summer. Tastier than sticky date pudding and ice-cream. OK, not quite! \r\n\r\nWith the July release of their four-track EP, The Feast, comes a deeper look into what makes Sir Archer, well... Sir A', '2022-01-18 04:21:09', 3, 2, 'https://ucarecdn.com/385f9f54-b065-4a27-b0f4-267c7b76a80d/06.jpg', NULL, 1, '2022-01-15 11:24:00', '2022-01-15 11:24:00');
INSERT INTO `events` VALUES (4, 'SHRUB COMEDY II', 'Shrub Comedy is back!\r\n\r\nMelbourne\'s finest night of alternative comedy is back!\r\n\r\nSketch, Stand-up, Drag, Circus, Absurdity, characters & free pizza. We know you\'re not ready, but it\'s here. Congratulations. Don\'t shrub the small stuff.  \r\n\r\nFeaturing: ', '2022-01-26 04:21:39', 4, 2, 'https://ucarecdn.com/cfa10f1e-7dcf-4830-ad21-da8d47fef7e7/08.jpg', NULL, 1, '2022-01-15 11:24:00', '2022-01-15 11:24:00');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ticketId` int(11) NULL DEFAULT NULL,
  `quantity` int(11) NULL DEFAULT NULL,
  `attendees` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `orderDate` datetime(0) NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, 'guruluckystacker@gmail.com', 1, 3, 'Guru Lucky,aaa aaa,ccc ccc', NULL, '2022-01-15 11:24:00', '2022-01-15 11:24:00');
INSERT INTO `orders` VALUES (2, 'guruluckystacker@gmail.com', 2, 2, 'Guru Lucky,rrr rrrr', NULL, '2022-01-15 11:24:00', '2022-01-15 11:24:00');
INSERT INTO `orders` VALUES (3, 'guruluckystacker@gmail.com', 1, 3, 'Guru Lucky,aaa aaa,ddd ddd', NULL, '2022-01-15 11:31:55', '2022-01-15 11:31:55');
INSERT INTO `orders` VALUES (4, 'guruluckystacker@gmail.com', 2, 2, 'Guru Lucky,xxx xxx', NULL, '2022-01-15 11:31:55', '2022-01-15 11:31:55');
INSERT INTO `orders` VALUES (5, 'guruluckystacker@gmail.com', 1, 3, 'Guru Lucky,tt tt,gg ghg', NULL, '2022-01-15 11:41:16', '2022-01-15 11:41:16');
INSERT INTO `orders` VALUES (6, 'guruluckystacker@gmail.com', 2, 2, 'Guru Lucky,ccc bjh', NULL, '2022-01-15 11:41:16', '2022-01-15 11:41:16');

-- ----------------------------
-- Table structure for tickets
-- ----------------------------
DROP TABLE IF EXISTS `tickets`;
CREATE TABLE `tickets`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eventId` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `from` datetime(0) NULL DEFAULT NULL,
  `to` datetime(0) NULL DEFAULT NULL,
  `price` float NULL DEFAULT NULL,
  `quantity` int(11) NULL DEFAULT NULL,
  `sold` int(11) NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tickets
-- ----------------------------
INSERT INTO `tickets` VALUES (1, 1, 'General Admission1', 'General Admission1', '2022-01-12 04:22:26', '2022-01-14 04:22:32', 10.5, 1000, 9, '2022-01-15 11:24:00', '2022-01-15 11:41:16');
INSERT INTO `tickets` VALUES (2, 1, 'General Admission1', 'General Admission1', '2022-01-12 04:22:26', '2022-01-14 04:22:32', 15.5, 1000, 6, '2022-01-15 11:24:00', '2022-01-15 11:41:16');
INSERT INTO `tickets` VALUES (4, 2, 'General Admission1', 'General Admission1', '2022-01-12 04:22:26', '2022-01-14 04:22:32', 10.5, 1000, 0, '2022-01-15 11:24:00', '2022-01-15 11:24:00');
INSERT INTO `tickets` VALUES (5, 2, 'General Admission1', 'General Admission1', '2022-01-12 04:22:26', '2022-01-14 04:22:32', 15.5, 1000, 0, '2022-01-15 11:24:00', '2022-01-15 11:24:00');
INSERT INTO `tickets` VALUES (6, 3, 'General Admission1', 'General Admission1', '2022-01-12 04:22:26', '2022-01-14 04:22:32', 10.5, 1000, 0, '2022-01-15 11:24:00', '2022-01-15 11:24:00');
INSERT INTO `tickets` VALUES (7, 3, 'General Admission1', 'General Admission1', '2022-01-12 04:22:26', '2022-01-14 04:22:32', 15.5, 1000, 0, '2022-01-15 11:24:00', '2022-01-15 11:24:00');
INSERT INTO `tickets` VALUES (8, 4, 'General Admission1', 'General Admission1', '2022-01-12 04:22:26', '2022-01-14 04:22:32', 10.5, 1000, 0, '2022-01-15 11:24:00', '2022-01-15 11:24:00');
INSERT INTO `tickets` VALUES (9, 4, 'General Admission1', 'General Admission1', '2022-01-12 04:22:26', '2022-01-14 04:22:32', 15.5, 1000, 0, '2022-01-15 11:24:00', '2022-01-15 11:24:00');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `lastName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Guru', 'Lucky', 'guruluckystacker@gmail.com', '9358029', '$2a$10$Y3ubRRphvwVQfRIbw5xKd.TsB3JmX3pvpa0ySiN.NmG2MJkN13AOe', 'client', '133ba90c-ccf5-454c-b618-fe6b23ffd9fb-1642134367043.jpg', '2022-01-14 04:25:38', '2022-01-14 06:31:55');

-- ----------------------------
-- Table structure for venues
-- ----------------------------
DROP TABLE IF EXISTS `venues`;
CREATE TABLE `venues`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of venues
-- ----------------------------
INSERT INTO `venues` VALUES (1, 'BRUNSWICK BALLROOM, MELBOURNE', NULL, 'Australia', '314 Sydney Road, BRUNSWICK VIC 3056', ' (07) 3171 3001', 'www.brunswickballroom.com.au', 'https://ucarecdn.com/cfa10f1e-7dcf-4830-ad21-da8d47fef7e7/08.jpg', '2022-01-15 11:24:00', '2022-01-15 11:24:00');
INSERT INTO `venues` VALUES (2, 'THE TRIFFID, BRISBANE', NULL, 'Australia', '7-9 Stratton Street, NEWSTEAD QLD 4006', ' (07) 3171 3001', 'WWW.thetriffid.com.au', 'https://ucarecdn.com/0240cc65-a2c7-4062-9413-b9e360abf9f5/fabiomangione.jpg', '2022-01-15 11:24:00', '2022-01-15 11:24:00');
INSERT INTO `venues` VALUES (3, 'The Vanguard', NULL, 'Australia', '42 King Street, Newtown NSW 2042', ' (07) 3171 3001', 'www.thevanguard.com.au', 'https://ucarecdn.com/0d3dd0ec-d936-4cd1-9e92-09ddf09e7d29/federicobeccari.jpg', '2022-01-15 11:24:00', '2022-01-15 11:24:00');
INSERT INTO `venues` VALUES (4, 'Oxford Art Factory, Sydney', NULL, 'Australia', 'Basement, 38-46 Oxford St, Darlinghurst NSW 2010', ' (07) 3171 3001', 'www.oxfordartfactory.com', 'https://ucarecdn.com/385f9f54-b065-4a27-b0f4-267c7b76a80d/06.jpg', '2022-01-15 11:24:00', '2022-01-15 11:24:00');

SET FOREIGN_KEY_CHECKS = 1;
