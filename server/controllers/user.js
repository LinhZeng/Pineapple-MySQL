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
            utils.handleJson({
                response:res,
                error: err
            })
        })   
    },

    // 注册
    register: function(req,res,next){
        co(function*() {
            var resUser = yield User.findOne({
                where: {account: req.body.account}
            })
            if(resUser) {
                utils.handleJson({
                    response: res,
                    msg: '该用户名已存在'
                })
                return;
            }
            var newUser = yield User.create({
                account: req.body.account,
                user_name: req.body.account,
                password: req.body.password,
                // user_url: req.body.user_url
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
        co(function*(){
            var resUser = yield User.findOne({
                where: {account: req.body.account}
            })
            if(!resUser) {
                utils.handleJson({
                    response: res,
                    msg: '该用户不存在'
                })
                return;
            }
            if(resUser.dataValues.password != req.body.password) {
                utils.handleJson({
                    response: res,
                    msg: '密码不正确'
                })
                return;
            }
            utils.handleJson({
                response: res,
                result: [],
                msg: 'OK'
            })
        })
    },

    // 修改个人信息
    updateUserInfo: function(req,res,next) {
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
            utils.handleJson({
                response: res,
                error: err
            })
        })
    },

    // 修改密码
    updateUserPSW: function(req,res,next) {
        co(function*(){
            var resUser = yield User.update({
                password: req.body.password
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
            utils.handleJson({
                response: res,
                error: err
            })
        })
    }
}