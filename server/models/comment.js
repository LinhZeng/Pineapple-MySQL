var Sequelize = require('sequelize'); // ORM框架
var mysql = require('./mysql');

var Comment = mysql.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
		primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    work_id: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    content: {
        type: Sequelize.STRING,
        allowNull:false
    }
}, {
    freezeTableName: true, // 自定义表名, false时表明自动为复数
    tableName: 'comment',
    timestamps: true, // 添加时间戳属性(updateAt, createdAt)
    createdAt: 'createDate', // 将createdAt字段改名, 为false表禁用
    updatedAt: 'updateDate',
    comments: "Comment Table" // 描述
});
module.exports = Comment