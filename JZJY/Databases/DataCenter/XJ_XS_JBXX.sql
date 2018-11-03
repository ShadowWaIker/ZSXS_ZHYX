/*
Navicat MySQL Data Transfer

Source Server         : *
Source Server Version : *
Source Host           : *
Source Database       : *

Target Server Type    : MYSQL
Target Server Version : *
File Encoding         : 65001

Date: 2018-09-07 17:32:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for XJ_XS_JBXX
-- ----------------------------
DROP TABLE IF EXISTS `XJ_XS_JBXX`;
CREATE TABLE `XJ_XS_JBXX` (
  `xh` varchar(12) NOT NULL COMMENT '学号',
  `ksh` varchar(20) NOT NULL COMMENT '考生号',
  `sfzh` varchar(18) NOT NULL COMMENT '身份证号',
  `tzsbh` varchar(20) NOT NULL COMMENT '通知书编号',
  `xm` varchar(30) NOT NULL COMMENT '姓名',
  `xb` varchar(2) NOT NULL COMMENT '性别',
  `csny` varchar(20) NOT NULL COMMENT '出生日期',
  `xi` varchar(30) NOT NULL COMMENT '系',
  `zp_gk` varchar(200) DEFAULT NULL COMMENT '高考照片',
  `zp_xj` varchar(200) DEFAULT NULL COMMENT '学籍照片',
  `zp_byz` varchar(200) DEFAULT NULL COMMENT '毕业照片',
  `bh` varchar(20) DEFAULT NULL COMMENT '行政班',
  `zymc` varchar(20) DEFAULT NULL COMMENT '专业名称',
  `mz` varchar(30) DEFAULT NULL COMMENT '民族',
  `kslx` varchar(20) DEFAULT NULL COMMENT '考生类型',
  `zzmm` varchar(20) DEFAULT NULL COMMENT '政治面貌',
  `syszd` varchar(20) DEFAULT NULL COMMENT '生源所在地',
  `jkzk` varchar(20) DEFAULT NULL COMMENT '健康状况',
  `sg` int(4) DEFAULT NULL COMMENT '身高（cm）',
  `tz` int(4) DEFAULT NULL COMMENT '体重（kg）',
  `qq` varchar(30) DEFAULT NULL COMMENT 'QQ',
  `email` varchar(100) DEFAULT NULL COMMENT 'Email',
  `lxdh` varchar(50) DEFAULT NULL COMMENT '本人联系电话',
  `byyx` varchar(20) DEFAULT NULL COMMENT '毕业院校',
  `tc` varchar(100) DEFAULT NULL COMMENT '本人特长',
  `xqah` varchar(100) DEFAULT NULL COMMENT '兴趣爱好',
  `zygh` varchar(2050) DEFAULT NULL COMMENT '职业规划',
  `jtdz` varchar(200) DEFAULT NULL COMMENT '家庭通讯地址',
  `jtyzbm` varchar(10) DEFAULT NULL COMMENT '家庭邮政编码',
  `jtlxdh` varchar(50) DEFAULT NULL COMMENT '家庭联系电话',
  `jtlx` varchar(50) DEFAULT NULL COMMENT '家庭类型',
  `jtrks` int(4) DEFAULT NULL COMMENT '家庭人口数',
  `jthk` varchar(20) DEFAULT NULL COMMENT '家庭户口',
  `jtsrly` varchar(100) DEFAULT NULL COMMENT '收入来源',
  `jtnsr` int(6) DEFAULT NULL COMMENT '家庭年收入',
  `jtysr` int(6) DEFAULT NULL COMMENT '家庭月总收入',
  `rjysr` int(6) DEFAULT NULL COMMENT '人均月收入',
  `jtywsj` varchar(300) DEFAULT NULL COMMENT '家庭意外事件',
  `jtcysyqk` varchar(300) DEFAULT NULL COMMENT '家庭成员失业情况',
  `jtqzqk` varchar(300) DEFAULT NULL COMMENT '家庭欠债情况及原因',
  `qtqk` varchar(300) DEFAULT NULL COMMENT '其它情况',
  `bz` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`xh`),
  UNIQUE KEY `xh` (`xh`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
