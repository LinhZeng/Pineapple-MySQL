var Sequelize = require('sequelize'); // ORM框架
var mysql = require('./mysql');

var Type = mysql.define('type', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull:true
    },
}, {
    freezeTableName: true, // 自定义表名, false时表明自动为复数
    tableName: 'type',
    timestamps: true, // 添加时间戳属性(updateAt, createdAt)
    createdAt: false, // 将createdAt字段改名, 为false表禁用
    updatedAt: false,
    comments: "Type Table" // 描述
});
module.exports = Type