/*
Navicat MySQL Data Transfer

Source Server         : *
Source Server Version : *
Source Host           : *
Source Database       : *

Target Server Type    : MYSQL
Target Server Version : *
File Encoding         : 65001

Date: 2018-09-07 17:32:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for Instructor
-- ----------------------------
DROP TABLE IF EXISTS `Instructor`;
CREATE TABLE `Instructor` (
  `uid` varchar(20) DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `class` varchar(255) DEFAULT NULL,
  `year` varchar(10) DEFAULT NULL,
  `ShowBtn` varchar(10) DEFAULT 'False' COMMENT '显示报道按钮'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
