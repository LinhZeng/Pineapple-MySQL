// User用户表
var Sequelize = require('sequelize'); // ORM框架
var mysql = require('./mysql');

var User = mysql.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    account: {
        type: Sequelize.STRING,
        allowNull:true,
        unique: true 
    },
    user_name: {
        type: Sequelize.STRING,
        allowNull:true,
    },
    user_url: {
        type: Sequelize.STRING,
        allowNull:true
    },
    intro: {
        type: Sequelize.STRING,
        defaultValue: '暂无简介'
    },
    password: {
        type: Sequelize.STRING,
        allowNull:true
    }
}, {
    freezeTableName: true, // 自定义表名, false时表明自动为复数
    tableName: 'user',
    timestamps: true, // 添加时间戳属性(updateAt, createdAt)
    createdAt: 'createDate', // 将createdAt字段改名, 为false表禁用
    updatedAt: 'updateDate',
    comments: "User Table" // 描述
});
module.exports = User