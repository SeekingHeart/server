/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : koa

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 02/09/2022 09:05:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for photo
-- ----------------------------
DROP TABLE IF EXISTS `photo`;
CREATE TABLE `photo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `filename` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `views` double NOT NULL,
  `isPublished` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of photo
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for photo_metadata
-- ----------------------------
DROP TABLE IF EXISTS `photo_metadata`;
CREATE TABLE `photo_metadata` (
  `id` int NOT NULL AUTO_INCREMENT,
  `height` int NOT NULL,
  `width` int NOT NULL,
  `orientation` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `compressed` tinyint NOT NULL,
  `comment` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `photoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_99f01ed52303cc16139d69f746` (`photoId`),
  CONSTRAINT `FK_99f01ed52303cc16139d69f7464` FOREIGN KEY (`photoId`) REFERENCES `photo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of photo_metadata
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES (1, 'msdsdsd', '$argon2i$v=19$m=4096,t=3,p=1$BuIfxbxZuL4GxsLWXNtNlw$eEoPC6NfNra99xMGOjfTR0sKRxvLiI395VJ+a09oPXk', 'zsds@126.com');
INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES (2, 'zsj', '$argon2i$v=19$m=4096,t=3,p=1$7B9IQ6WOWbr3UwnIWJkVNw$4erDZuQC8v601t6lsFD9lvqTt/aZQvqC/c7+TRegr6o', 'zss@126.com');
INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES (3, 'zsj123', '$argon2i$v=19$m=4096,t=3,p=1$7Z2VMAAT1EtaNdG7S0TfBw$0m1WLaMXhhlgqsvL/owPdJzvoCWWpwVHkUnQjdJmOWI', '11112');
INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES (4, 'zsj888', '$argon2i$v=19$m=4096,t=3,p=1$TwdnSxwIdIgLJQtegiFYOg$o2OUzB5MNkJLEW3D6TH5ESFJwQgp0GeenQ9w8pspVcU', '11112');
INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES (5, 'zsj888', '$argon2i$v=19$m=4096,t=3,p=1$erfr8nqUAlAIzYenqoQorA$HnXmfChv0rdYqhf2R9mN4Pusd/59gpZnr2InhzvEhhg', '11112');
INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES (6, 'zsj', '$argon2i$v=19$m=4096,t=3,p=1$aLN3msVeKnu27GZmKf3HJQ$Ymsf6cmD5u1WFoUoTjE0U/7kNMtcCuLrVgzDNpt27b8', 'sssd');
INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES (7, 'admin', '$argon2id$v=19$m=4096,t=3,p=1$hrEIzLZEke9+OI7OAzzYvQ$IxFJ0AxWQ4b3+fUUEDF/gGZ9hyKHUpDbPqamlNGWmJA', 'sd1@125.com');
INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES (8, 'admin111', '$argon2id$v=19$m=4096,t=3,p=1$kPkwIv2UBTJ92EkIjj4Wsw$HKPA9Vz05+9/23P23kBig+rvkTpCiptbtmMgZw0/Z30', '1122@126.com');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
