/*
Navicat MySQL Data Transfer

Source Server         : *
Source Server Version : *
Source Host           : *
Source Database       : *

Target Server Type    : MYSQL
Target Server Version : *
File Encoding         : 65001

Date: 2018-09-07 17:32:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for XJ_XS_JTCY
-- ----------------------------
DROP TABLE IF EXISTS `XJ_XS_JTCY`;
CREATE TABLE `XJ_XS_JTCY` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `xh` varchar(12) NOT NULL COMMENT '学号',
  `xm` varchar(30) NOT NULL COMMENT '姓名',
  `nl` int(4) NOT NULL COMMENT '年龄',
  `ch` varchar(30) NOT NULL COMMENT '称呼',
  `gzdw` varchar(100) NOT NULL COMMENT '工作（学习）单位',
  `whcd` varchar(50) NOT NULL COMMENT '文化程度',
  `zy` varchar(50) NOT NULL COMMENT '职业',
  `zw` varchar(50) NOT NULL COMMENT '职务',
  `nsr` int(6) NOT NULL COMMENT '年收入',
  `jkzk` varchar(50) NOT NULL COMMENT '健康状况',
  `lxdh` varchar(50) NOT NULL COMMENT '联系电话',
  `bz` varchar(50) DEFAULT NULL COMMENT '备注',
  `deleted` varchar(10) NOT NULL DEFAULT 'False' COMMENT '是否删除标志',
  PRIMARY KEY (`id`),
  KEY `xh` (`xh`)
) ENGINE=InnoDB AUTO_INCREMENT=7565 DEFAULT CHARSET=utf8;
