// var co = require('co'); // 自动执行异步函数
var utils = require('../libs/utils'); // 工具类
var Work = require('../models/index').Work; // 实体
var Type = require('../models/index').Type; 
var Comment = require('../models/index').Comment;

module.exports = {
    // 种类查询
    getTagList: function(req,res,next) {
        Type.findAndCountAll({
        }).then(result => {
            var tagList = result.rows || [];
            utils.handleJson({
                response: res,
                result: {
                    list: tagList
                },
            })
        }).catch(function(err){
            utils.handleError({
                response:res,
                error: err
            })
        })
    },
    
    // 分类排序查询
    getWorkList: function(req,res,next) {
        var req_order = [];
        if(req.body.order==0){ // 按时间排序
            req_order = [['createDate', 'DESC']]
        } else {
            req_order = [['hot', 'DESC']]
        }
        var req_type={};
        if(req.body.type != 0) { // 按分类排序，0代表全部
            req_type = {id: req.body.type}
        }
        Work.findAndCountAll({
            include: [{ 
                model:Type, 
                attributes:['id','name'], 
                through: {attributes: []}, // 排除中间表
                where: req_type
            }],
            order: req_order
        }).then(result => {
            var userList = result.rows || [];
            utils.handleJson({
                response: res,
                result: {
                    list: userList
                },
            })
        }).catch(function(err){
            utils.handleError({
                response:res,
                error: err
            })
        })
    },
    
    // 单个查询
    getWorkInfo: function(req,res,next) {
        Work.findOne({
            include: [{ 
                model:Type, 
                attributes:['id','name'], 
                through: {attributes: []}, // 排除中间表
            },{ 
                model:Comment, 
                where: {is_del:'0'},
                required: false // 外连接
            }],
            where: {id:req.body.id}
        }).then(result => {
            if(result) {
                utils.handleJson({
                    response: res,
                    result: {
                        work: result
                    },
                })
            } else {
                utils.handleJson({
					response: res,
					msg: '该作品不存在',
				});
            }
        }).catch(function(err){
            utils.handleError({
                response:res,
                error: err
            })
        })
    },

    // 查询发布作品
    getOwnWorkList: function(req,res,next) {
        Work.findAndCountAll({
            where:{
                userId: req.body.id
            },
            include: [{ 
                model:Type, 
                attributes:['id','name'], 
                through: {attributes: []}, // 排除中间表
            }],
            order: [['createDate','DESC']]
        }).then(result => {
            var workList = result.rows || [];
            utils.handleJson({
                response: res,
                result: {
                    list: workList
                },
            })
        }).catch(function(err){
            utils.handleError({
                response:res,
                error: err
            })
        })
    },

    // 发布作品
    addWork: function(req,res,next) {
        Work.create({
            userId: req.body.userId,
            name: req.body.name,
            description: req.body.description,
            src: req.body.src
        }).then(work_res => {
            Type.findAll({
                where:{id: req.body.type}
            }).then(type_res => {
                work_res.setTypes(type_res).then(result => {
                    console.log(result)
                    utils.handleJson({
                        response: res,
                        result: [],
                        msg:'success'
                    })
                })
            })
        }).catch(function(err){
            utils.handleError({
                response:res,
                error: err
            })
        })
    },

    // 删除作品
    deleteWork: function(req,res,next) {
        Work.update({
            is_del: 1
        },{
            where: {
                id: req.body.id
            }
        }).then(result => {
            utils.handleJson({
                response: res,
                result: [],
                msg:'success'
            })
        }).catch(function(err){
            utils.handleError({
                response:res,
                error: err
            })
        })
    },

    // 评论
    addComment: function(req,res,next) {
        Comment.create({
            userId: req.body.user_id,
            workId: req.body.work_id,
            content: req.body.content
        }).then(result => {
            utils.handleJson({
                response: res,
                result: [],
            })
        }).catch(err=> {
            utils.handleError({
                response: res,
                error: err
            })
        })
    },
    
    // 删除评论
    delComment: function(req,res,next) {
        Comment.update({
            is_del: 1
        },{
            where: {id: req.body.id}
        }).then(result => {
            console.log(result)
            utils.handleJson({
                response: res,
                result: []
            })
        }).catch(err => {
            utils.handleError({
                response: res,
                error:err
            })
        })
    }
}