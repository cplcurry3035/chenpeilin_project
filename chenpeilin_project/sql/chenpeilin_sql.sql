/*
Navicat MySQL Data Transfer

Source Server         : My1811SQL
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : chenpeilin_sql

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2019-02-20 16:08:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for orderprice_page
-- ----------------------------
DROP TABLE IF EXISTS `orderprice_page`;
CREATE TABLE `orderprice_page` (
  `dataid` int(255) NOT NULL,
  `listname` varchar(255) DEFAULT NULL,
  `describe` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `price` int(10) DEFAULT NULL,
  PRIMARY KEY (`dataid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orderprice_page
-- ----------------------------
INSERT INTO `orderprice_page` VALUES ('1', '1', '小米MIX 3 极简保护壳', '../img/shell.jpg', '49');
INSERT INTO `orderprice_page` VALUES ('2', '2', '小米MIX 4 极简保护壳', '../img/shell.jpg', '159');
INSERT INTO `orderprice_page` VALUES ('3', '3', '小米MIX 5 极简保护壳', '../img/shell.jpg', '69');
INSERT INTO `orderprice_page` VALUES ('4', '4', '小米MIX 6 极简保护壳', '../img/shell.jpg', '179');
INSERT INTO `orderprice_page` VALUES ('5', '5', '小米MIX 7 极简保护壳', '../img/shell.jpg', '89');
INSERT INTO `orderprice_page` VALUES ('6', '6', '小米MIX 8 极简保护壳', '../img/shell.jpg', '919');
INSERT INTO `orderprice_page` VALUES ('7', '7', '小米MIX 9 极简保护壳', '../img/shell.jpg', '109');
INSERT INTO `orderprice_page` VALUES ('8', '8', '小米MIX 10 极简保护壳', '../img/shell.jpg', '1319');
INSERT INTO `orderprice_page` VALUES ('9', '9', '小米MIX 11 极简保护壳', '../img/shell.jpg', '129');
INSERT INTO `orderprice_page` VALUES ('10', '10', '小米MIX 12 极简保护壳', '../img/shell.jpg', '139');
INSERT INTO `orderprice_page` VALUES ('11', '11', '小米MIX 13 极简保护壳', '../img/shell.jpg', '149');
INSERT INTO `orderprice_page` VALUES ('12', '12', '小米MIX 14 极简保护壳', '../img/shell.jpg', '159');
INSERT INTO `orderprice_page` VALUES ('13', '13', '小米MIX 15 极简保护壳', '../img/shell.jpg', '169');
INSERT INTO `orderprice_page` VALUES ('14', '14', '小米MIX 16 极简保护壳', '../img/shell.jpg', '179');
INSERT INTO `orderprice_page` VALUES ('15', '15', '小米MIX 17 极简保护壳', '../img/shell.jpg', '489');
INSERT INTO `orderprice_page` VALUES ('16', '16', '小米MIX 18 极简保护壳', '../img/shell.jpg', '199');
INSERT INTO `orderprice_page` VALUES ('17', '17', '小米MIX 19 极简保护壳', '../img/shell.jpg', '209');
INSERT INTO `orderprice_page` VALUES ('18', '18', '小米MIX 20 极简保护壳', '../img/shell.jpg', '219');
INSERT INTO `orderprice_page` VALUES ('19', '19', '小米MIX 21 极简保护壳', '../img/shell.jpg', '229');
INSERT INTO `orderprice_page` VALUES ('20', '20', '小米MIX 22 极简保护壳', '../img/shell.jpg', '239');
INSERT INTO `orderprice_page` VALUES ('21', '21', '小米MIX 23 极简保护壳', '../img/shell.jpg', '249');
INSERT INTO `orderprice_page` VALUES ('22', '22', '小米MIX 24 极简保护壳', '../img/shell.jpg', '559');
INSERT INTO `orderprice_page` VALUES ('23', '23', '小米MIX 25 极简保护壳', '../img/shell.jpg', '269');
INSERT INTO `orderprice_page` VALUES ('24', '24', '小米MIX 26 极简保护壳', '../img/shell.jpg', '279');
INSERT INTO `orderprice_page` VALUES ('25', '25', '小米MIX 27 极简保护壳', '../img/shell.jpg', '289');
INSERT INTO `orderprice_page` VALUES ('26', '26', '小米MIX 28 极简保护壳', '../img/shell.jpg', '299');
INSERT INTO `orderprice_page` VALUES ('27', '27', '小米MIX 29 极简保护壳', '../img/shell.jpg', '309');
INSERT INTO `orderprice_page` VALUES ('28', '28', '小米MIX 30 极简保护壳', '../img/shell.jpg', '409');
INSERT INTO `orderprice_page` VALUES ('29', '29', '小米MIX 31 极简保护壳', '../img/shell.jpg', '419');
INSERT INTO `orderprice_page` VALUES ('30', '30', '小米MIX 32 极简保护壳', '../img/shell.jpg', '429');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tellphone` varchar(255) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'curry', '353011', '13420107947');
INSERT INTO `users` VALUES ('2', '陈培林1111', '123456', '13420101234');
INSERT INTO `users` VALUES ('63', '陈培林', '123456', '15766896198');

-- ----------------------------
-- Table structure for xiaomi_goodslist
-- ----------------------------
DROP TABLE IF EXISTS `xiaomi_goodslist`;
CREATE TABLE `xiaomi_goodslist` (
  `cid` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `sortid` int(255) DEFAULT NULL,
  `listname` varchar(255) DEFAULT NULL,
  `hostimg` varchar(255) DEFAULT NULL,
  `simple_describe` varchar(255) DEFAULT NULL,
  `particular_describe` varchar(2550) DEFAULT NULL,
  `original_price` varchar(10) DEFAULT NULL,
  `present_price` varchar(10) DEFAULT NULL,
  `versions_information` text,
  `starid` int(255) DEFAULT NULL,
  `color_img` varchar(2550) DEFAULT NULL,
  `version_color` varchar(255) DEFAULT NULL,
  `Explanation1` varchar(255) DEFAULT NULL,
  `Explanation2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=201912 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of xiaomi_goodslist
-- ----------------------------
INSERT INTO `xiaomi_goodslist` VALUES ('201901', '201900', '小米8 青春版', '../img/listimgs/201901_01.jpg', '潮流镜面渐变色，2400万自拍旗舰', '潮流镜面渐变色 / 2400万自拍旗舰 / 7.5mm超薄机身 / 6.26’小刘海全面屏 / AI裸妆美颜 / 骁龙660AIE处理器', '1399', '1299', '[\n                                {\n                                    \"version_name\":\"4GB+6GB 全网通\",\n                                    \"original_price\":1399,\n                                    \"present_price\":1299,\n                                    \"color\":[\"深空灰\"],               \n                                    \"currentcolornum\":[100]\n                                },\n                                {\n                                    \"version_name\":\"6GB+6GB 全网通\",\n                                    \"original_price\":1699,\n                                    \"present_price\":1499,\n                                    \"color\":[\"深空灰\",\"梦幻蓝\",\"暮光金\"],               \n                                    \"currentcolornum\":[100,200,300]\n\n                                },\n                                {\n                                    \"version_name\":\"6GB+128GB 全网通\",\n                                    \"original_price\":\"\",\n                                    \"present_price\":1999,\n                                    \"color\":[\"深空灰\",\"梦幻蓝\",\"暮光金\"],               \n                                    \"currentcolornum\":[40,50,60]\n                                }\n                            ]', '201901', '[  \n                    {  \n                        \"img1\":\"../img/listimgs/201901_02.jpg\",\n                        \"img2\":\"../img/listimgs/201901_03.jpg\",\n                        \"img3\":\"../img/listimgs/201901_04.jpg\",\n                        \"img4\":\"../img/listimgs/201901_05.jpg\"\n                    },\n                    {\n                        \"img1\":\"../img/listimgs/201901_06.jpg\",\n                        \"img2\":\"../img/listimgs/201901_07.jpg\",\n                        \"img3\":\"../img/listimgs/201901_08.jpg\",\n                        \"img4\":\"../img/listimgs/201901_09.jpg\"\n\n\n                    },\n                    {\n                        \"img1\":\"../img/listimgs/201901_10.jpg\",\n                        \"img2\":\"../img/listimgs/201901_11.jpg\",\n                        \"img3\":\"../img/listimgs/201901_12.jpg\",\n                        \"img4\":\"../img/listimgs/201901_13.jpg\"\n\n                    }\n                ]', '[\"深空灰\",\"梦幻蓝\",\"暮光金\"]', '「4GB+64GB 深空灰 1299元」', '「6GB+64GB 全色系1499元」');
INSERT INTO `xiaomi_goodslist` VALUES ('201902', '201900', '小米8', '../img/listimgs/201902_01.jpg', '相机全新升级，骁龙845', '相机全新升级到世界前三的拍照体验 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏', '2699', '2299', '[\n                                {\n                                    \"version_name\":\"4GB+6GB 全网通\",\n                                    \"version_id\":1,\n                                    \"original_price\":1399,\n                                    \"present_price\":1299,\n                                    \"color\":[\"深空灰\"],               \n                                    \"currentcolornum\":[100]\n                                },\n                                {\n                                    \"version_name\":\"6GB+6GB 全网通\",\n                                    \"version_id\":2,\n                                    \"original_price\":1699,\n                                    \"present_price\":1499,\n                                    \"color\":[\"深空灰\",\"梦幻蓝\",\"暮光金\"],               \n                                    \"currentcolornum\":[100,200,300]\n\n                                },\n                                {\n                                    \"version_name\":\"6GB+128GB 全网通\",\n                                    \"version_id\":3,\n                                    \"original_price\":1999,\n                                    \"present_price\":1999,\n                                    \"color\":[\"深空灰\",\"梦幻蓝\",\"暮光金\"],               \n                                    \"currentcolornum\":[40,50,60]\n                                }\n                            ]', '201901', '[  \n                    {  \n                        \"img1\":\"../img/listimgs/201902_01.jpg\",\n                        \"img2\":\"../img/listimgs/201901_03.jpg\",\n                        \"img3\":\"../img/listimgs/201901_04.jpg\",\n                        \"img4\":\"../img/listimgs/201901_05.jpg\"\n                    },\n                    {\n                        \"img1\":\"../img/listimgs/201901_06.jpg\",\n                        \"img2\":\"../img/listimgs/201901_07.jpg\",\n                        \"img3\":\"../img/listimgs/201901_08.jpg\",\n                        \"img4\":\"../img/listimgs/201901_09.jpg\"\n\n\n                    },\n                    {\n                        \"img1\":\"../img/listimgs/201901_10.jpg\",\n                        \"img2\":\"../img/listimgs/201901_11.jpg\",\n                        \"img3\":\"../img/listimgs/201901_12.jpg\",\n                        \"img4\":\"../img/listimgs/201901_13.jpg\"\n\n                    }\n]', '[\"深空灰\",\"梦幻蓝\",\"暮光金\"]', '「小米8 6GB+64GB 领券再减200元，券后价2099元」', '小米8 8GB+128GB 领券再减200元，券后价2699元」');
INSERT INTO `xiaomi_goodslist` VALUES ('201903', '201900', '小米8 SE', '../img/listimgs/201903_01.jpg', '三星 AMOLED 全面屏', '三星 AMOLED 全面屏 小屏旗舰 / 骁龙710处理器 / AI 超感光双摄 / 前置2000万柔光自拍', '1999', '1699', '[\n                                {\n                                    \"version_name\":\"4GB+6GB 全网通\",\n                                    \"version_id\":1,\n                                    \"original_price\":1399,\n                                    \"present_price\":1299,\n                                    \"color\":[\"深空灰\"],               \n                                    \"currentcolornum\":[100]\n                                },\n                                {\n                                    \"version_name\":\"6GB+6GB 全网通\",\n                                    \"version_id\":2,\n                                    \"original_price\":1699,\n                                    \"present_price\":1499,\n                                    \"color\":[\"深空灰\",\"梦幻蓝\",\"暮光金\"],               \n                                    \"currentcolornum\":[100,200,300]\n\n                                },\n                                {\n                                    \"version_name\":\"6GB+128GB 全网通\",\n                                    \"version_id\":3,\n                                    \"original_price\":1999,\n                                    \"present_price\":1999,\n                                    \"color\":[\"深空灰\",\"梦幻蓝\",\"暮光金\"],               \n                                    \"currentcolornum\":[40,50,60]\n                                }\n                            ]', '201901', '[  \n                    {  \n                        \"img1\":\"../img/listimgs/201906_01.jpg\",\n                        \"img2\":\"../img/listimgs/201901_03.jpg\",\n                        \"img3\":\"../img/listimgs/201901_04.jpg\",\n                        \"img4\":\"../img/listimgs/201901_05.jpg\"\n                    },\n                    {\n                        \"img1\":\"../img/listimgs/201901_06.jpg\",\n                        \"img2\":\"../img/listimgs/201901_07.jpg\",\n                        \"img3\":\"../img/listimgs/201901_08.jpg\",\n                        \"img4\":\"../img/listimgs/201901_09.jpg\"\n\n\n                    },\n                    {\n                        \"img1\":\"../img/listimgs/201901_10.jpg\",\n                        \"img2\":\"../img/listimgs/201901_11.jpg\",\n                        \"img3\":\"../img/listimgs/201901_12.jpg\",\n                        \"img4\":\"../img/listimgs/201901_13.jpg\"\n\n                    }\n]', '[\"深空灰\",\"梦幻蓝\",\"暮光金\"]', null, null);
INSERT INTO `xiaomi_goodslist` VALUES ('201904', '201911', '红米6', '../img/listimgs/201904_01.jpg', '小屏高性能的双摄手机', '小屏高性能的双摄手机 / 后置1200万 AI双摄 / 12nm八核处理器 / AI 人脸解锁', '799', '729', null, '201901', null, null, null, null);
INSERT INTO `xiaomi_goodslist` VALUES ('201905', '201911', '红米6A', '../img/listimgs/201905_01.jpg', '好用好看不贵', '好用好看不贵 / 12nm高性能处理器 / 1300万高清相机 / “小杨柳腰”机身', '549', '599', null, '201901', null, null, null, null);
INSERT INTO `xiaomi_goodslist` VALUES ('201906', '201912', '黑鲨游戏手机 Helo', '../img/listimgs/201906_01.jpg', '双液冷，更能打', '双液冷 / 独显+AMOLED全面屏 / Gamer Studio / X+1天线 / 骁龙845 / 正面双扬声器 / 标配二代手柄 / 一键Shark模式 / AI灯效', '2999', '3199', null, '201901', null, null, null, null);
INSERT INTO `xiaomi_goodslist` VALUES ('201907', '201900', '小米MIX 2S', '../img/listimgs/201907_01.jpg', '陶瓷机身 手机中的艺术品', '陶瓷机身 手机中的艺术品 / 搭载高通骁龙845 年度旗舰处理器 / AI超感光双摄，DxO百分相机 / 高效 Qi 无线充电', '2399', '3299', null, '201901', null, null, null, null);
INSERT INTO `xiaomi_goodslist` VALUES ('201908', '201900', '小米MIX3', '../img/listimgs/201908_01.jpg', '磁动力滑盖全面屏', '磁动力滑盖全面屏 / 前后旗舰 AI 双摄 / 四曲面彩色陶瓷机身 / 高效 10W 无线充电', null, '3299', null, null, null, null, null, null);
INSERT INTO `xiaomi_goodslist` VALUES ('201909', '201900', '小米6X', '../img/listimgs/201909_01.jpg', '轻薄美观的拍照手机', '轻薄美观的拍照手机 / 前置2000万“治愈系”自拍 / 后置2000万 AI双摄 / 标配骁龙660 AIE处理器', '1199', '1599', null, null, null, null, null, null);
INSERT INTO `xiaomi_goodslist` VALUES ('201910', '201911', '红米note5', '../img/listimgs/201910_01.jpg', '红米国民品质，拍照专家', '红米国民品质，拍照专家 / AI双摄/5.99”全面屏 / 骁龙636处理器/4000mAh大电量 / 超过10000 项严苛检测，70%以上供应商与苹果供应商重叠', '839', '1099', null, null, null, null, null, null);
INSERT INTO `xiaomi_goodslist` VALUES ('201911', '201911', '红米6 Pro', '../img/listimgs/201911_01.jpg', '高颜值大电量 红米旗舰', '高颜值大电量 红米旗舰 / 异形全面屏 19:9 FHD＋ / 后置1200万 AI双摄', '1099', '1299', null, null, null, null, null, null);

-- ----------------------------
-- Table structure for xiaomi_shoppingcart
-- ----------------------------
DROP TABLE IF EXISTS `xiaomi_shoppingcart`;
CREATE TABLE `xiaomi_shoppingcart` (
  `cid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `listname` varchar(255) DEFAULT NULL,
  `describe_img` varchar(255) DEFAULT NULL,
  `present_price` int(10) DEFAULT NULL,
  `gift` varchar(255) DEFAULT NULL,
  `services` varchar(2550) DEFAULT NULL,
  `maxnumber` int(11) DEFAULT NULL,
  `version_information` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `buyofnum` int(11) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=2017790112 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of xiaomi_shoppingcart
-- ----------------------------
SET FOREIGN_KEY_CHECKS=1;
