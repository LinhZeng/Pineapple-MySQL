// token服务
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var Promise = require('bluebird');

module.exports = {
    setToken: function(payload){
        var expiresIn = Date.now() + 3600000 //* 24 * 5; // 5天时限
        var token = jwt.sign(payload,config.token.secretOrPrivateKey,{expiresIn: expiresIn});
        return {
            token: token,
            expiresIn: expiresIn
        };
    },
    verifyToken: function(token, userid){
        var flag = jwt.verify(token,config.token.secretOrPrivateKey,function(err,tokenData){    
            if(tokenData && tokenData.userid == userid) {
                return true;
            } else {
                return false;
            }
        });
        return flag;
    },
    verifyRouterToken: function(req,res,next){
        var token = req.headers.token;
        if(!token) {
            res.json ({
                code: '401',
                msg: 'token失效'
            })
            return;
        } else {
            jwt.verify(token,config.token.secretOrPrivateKey,function(err,tokenData){
                if(err) {
                    res.json({
                        code: '402',
                        msg: 'token验证失败'
                    });
                    return;
                }
                var userid = (req.body || req.query || req.params)['userid'];
                if(userid && userid != tokenData.userid) {
                    res.json({
                        code: '403',
                        msg: 'token用户信息不一致'
                    });
                    return;
                }
                next();
            })
        }

    },
    delToken: function(token) {
        if(!token) {
            return 'delTokenFail'
        } else {
            jwt.decode(token)
            return 'delTokenSuccess'
        }
    }
}