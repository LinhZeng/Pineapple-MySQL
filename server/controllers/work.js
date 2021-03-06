var co = require('co'); // 自动执行异步函数
var utils = require('../libs/utils'); // 工具类
var Work = require('../models/index').Work; // 实体
var Type = require('../models/index').Type; 
var Comment = require('../models/index').Comment;
var User = require('../models/index').User;
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

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
        var limit = req.body.limit || 0; // 一页多少条
        var offset = limit * ( (req.body.page||0) - 1);
        var req_order = [];
        if(req.body.order==0){ // 按时间排序
            req_order = [['createDate', 'DESC']]
        } else {
            req_order = [['hot', 'DESC']]
        }
        var req_type={};
        if(req.body.type > 1) { // 按分类排序，1代表全部
            req_type = {id: req.body.type}
        }
        Work.findAndCountAll({
            where: {is_del: 0},
            include: [{ 
                model:Type, 
                attributes:['id','name'], 
                through: {attributes: []}, // 排除中间表
                where: req_type
            },{
                model:User, 
                attributes:['id','user_name','user_url']
            }],
            limit: limit,
            offset: offset, // 跳过多少条
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
                required: false, // 外连接
                include: [{
                    model: User,
                    attributes:['id','user_name','user_url']
                }]
            }, {
                model:User, 
                attributes:['id','user_name','user_url'], 
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
        var limit = req.body.limit || 0; // 一页多少条
        var offset = limit * ( (req.body.page||0) - 1);
        Work.findAndCountAll({
            where:{
                userId: req.body.id,
                is_del: 0
            },
            include: [{ 
                model:Type, 
                attributes:['id','name'], 
                through: {attributes: []}, // 排除中间表
            },{
                model:User, 
                attributes:['id','user_name','user_url'], 
            }],
            limit: limit,
            offset: offset, // 跳过多少条
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
    },

    // 模糊查询
    searchwork: function(req,res,next) {
        co(function*(){
            var list = yield Work.findAll({
                where: {
                    [Op.or]: [ 
                        { name: {[Op.like]:'%'+req.body.name+'%'} },
                        { description: {[Op.like]:'%'+req.body.name+'%'} },
                    ]
                }
            });
            // console.log(list)
            utils.handleJson({
                response: res,
                result: {
                    list: list
                },
            })
        }).catch(err => {
            console.log(err)
            utils.handleError({
                response: res,
                error: err
            })
        })   
    },
    
    // 查询分类最热
    gettagworklist: function(req,res,next) {
        Work.findAndCountAll({
            where: {is_del: 0},
            include: [{ 
                model:Type, 
                through: {attributes: []}, // 排除中间表
                where: {id:req.body.type}
            }],
            limit: 10,
            offset: 0,
            order: [['hot', 'DESC']]
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
    }
}