/**  
 * 数据库-封装
 * 基于mysql
 * 使用Sequelize
 */
var Sequelize = require('sequelize'); // mysql框架
var config = require('./../config/config')

var mysql = new Sequelize(config.mysql.database, config.mysql.user,config.mysql.password,{
    host: config.mysql.host,
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})
module.exports = mysql