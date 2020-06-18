// 检查中间件
var tokenService = require('../services/token');
 
module.exports = {
    checkToken: function(req,res,next) {
        tokenService.verifyRouterToken(req,res,next)
    }
}