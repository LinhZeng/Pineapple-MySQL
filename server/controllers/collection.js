// var co = require('co'); // 自动执行异步函数
var utils = require('../libs/utils'); // 工具类
var Work = require('../models/index').Work; // 实体
var Collection = require('../models/index').Collection;
var Type = require('../models/index').Type; 
var User = require('../models/index').User;

module.exports = {

    // 查询是否收藏
    isCollected: function(req,res,next) {
        Collection.findOne({
            where: {
                userId: req.body.user_id,
                workId: req.body.work_id
            }
        }).then(result => {
            console.log(result)
            if(result) {
                utils.handleJson({
                    response: res,
                    result: {
                        isCollected: 1,
                    },
                })
            } else {
                utils.handleJson({
					response: res,
					result: {
                        isCollected: 0,
                    },
				});
            }
        }).catch(function(err){
            utils.handleError({
                response:res,
                error: err
            })
        })
    },

    // 收藏
    collect: function(req,res,next) {
        Collection.findOrCreate({
            where: {
                userId: req.body.user_id,
                workId: req.body.work_id,
            },
            defaults: {
                userId: req.body.user_id,
                workId: req.body.work_id,
            }
        }).then(result => {
            console.log(result)
            if(!result[1]) {
                Collection.update({
                    is_del: 0
                },{
                    where: {
                        userId: req.body.user_id,
                        workId: req.body.work_id,
                    }
                })
                utils.handleJson({
                    response: res,
                    result: {
                        isCollected: 1,
                    },
                })
            } else {
                utils.handleJson({
                    response: res,
                    result: {
                        isCollected: 1,
                    },
                });
            }
        }).catch(function(err){
            console.log(err)
            utils.handleError({
                response:res,
                error: err
            })
        })
    },
    // 取消收藏
    cancelCollect: function(req,res,next) {
        Collection.update({
            is_del: 1
        },{
            where: {
                userId: req.body.user_id,
                workId: req.body.work_id,
            }
        }).then(result => {
            console.log(result)
            if(result[0]) {
                utils.handleJson({
                    response: res,
                    result: {
                        isCollected: 0,
                    },
                })
            } else {
                utils.handleJson({
                    response: res,
                    result: [],
                    msg: '未收藏',
                });
            }
        }).catch(function(err){
            console.log(err)
            utils.handleError({
                response:res,
                error: err
            })
        })
    },

    // 查询收藏作品
    getCollectionList: function(req,res,next) {
        var limit = req.body.limit || 0; // 一页多少条
        var offset = limit * ( (req.body.page||0) - 1);
        Collection.findAndCountAll({
            where: {
                userId: req.body.id,
                is_del: 0
            },
            include: [{ 
                model: Work, 
                include: [{ 
                    model:Type, 
                    attributes:['id','name'], 
                    through: {attributes: []}, // 排除中间表
                },{
                    model:User, 
                    attributes:['id','user_name','user_url'], 
                }],
            }],
            limit: limit,
            offset: offset, // 跳过多少条
            order: [['updateDate', 'DESC']]
        }).then(result => {
            var collectionList = result.rows || [];
            utils.handleJson({
                response: res,
                result: {
                    list: collectionList
                },
            })
        }).catch(function(err){
            utils.handleError({
                response:res,
                error: err
            })
        })
    }
}