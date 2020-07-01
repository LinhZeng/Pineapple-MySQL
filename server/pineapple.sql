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

 Date: 30/06/2020 14:04:27
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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of collection
-- ----------------------------
INSERT INTO `collection` VALUES (1, 1, 2, '2020-06-15 15:10:40.000000', '2020-06-15 15:10:40.000000', '0');
INSERT INTO `collection` VALUES (2, 1, 13, '2020-06-15 15:11:04.000000', '2020-06-22 10:48:58.000000', '1');
INSERT INTO `collection` VALUES (3, 3, 21, '2020-06-24 09:34:25.000000', '2020-06-24 09:40:39.000000', '1');

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
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, 1, 1, '好好看啊', '1', '2020-06-15 02:23:22.000000', '2020-06-15 02:54:22.000000');
INSERT INTO `comment` VALUES (2, 2, 1, '好有感觉', '0', '2020-06-15 11:41:17.000000', '2020-06-15 11:41:17.000000');
INSERT INTO `comment` VALUES (5, 3, 25, '人人都有宇航员的梦', '0', '2020-06-24 08:28:25.000000', '2020-06-24 08:28:25.000000');
INSERT INTO `comment` VALUES (6, 3, 21, '心如明镜。', '1', '2020-06-24 09:15:32.376582', '2020-06-24 09:15:32.000000');

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
INSERT INTO `user` VALUES (1, 'linhz', '橘榴', '/static/img/ray.jpg', '勇往直前，大步流星。', '8fe40f642e4de7db5082b47f271b7316', '2020-06-23 03:22:15.013867', '2020-06-23 03:22:15.000000');
INSERT INTO `user` VALUES (2, 'ray', 'ray', 'http://localhost:3000/attchments/avatar/2020623/1592898174111-牛油果头.jpg', '暂无简介', '8fe40f642e4de7db5082b47f271b7316', '2020-06-23 07:43:12.169542', '2020-06-23 07:43:12.000000');
INSERT INTO `user` VALUES (3, 'davis', '是你嘉哥不是你家鸽', 'http://localhost:3000/attchments/avatar/2020623/1592900771890-菠萝头.jpg', '勇往直前，大步流星。', 'e10adc3949ba59abbe56e057f20f883e', '2020-06-23 08:26:13.828276', '2020-06-23 08:26:13.000000');

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
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of work
-- ----------------------------
INSERT INTO `work` VALUES (1, '心如炭火', '心如炭火', 'https://hbimg.huabanimg.com/6c1b9455ea7d070db6382a1e3dd89794d07387153a9a5-Mkcg45', '2020-03-04 19:32:00.000000', 10, 1, '2020-06-15 01:47:22.000000', '0');
INSERT INTO `work` VALUES (2, '摄影', '800x1187, 164 Kb / собака, ноги, кафе, ч/б', 'https://hbimg.huabanimg.com/2062f49c875015f54601147f492c8385cb1ec93c29274-iFxrr4', '2020-03-14 11:47:40.000000', 0, 2, '2020-06-10 15:48:30.000000', '0');
INSERT INTO `work` VALUES (3, '新视觉插画', '新视觉插画', 'https://hbimg.huabanimg.com/e0d5cf6f106bb420e8f2bc1359af45bb6e70828e14565d-3ZrSdM', '2020-03-25 18:15:57.000000', 20, 1, '2020-06-10 15:48:32.000000', '0');
INSERT INTO `work` VALUES (4, '创意海报', '创意 \\\\ 灵感 \\\\ 时尚广告元素 _T2019115 _海報設計采下来 #率叶插件，让花瓣网更好用#', 'https://hbimg.huabanimg.com/c21f188e7763736b4cf8e34be7dccc2bec4ecffcb6e50-RZLSZd', '2020-03-29 16:17:54.000000', 0, 1, '2020-06-10 15:48:35.000000', '0');
INSERT INTO `work` VALUES (5, 'Icon', '#icon#这里静悄悄，期待它的躁动吧', 'https://hbimg.huabanimg.com/5ae09dd38b2ac77f17d3b137e48aa29db325b84d4441f-9tP9PG', '2020-03-29 16:19:45.000000', 0, 1, '2020-06-10 15:48:38.000000', '0');
INSERT INTO `work` VALUES (6, '动漫女', '#オリジナル - こーやふ@3日目ナ39b的插画', 'https://hbimg.huabanimg.com/01325042d8f76fe997f4f30c7a004cf89e1b6b338b61d-Bs04wW', '2020-03-29 16:21:11.000000', 0, 1, '2020-06-10 15:48:40.000000', '0');
INSERT INTO `work` VALUES (7, '这只小熊不太冷', '【Fammi】这只小熊不太冷|插画|商业插画|拉马格 - 原创作品 - 站酷 (ZCOOL)', 'https://hbimg.huabanimg.com/047e6a8ad7c1bc64b55e41ce0410bf5ba2cae3d52d05b-KHl8jK_fw658', '2020-04-07 14:17:54.000000', 0, 1, '2020-06-22 10:47:30.000000', '1');
INSERT INTO `work` VALUES (8, '夜', '夜-来自微博', 'https://hbimg.huabanimg.com/b5420eb947c1f5e511d928dab9c24c530769372e4f2ff-BDboEy_fw658', '2020-04-07 14:20:08.000000', 0, 1, '2020-06-22 10:45:55.000000', '1');
INSERT INTO `work` VALUES (9, '演奏', '「寄稿まとめ」/「零＠通販始めた」の漫画 [pixiv]', 'https://hbimg.huabanimg.com/5ac3bdef29c63013d6f9748fe1153816de79a04ffc7bb-2U6pDf_fw658', '2020-04-07 14:20:49.000000', 5, 1, '2020-06-22 10:44:24.000000', '1');
INSERT INTO `work` VALUES (11, 'vivo Z系列硬核视觉体系', 'vivo Z系列硬核视觉体系，创意商业海报', 'https://hbimg.huabanimg.com/a62fe8fbe103405daa6c4cbf29c3d320366e9626136d19-0KHJAf', '2020-06-12 10:45:25.000000', 0, 2, '2020-06-12 10:45:25.000000', '0');
INSERT INTO `work` VALUES (12, '小老虎', '插画|虎', 'https://hbimg.huabanimg.com/8b700327778316a0e6eaf69e1b1c60091541cf307c1fa-RfGqio', '2020-06-12 10:50:58.000000', 0, 2, '2020-06-12 10:50:58.000000', '0');
INSERT INTO `work` VALUES (13, '618adidas海报', '描边插画设计图-美叶', 'https://hbimg.huabanimg.com/290d4d2f93111c468169fd82c1b11501873c1fa118a47-NHkOx5', '2020-06-12 10:54:39.000000', 0, 2, '2020-06-12 10:54:39.000000', '0');
INSERT INTO `work` VALUES (14, '自在如风的少年', '磊嘉磊—自在如风的少年', 'http://localhost:3000/attchments/work/2020619/1592560044555-自在如风的少年.jpg', '2020-06-19 09:48:06.000000', 0, 1, '2020-06-19 09:48:06.000000', '0');
INSERT INTO `work` VALUES (15, '菠萝男孩', '头像', 'http://localhost:3000/attchments/work/2020619/1592560260558-ray.jpg', '2020-06-19 09:51:29.000000', 0, 1, '2020-06-19 09:51:29.000000', '0');
INSERT INTO `work` VALUES (16, '赵磊', '重庆演唱会—R1SE赵磊', 'http://localhost:3000/attchments/work/2020619/1592560325880-磊-重庆场.jpg', '2020-06-19 09:52:39.000000', 100, 1, '2020-06-19 09:52:39.000000', '0');
INSERT INTO `work` VALUES (17, '荷叶下の金鱼小人', '花瓣每日精选——荷叶下的金鱼小人', 'https://hbimg.huabanimg.com/e50bf43cb6d2e00454478892a6cc6edffa29d25b185f0d-46hgkV', '2020-06-23 08:19:03.000000', 0, 2, '2020-06-23 08:19:03.000000', '0');
INSERT INTO `work` VALUES (18, '2020半年祭', '2020半年祭|UI|闪屏/壁纸|王霄小米 - 原创作品 - 站酷 (ZCOOL)', 'https://hbimg.huabanimg.com/6d4bbac8c4a75c2f816d6c1c20432e77b72daf9dc0246-kNsVJ4', '2020-06-23 08:20:45.000000', 0, 2, '2020-06-23 08:20:45.000000', '0');
INSERT INTO `work` VALUES (19, '2020半年祭—火种', '2020半年祭—给你可以点燃梦想的火种|UI|闪屏/壁纸|王霄小米 - 原创作品 - 站酷 (ZCOOL)', 'https://hbimg.huabanimg.com/cc942ad4ad97206118c39bb41b99659deca4aacbbec07-I1V38u', '2020-06-23 08:22:04.000000', 0, 2, '2020-06-23 08:22:04.000000', '0');
INSERT INTO `work` VALUES (20, '2020半年祭—天空', '2020半年祭—抬头思念，我们都在同一片天空|UI|闪屏/壁纸|王霄小米 - 原创作品 - 站酷 (ZCOOL)', 'https://hbimg.huabanimg.com/57c8ef94f7beef4ce2e89a8f484075153d634c78c184e-qvayGl', '2020-06-23 08:23:02.000000', 0, 2, '2020-06-23 08:23:02.000000', '0');
INSERT INTO `work` VALUES (21, '2020半年祭—明镜且清澈', '2020半年祭—愿你永怀善念，明镜且清澈|UI|闪屏/壁纸|王霄小米 - 原创作品 - 站酷 (ZCOOL)', 'https://hbimg.huabanimg.com/8b545a8fd4f4f7de24dd3e2aa210f672637ee392baa96-EUVobD', '2020-06-23 08:24:29.000000', 0, 2, '2020-06-23 08:24:29.000000', '0');
INSERT INTO `work` VALUES (22, '2020半年祭—漫长的路途', '2020半年祭—漫长的路途，也可以停下来休息|UI|闪屏/壁纸|王霄小米 - 原创作品 - 站酷 (ZCOOL)', 'https://hbimg.huabanimg.com/d1be091035dece81c304c952c2520d855076e894b7f13-OeticI', '2020-06-23 08:25:27.000000', 0, 2, '2020-06-23 08:25:27.000000', '0');
INSERT INTO `work` VALUES (23, '圣诞节', '翻箱底儿的插画|插画|插画习作|_Attendez_ - 原创作品 - 站酷 (ZCOOL)', 'https://hbimg.huabanimg.com/7b8992665b622b2ba2f56b9ba0516266077edcdd1b130-S2ZYUJ', '2020-06-23 08:28:38.000000', 0, 3, '2020-06-23 08:28:38.000000', '0');
INSERT INTO `work` VALUES (24, '拍照', '翻箱底儿的插画|插画|插画习作|_Attendez_ - 原创作品 - 站酷 (ZCOOL)', 'https://hbimg.huabanimg.com/1bbb5efeeba942ee0a3a952b9086154298820f4612b63-wANvKi', '2020-06-23 08:29:16.000000', 0, 3, '2020-06-23 08:29:16.000000', '0');
INSERT INTO `work` VALUES (25, '太空梦', '翻箱底儿的插画|插画|插画习作|_Attendez_ - 原创作品 - 站酷 (ZCOOL)', 'https://hbimg.huabanimg.com/59cde069efea5615ad82b38e4c7ef59687b8d82b1153f-Aulv4Z', '2020-06-23 08:29:44.000000', 0, 3, '2020-06-23 08:29:44.000000', '0');

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
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

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
INSERT INTO `worktype` VALUES (17, 17, 4, '2020-06-23 08:19:03.000000', '2020-06-23 08:19:03.000000');
INSERT INTO `worktype` VALUES (18, 18, 3, '2020-06-23 08:20:45.000000', '2020-06-23 08:20:45.000000');
INSERT INTO `worktype` VALUES (19, 19, 3, '2020-06-23 08:22:04.000000', '2020-06-23 08:22:04.000000');
INSERT INTO `worktype` VALUES (20, 20, 3, '2020-06-23 08:23:02.000000', '2020-06-23 08:23:02.000000');
INSERT INTO `worktype` VALUES (21, 21, 3, '2020-06-23 08:24:30.000000', '2020-06-23 08:24:30.000000');
INSERT INTO `worktype` VALUES (22, 22, 3, '2020-06-23 08:25:28.000000', '2020-06-23 08:25:28.000000');
INSERT INTO `worktype` VALUES (23, 23, 4, '2020-06-23 08:28:38.000000', '2020-06-23 08:28:38.000000');
INSERT INTO `worktype` VALUES (24, 23, 5, '2020-06-23 08:28:38.000000', '2020-06-23 08:28:38.000000');
INSERT INTO `worktype` VALUES (25, 24, 4, '2020-06-23 08:29:17.000000', '2020-06-23 08:29:17.000000');
INSERT INTO `worktype` VALUES (26, 24, 5, '2020-06-23 08:29:17.000000', '2020-06-23 08:29:17.000000');
INSERT INTO `worktype` VALUES (27, 25, 4, '2020-06-23 08:29:44.000000', '2020-06-23 08:29:44.000000');
INSERT INTO `worktype` VALUES (28, 25, 5, '2020-06-23 08:29:44.000000', '2020-06-23 08:29:44.000000');

SET FOREIGN_KEY_CHECKS = 1;
