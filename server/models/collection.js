var Sequelize = require('sequelize'); // ORM框架
var mysql = require('./mysql');

var Collection = mysql.define('collection', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
		primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull:true
    },
    work_id: {
        type: Sequelize.INTEGER,
        allowNull:true
    },
    is_del: { // 1已删除 0未删除
        type: Sequelize.STRING(2),
        defaultValue: '0'
    }
}, {
    freezeTableName: true, // 自定义表名, false时表明自动为复数
    tableName: 'collection',
    timestamps: true, // 添加时间戳属性(updateAt, createdAt)
    createdAt: 'createDate', // 将createdAt字段改名, 为false表禁用
    updatedAt: 'updateDate',
    comments: "Collection Table" // 描述
});
module.exports = Collection