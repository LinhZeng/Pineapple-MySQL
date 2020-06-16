var Sequelize = require('sequelize'); // ORM框架
var mysql = require('./mysql');

var Work = mysql.define('work', {
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
    description: {
        type: Sequelize.STRING,
        allowNull:true
    },
    src: {
        type: Sequelize.STRING,
        allowNull:true
    },
    hot: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    is_del: {
        type: Sequelize.STRING(2),
        defaultValue: '0'
    }
}, {
    freezeTableName: true, // 自定义表名, false时表明自动为复数
    tableName: 'work',
    timestamps: true, // 添加时间戳属性(updateAt, createdAt)
    createdAt: 'createDate', // 将createdAt字段改名, 为false表禁用
    updatedAt: 'updateDate',
    comments: "Work Table" // 描述
});
module.exports = Work