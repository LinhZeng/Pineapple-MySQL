// 数据库表关系建立
var mysql = require('./mysql');

// 表
var User = require('./user'); // 用户表

module.exports = {
    User: User
}