/*
Navicat MySQL Data Transfer

Source Server         : *
Source Server Version : *
Source Host           : *
Source Database       : *

Target Server Type    : MYSQL
Target Server Version : *
File Encoding         : 65001

Date: 2018-09-07 17:32:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for XJ_XS_XXJL
-- ----------------------------
DROP TABLE IF EXISTS `XJ_XS_XXJL`;
CREATE TABLE `XJ_XS_XXJL` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `xh` varchar(12) DEFAULT NULL COMMENT '学号',
  `qsrq` date DEFAULT NULL COMMENT '起始日期',
  `jzrq` date DEFAULT NULL COMMENT '结束日期',
  `byxx` varchar(64) DEFAULT NULL COMMENT '毕业学校',
  `drzw` varchar(64) DEFAULT NULL COMMENT '职务',
  `zmr` varchar(64) DEFAULT NULL COMMENT '证明人',
  `deleted` varchar(10) NOT NULL DEFAULT 'False' COMMENT '删除标志',
  PRIMARY KEY (`id`),
  KEY `xh` (`xh`)
) ENGINE=InnoDB AUTO_INCREMENT=6300 DEFAULT CHARSET=utf8;
