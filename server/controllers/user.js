var co = require('co'); // 自动执行异步函数
var md5 = require('blueimp-md5'); // md5加密
var tokenService = require('../services/token') // token服务
var utils = require('../libs/utils'); // 工具类
var User = require('../models/index').User; // 实体
var Work = require('../models/index').Work;
var Collection = require('../models/index').Collection
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

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
            utils.handleError({
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
                attributes: {exclude:['password']}
                // attributes: {include:[
                //     [sequelize.fn('COUNT',sequelize.col('works.id')),'work_count'],
                // ]},
                // include: [{
                //     model: Work,
                //     attributes:[],
                // }],
            });
            var workCnt = yield Work.count({where: {userId: req.body.id, is_del:0}});
            var collectionCnt = yield Collection.count({where: {userId: req.body.id, is_del:0}});
            userResult.dataValues.work_count = workCnt;
            userResult.dataValues.collection_count = collectionCnt;
            console.log(userResult.dataValues)
            utils.handleJson({
                response: res,
                result: userResult
            })
        }).catch(function(err){
            utils.handleError({
                response:res,
                error: err
            })
        })   
    },

    // 注册
    register: function(req,res,next){
        var account = utils.trim(req.body.account);
        var password = utils.trim(req.body.password);
        if(!account){
            utils.handleJson({
                response: res,
                msg: '账号不能为空'
            })
            return;
        }
        if(!password){
            utils.handleJson({
                response: res,
                msg: '密码不能为空'
            })
            return;
        }
        co(function*() {
            var resUser = yield User.findOne({
                where: {account: account}
            })
            if(resUser) {
                utils.handleJson({
                    response: res,
                    msg: '该账号已存在'
                })
                return;
            }
            var newUser = yield User.create({
                account: account,
                user_name: account,
                password: md5(password),
                user_url: '/static/img/default.png'
            })
            console.log(newUser)
            if(newUser) {
                utils.handleJson({
                    response: res,
                    result:[],
                    msg: 'OK'
                })
            }
        })
    },

    // 登录
    login: function(req,res,next){ 
        var account = utils.trim(req.body.account);
        var password = utils.trim(req.body.password);
        if(!account){
            utils.handleJson({
                response: res,
                msg: '账号不能为空'
            })
            return;
        }
        if(!password){
            utils.handleJson({
                response: res,
                msg: '密码不能为空'
            })
            return;
        }
        co(function*(){
            var resUser = yield User.findOne({
                where: {account: req.body.account}
            })
            if(!resUser) {
                utils.handleJson({
                    response: res,
                    msg: '该账号不存在'
                })
                return;
            }
            if(resUser.dataValues.password != md5(password)) {
                utils.handleJson({
                    response: res,
                    msg: '密码不正确'
                })
                return;
            }
            var loguser = resUser.dataValues;
            delete loguser.password
            utils.handleJson({
                response: res,
                result: {
                    user:loguser,
                    token: tokenService.setToken({userid: loguser.id})
                },
                msg: 'OK'
            })
        }).catch(err => {
            console.log(err)
            utils.handleError({
                response: res,
                error: err
            })
        })
    },

    // 修改个人信息
    updateUserInfo: function(req,res,next) {
        // console.log(req)
        var token = req.headers.token;
        var flag = tokenService.verifyToken(token, req.body.id);
        if(flag) {
            co(function*(){
                var resUser = yield User.update({
                    user_name: req.body.user_name,
                    user_url: req.body.user_url,
                    intro: req.body.intro
                },{
                    where: {id: req.body.id}
                })
                console.log(resUser)
                if(resUser) {
                    utils.handleJson({
                        response: res,
                        result: [],
                        msg: 'OK'
                    })
                }
            }).catch(err => {
                utils.handleError({
                    response: res,
                    error: err
                })
            })
        } else {
            utils.handleError({
                response: res,
                error: '没有权限修改'
            })
        }  
    },

    // 修改密码
    updateUserPSW: function(req,res,next) {
        var password = utils.trim(req.body.password)
        co(function*(){
            var resUser = yield User.update({
                password: md5(password)
            },{
                where: {id: req.body.id}
            })
            console.log(resUser)
            if(resUser) {
                utils.handleJson({
                    response: res,
                    result: [],
                    msg: 'OK'
                })
            }
        }).catch(err => {
            utils.handleError({
                response: res,
                error: err
            })
        })
    },

    // 模糊查询
    searchuser: function(req,res,next) {
        co(function*(){
            var list = yield User.findAll({
                where: {
                    user_name: {[Op.like]:'%'+req.body.name+'%'} 
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
    }
}