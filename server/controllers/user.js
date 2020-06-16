var co = require('co'); // 自动执行异步函数
var sequelize = require('sequelize')
var utils = require('../libs/utils'); // 工具类
var User = require('../models/index').User; // 实体
var Work = require('../models/index').Work;
var Collection = require('../models/index').Collection

module.exports = {
    // 查询全部
    getUserList: function(req,res,next) {
        co(function*() {
            var result = yield User.findAndCountAll({})
            console.log(result)
            var userList = result.rows || [];
            utils.handleJson({
                response: res,
                result: {
                    list: userList
                },
            })
        }).catch(function(err){
            utils.handleJson({
                response:res,
                error: err
            })
        })
    },
    
    // 查询个人信息
    getUserInfo: function(req,res,next) {
        co(function*() {
            var userResult = yield User.findOne({
                where: {id: req.body.id},
                // attributes: {include:[
                //     [sequelize.fn('COUNT',sequelize.col('works.id')),'work_count'],
                // ]},
                // include: [{
                //     model: Work,
                //     attributes:[],
                // }],
            });
            var workCnt = yield Work.count({where: {userId: req.body.id}});
            var collectionCnt = yield Collection.count({where: {userId: req.body.id}});
            userResult.dataValues.work_count = workCnt;
            userResult.dataValues.collection_count = collectionCnt;
            console.log(userResult.dataValues)
            utils.handleJson({
                response: res,
                result: userResult
            })
        }).catch(function(err){
            utils.handleJson({
                response:res,
                error: err
            })
        })   
    },

    // 注册
    register: function(req,res,next){}
}