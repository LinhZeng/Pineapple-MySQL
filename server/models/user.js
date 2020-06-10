// User用户表
var Sequelize = require('sequelize');
var mysql = require('./mysql');

var User = mysql.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
		primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull:true
    }
}, {
    freezeTableName: true, // 自定义表名
    tableName: 'user',
    timestamps: true, // 添加时间戳属性(updateAt, createdAt)
    createdAt: 'createDate', // 将createdAt字段改名
    updatedAt: 'updateDate',
    indexes: [{ // 索引
        type: 'UNIQUE', // UNIQUE、 FULLTEXT 或 SPATIAL之一
        method: 'BTREE', // BTREE 或 HASH
        unique: true, // 唯一 //设置索引是否唯一，设置后会自动触发UNIQUE设置//true:索引列的所有值都只能出现一次，即必须唯一
        fields: ['id'], // /建立索引的字段数组。每个字段可以是一个字段名，sequelize 对象 (如 sequelize.fn)，或一个包含：attribute (字段名)、length (创建前缀字符数)、order (列排序方向)、collate (较验的字段集合 (排序))
    }],
    comments: "User Table" // 描述
});
module.exports = User