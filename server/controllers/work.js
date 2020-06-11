// var co = require('co'); // 自动执行异步函数
var utils = require('../libs/utils'); // 工具类
var Work = require('../models/index').Work; // 实体
var Type = require('../models/index').Type; // 实体

module.exports = {
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
            utils.handleJson({
                response:res,
                error: err
            })
        })
    },
    
}