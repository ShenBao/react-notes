
-- # 角色表
CREATE TABLE  `roles` (
    `id` init(10) unsigned not null  AUTO_INCREMENT,
    `name` varchar(50) not null,
    PRIMARY  KEY ('id')
)
INSERT INTO `roles` VALUES(1, '管理员');
INSERT INTO `roles` VALUES(2, '运营人员');
INSERT INTO `roles` VALUES(3, '测试人员');


-- # 用户表
CREATE TABLE `user`(
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT  NULL ,
    `pwd` VARCHAR (50) NOT  NULL ,
    PRIMARY KEY (`id`) USING BTREE
) ENGING= InnoDB AUTO_INCREMENT=1 DEFAULT  CHARSET=utf8
INSERT INTO `user` VALUES(1, 'admin', '1234');
INSERT INTO `user` VALUES(2, 'user', '1234');
INSERT INTO `user` VALUES(3, 'user2', '1234');


-- # 用户详情表
CREATE TABLE `userDetail` (
    `id` INT (10) UNSIGNED  NOT NULL AUTO_INCREMENT ,
    'useId' INT (10) NOT NULL ,
    'age' INT  NOT NULL ,
    'addr' VARCHAR (120) NOT NULL ,
    'avatar' VARCHAR (1100) NOT NULL ,
    PRIMARY KEY ('id') USING BTREE,
) ENGING= InnoDB AUTO_INCREMENT=1 DEFAULT  CHARSET=utf8
INSERT INTO `userDetail` VALUES(1, 1, 18, '地址', 'http://xx.jpg');
INSERT INTO `userDetail` VALUES(2, 3, 19, '地址', 'http://xx.jpg');


-- # 评论表
CREATE TABLE 'comment' (
    'id' INT (10) UNSIGNED   NOT NULL AUTO_INCREMENT ,
    'userId' VARCHAR (10) NOT  NULL ,
    'msg' VARCHAR (320) NOT NULL ,
    PRIMARY KEY ('id') USING BTREE
) ENGING= InnoDB AUTO_INCREMENT=1 DEFAULT  CHARSET=utf8
INSERT INTO `comment` VALUES(1, 1, 'comment1');
INSERT INTO `comment` VALUES(2, 1, 'comment2');


-- # 用户与角色关联表
CREATE TABLE 'userRoles' (
    'userId' INT (10) NOT NULL ,
    'rolesId' INT (10) NOT NULL ,
    PRIMARY KEY ('userId', 'rolesId') USING BTREE
) ENGING= InnoDB AUTO_INCREMENT=1 DEFAULT  CHARSET=utf8

INSERT INTO `userRoles` VALUES(1, 1);
INSERT INTO `userRoles` VALUES(2, 2);
INSERT INTO `userRoles` VALUES(2, 3);
INSERT INTO `userRoles` VALUES(3, 3);






