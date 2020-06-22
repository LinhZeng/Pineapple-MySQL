/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50648
 Source Host           : localhost:3306
 Source Schema         : pineapple

 Target Server Type    : MySQL
 Target Server Version : 50648
 File Encoding         : 65001

 Date: 22/06/2020 16:34:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for collection
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `userId` int(10) NOT NULL,
  `workId` int(255) NOT NULL,
  `createDate` datetime(6) DEFAULT NULL,
  `updateDate` datetime(6) DEFAULT NULL,
  `is_del` varchar(1) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  INDEX `workId`(`workId`) USING BTREE,
  CONSTRAINT `collection_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collection_ibfk_2` FOREIGN KEY (`workId`) REFERENCES `work` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of collection
-- ----------------------------
INSERT INTO `collection` VALUES (1, 1, 2, '2020-06-15 15:10:40.000000', '2020-06-15 15:10:40.000000', '0');
INSERT INTO `collection` VALUES (2, 1, 13, '2020-06-15 15:11:04.000000', '2020-06-15 15:11:04.000000', '0');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `userId` int(10) NOT NULL,
  `workId` int(255) NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `is_del` varchar(1) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT '0',
  `createDate` datetime(6) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  INDEX `workId`(`workId`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`workId`) REFERENCES `work` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, 1, 1, '好好看啊', '1', '2020-06-15 02:23:22.000000', '2020-06-15 02:54:22.000000');
INSERT INTO `comment` VALUES (2, 2, 1, '好有感觉', '0', '2020-06-15 11:41:17.000000', '2020-06-15 11:41:17.000000');

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type`  (
  `id` int(10) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of type
-- ----------------------------
INSERT INTO `type` VALUES (1, '全部');
INSERT INTO `type` VALUES (2, '平面');
INSERT INTO `type` VALUES (3, 'UI/UX');
INSERT INTO `type` VALUES (4, '插画');
INSERT INTO `type` VALUES (5, '动漫');
INSERT INTO `type` VALUES (6, '游戏');
INSERT INTO `type` VALUES (7, '摄影');
INSERT INTO `type` VALUES (8, '工业设计');
INSERT INTO `type` VALUES (9, '建筑设计');
INSERT INTO `type` VALUES (10, '手工/布艺');
INSERT INTO `type` VALUES (11, '服装设计');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `intro` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createDate` datetime(6) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'linhz', '橘榴', '/static/img/ray.jpg', '勇往直前，大步流星。约稿请联系邮箱450559685@qq.com', '8fe40f642e4de7db5082b47f271b7316', '2020-06-17 10:09:11.526966', '2020-06-17 10:09:11.000000');
INSERT INTO `user` VALUES (2, 'ray', 'ray', '/static/img/default.png', '暂无简介', '827ccb0eea8a706c4c34a16891f84e7b', '2020-06-18 03:46:32.577115', '2020-06-18 03:46:32.000000');
INSERT INTO `user` VALUES (3, 'davis', '是你嘉哥不是你家鸽', '/static/img/ray.jpg', '勇往直前，大步流星。', 'e10adc3949ba59abbe56e057f20f883e', '2020-06-18 02:40:47.234264', '2020-06-18 02:40:47.000000');

-- ----------------------------
-- Table structure for work
-- ----------------------------
DROP TABLE IF EXISTS `work`;
CREATE TABLE `work`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `src` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createDate` datetime(6) DEFAULT NULL,
  `hot` int(255) DEFAULT 0,
  `userId` int(10) DEFAULT NULL,
  `updateDate` datetime(6) DEFAULT NULL,
  `is_del` varchar(1) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `work_ibfk_1`(`userId`) USING BTREE,
  CONSTRAINT `work_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of work
-- ----------------------------
INSERT INTO `work` VALUES (1, '心如炭火', '心如炭火', 'https://hbimg.huabanimg.com/6c1b9455ea7d070db6382a1e3dd89794d07387153a9a5-Mkcg45', '2020-03-04 19:32:00.000000', 10, 1, '2020-06-15 01:47:22.000000', '1');
INSERT INTO `work` VALUES (2, '摄影', '800x1187, 164 Kb / собака, ноги, кафе, ч/б', 'https://hbimg.huabanimg.com/2062f49c875015f54601147f492c8385cb1ec93c29274-iFxrr4', '2020-03-14 11:47:40.000000', 0, 2, '2020-06-10 15:48:30.000000', '0');
INSERT INTO `work` VALUES (3, '新视觉插画', '新视觉插画', 'https://hbimg.huabanimg.com/e0d5cf6f106bb420e8f2bc1359af45bb6e70828e14565d-3ZrSdM', '2020-03-25 18:15:57.000000', 20, 1, '2020-06-10 15:48:32.000000', '0');
INSERT INTO `work` VALUES (4, '创意海报', '创意 \\\\ 灵感 \\\\ 时尚广告元素 _T2019115 _海報設計采下来 #率叶插件，让花瓣网更好用#', 'https://hbimg.huabanimg.com/c21f188e7763736b4cf8e34be7dccc2bec4ecffcb6e50-RZLSZd', '2020-03-29 16:17:54.000000', 0, 1, '2020-06-10 15:48:35.000000', '0');
INSERT INTO `work` VALUES (5, 'Icon', '#icon#这里静悄悄，期待它的躁动吧', 'https://hbimg.huabanimg.com/5ae09dd38b2ac77f17d3b137e48aa29db325b84d4441f-9tP9PG', '2020-03-29 16:19:45.000000', 0, 1, '2020-06-10 15:48:38.000000', '0');
INSERT INTO `work` VALUES (6, '动漫女', '#オリジナル - こーやふ@3日目ナ39b的插画', 'https://hbimg.huabanimg.com/01325042d8f76fe997f4f30c7a004cf89e1b6b338b61d-Bs04wW', '2020-03-29 16:21:11.000000', 0, 1, '2020-06-10 15:48:40.000000', '0');
INSERT INTO `work` VALUES (7, '这只小熊不太冷', '【Fammi】这只小熊不太冷|插画|商业插画|拉马格 - 原创作品 - 站酷 (ZCOOL)', 'https://hbimg.huabanimg.com/047e6a8ad7c1bc64b55e41ce0410bf5ba2cae3d52d05b-KHl8jK_fw658', '2020-04-07 14:17:54.000000', 0, 1, '2020-06-10 15:48:42.000000', '0');
INSERT INTO `work` VALUES (8, '夜', '夜-来自微博', 'https://hbimg.huabanimg.com/b5420eb947c1f5e511d928dab9c24c530769372e4f2ff-BDboEy_fw658', '2020-04-07 14:20:08.000000', 0, 1, '2020-06-10 15:48:45.000000', '0');
INSERT INTO `work` VALUES (9, '演奏', '「寄稿まとめ」/「零＠通販始めた」の漫画 [pixiv]', 'https://hbimg.huabanimg.com/5ac3bdef29c63013d6f9748fe1153816de79a04ffc7bb-2U6pDf_fw658', '2020-04-07 14:20:49.000000', 5, 1, '2020-04-07 14:20:49.000000', '0');
INSERT INTO `work` VALUES (11, 'vivo Z系列硬核视觉体系', 'vivo Z系列硬核视觉体系，创意商业海报', 'https://hbimg.huabanimg.com/a62fe8fbe103405daa6c4cbf29c3d320366e9626136d19-0KHJAf', '2020-06-12 10:45:25.000000', 0, 2, '2020-06-12 10:45:25.000000', '0');
INSERT INTO `work` VALUES (12, '小老虎', '插画|虎', 'https://hbimg.huabanimg.com/8b700327778316a0e6eaf69e1b1c60091541cf307c1fa-RfGqio', '2020-06-12 10:50:58.000000', 0, 2, '2020-06-12 10:50:58.000000', '0');
INSERT INTO `work` VALUES (13, '618adidas海报', '描边插画设计图-美叶', 'https://hbimg.huabanimg.com/290d4d2f93111c468169fd82c1b11501873c1fa118a47-NHkOx5', '2020-06-12 10:54:39.000000', 0, 2, '2020-06-12 10:54:39.000000', '0');
INSERT INTO `work` VALUES (14, '自在如风的少年', '磊嘉磊—自在如风的少年', 'http://localhost:3000/attchments/work/2020619/1592560044555-自在如风的少年.jpg', '2020-06-19 09:48:06.000000', 0, 1, '2020-06-19 09:48:06.000000', '0');
INSERT INTO `work` VALUES (15, '菠萝男孩', '头像', 'http://localhost:3000/attchments/work/2020619/1592560260558-ray.jpg', '2020-06-19 09:51:29.000000', 0, 1, '2020-06-19 09:51:29.000000', '0');
INSERT INTO `work` VALUES (16, '赵磊', '重庆演唱会—R1SE赵磊', 'http://localhost:3000/attchments/work/2020619/1592560325880-磊-重庆场.jpg', '2020-06-19 09:52:39.000000', 100, 1, '2020-06-19 09:52:39.000000', '0');

-- ----------------------------
-- Table structure for worktype
-- ----------------------------
DROP TABLE IF EXISTS `worktype`;
CREATE TABLE `worktype`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `workId` int(255) DEFAULT NULL,
  `typeId` int(10) DEFAULT NULL,
  `createDate` datetime(6) DEFAULT NULL,
  `updateDate` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `typeId`(`typeId`) USING BTREE,
  INDEX `workId`(`workId`) USING BTREE,
  CONSTRAINT `worktype_ibfk_2` FOREIGN KEY (`typeId`) REFERENCES `type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `worktype_ibfk_3` FOREIGN KEY (`workId`) REFERENCES `work` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of worktype
-- ----------------------------
INSERT INTO `worktype` VALUES (1, 1, 4, '2020-06-11 16:02:02.000000', '2020-06-11 16:02:04.000000');
INSERT INTO `worktype` VALUES (2, 2, 7, '2020-06-11 16:02:07.000000', '2020-06-11 16:02:09.000000');
INSERT INTO `worktype` VALUES (3, 3, 4, '2020-06-11 16:02:12.000000', '2020-06-11 16:02:14.000000');
INSERT INTO `worktype` VALUES (4, 4, 2, '2020-06-11 16:02:17.000000', '2020-06-11 16:02:20.000000');
INSERT INTO `worktype` VALUES (5, 5, 3, '2020-06-11 16:02:23.000000', '2020-06-11 16:02:25.000000');
INSERT INTO `worktype` VALUES (6, 6, 4, '2020-06-11 16:02:27.000000', '2020-06-11 16:02:27.000000');
INSERT INTO `worktype` VALUES (7, 6, 5, '2020-06-11 16:02:32.000000', '2020-06-11 16:02:32.000000');
INSERT INTO `worktype` VALUES (8, 7, 4, '2020-06-11 16:02:36.000000', '2020-06-11 16:02:36.000000');
INSERT INTO `worktype` VALUES (9, 8, 4, '2020-06-11 16:02:40.000000', '2020-06-11 16:02:40.000000');
INSERT INTO `worktype` VALUES (10, 9, 4, '2020-06-11 16:02:48.000000', '2020-06-11 16:02:48.000000');
INSERT INTO `worktype` VALUES (11, 11, 2, '2020-06-12 10:45:25.000000', '2020-06-12 10:45:25.000000');
INSERT INTO `worktype` VALUES (12, 12, 4, '2020-06-12 10:50:58.000000', '2020-06-12 10:50:58.000000');
INSERT INTO `worktype` VALUES (13, 13, 2, '2020-06-12 10:54:40.000000', '2020-06-12 10:54:40.000000');
INSERT INTO `worktype` VALUES (14, 16, 7, '2020-06-19 09:52:39.000000', '2020-06-19 09:52:39.000000');
INSERT INTO `worktype` VALUES (15, 14, 4, '2020-06-19 17:53:20.000000', '2020-06-19 17:53:20.000000');
INSERT INTO `worktype` VALUES (16, 15, 4, '2020-06-19 17:53:53.000000', '2020-06-19 17:53:53.000000');

SET FOREIGN_KEY_CHECKS = 1;
