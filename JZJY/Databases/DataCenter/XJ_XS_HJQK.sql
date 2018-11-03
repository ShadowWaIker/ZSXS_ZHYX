/*
Navicat MySQL Data Transfer

Source Server         : *
Source Server Version : *
Source Host           : *
Source Database       : *

Target Server Type    : MYSQL
Target Server Version : *
File Encoding         : 65001

Date: 2018-09-07 17:32:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for XJ_XS_HJQK
-- ----------------------------
DROP TABLE IF EXISTS `XJ_XS_HJQK`;
CREATE TABLE `XJ_XS_HJQK` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `xh` varchar(12) NOT NULL COMMENT '学号',
  `jxmc` varchar(100) NOT NULL COMMENT '奖项名称',
  `jxjb` varchar(50) NOT NULL COMMENT '奖项级别（国家级、省级、其他）',
  `hjsj` date NOT NULL COMMENT '获奖时间',
  `zzdw` varchar(100) NOT NULL COMMENT '组织单位',
  `hjdj` varchar(100) NOT NULL COMMENT '获奖等级（一等奖、二等奖、三等奖、其他）',
  `zmcl` varchar(200) NOT NULL COMMENT '证明材料（上传图片格式为 jpg 或 jpeg；大小为20K-1M）',
  `bz` varchar(50) DEFAULT NULL COMMENT '备注',
  `deleted` varchar(20) DEFAULT 'False' COMMENT '删除标志',
  PRIMARY KEY (`id`),
  KEY `xh` (`xh`)
) ENGINE=InnoDB AUTO_INCREMENT=437 DEFAULT CHARSET=utf8;
