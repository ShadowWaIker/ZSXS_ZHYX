/*
Navicat MySQL Data Transfer

Source Server         : *
Source Server Version : *
Source Host           : *
Source Database       : *

Target Server Type    : MYSQL
Target Server Version : *
File Encoding         : 65001

Date: 2018-09-07 17:32:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for XJ_XS_SHSJ
-- ----------------------------
DROP TABLE IF EXISTS `XJ_XS_SHSJ`;
CREATE TABLE `XJ_XS_SHSJ` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `xh` varchar(12) DEFAULT NULL COMMENT '学号',
  `hdmc` varchar(100) DEFAULT NULL COMMENT '活动名称',
  `drjs` varchar(50) DEFAULT NULL COMMENT '担任角色',
  `qsrq` date DEFAULT NULL COMMENT '起始日期',
  `jzrq` date DEFAULT NULL COMMENT '结束日期',
  `zzdw` varchar(100) DEFAULT NULL COMMENT '组织单位',
  `zmcl` varchar(200) DEFAULT NULL COMMENT '证明材料（上传图片格式为 jpg 或 jpeg；大小为20K-1M）',
  `bz` varchar(200) DEFAULT NULL COMMENT '备注',
  `deleted` varchar(10) DEFAULT 'False' COMMENT '删除标志',
  PRIMARY KEY (`id`),
  KEY `xh` (`xh`)
) ENGINE=InnoDB AUTO_INCREMENT=512 DEFAULT CHARSET=utf8;
