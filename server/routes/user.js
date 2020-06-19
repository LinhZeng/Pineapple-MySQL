var express = require('express');
var router = express.Router();
var checkToken = require('../middlewares/check').checkToken;
var userDao = require('../controllers/user');
var tokenService = require('../services/token');

// 查询全部用户
router.get('/list', function(req, res, next) {
  userDao.getUserList(req,res,next)
});

// 查询单个用户信息
router.post('/userinfo', function(req, res, next) {
  userDao.getUserInfo(req,res,next)
});

// 注册
router.post('/register', function(req, res, next) {
  userDao.register(req,res,next)
});

// 登录
router.post('/login', function(req, res, next) {
  userDao.login(req,res,next)
});

// 修改个人信息
router.post('/editinfo', tokenService.verifyRouterToken,function(req, res, next) {
  userDao.updateUserInfo(req,res,next)
});

// 修改密码
router.post('/editpsw', tokenService.verifyRouterToken, function(req, res, next) {
  userDao.updateUserPSW(req,res,next)
});

module.exports = router;
