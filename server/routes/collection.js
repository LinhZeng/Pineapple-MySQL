var express = require('express');
var router = express.Router();

var collectionDao = require('../controllers/collection');
var tokenService = require('../services/token');

// 查询是否收藏
router.post('/iscollected', tokenService.verifyRouterToken, function(req, res, next) {
    collectionDao.isCollected(req,res,next)
}); 

// 收藏
router.post('/collect', tokenService.verifyRouterToken, function(req, res, next) {
    collectionDao.collect(req,res,next)
}); 
// 取消收藏
router.post('/cancel', tokenService.verifyRouterToken, function(req, res, next) {
    collectionDao.cancelCollect(req,res,next)
}); 

// 查询收藏作品
router.post('/list', function(req, res, next) {
    collectionDao.getCollectionList(req,res,next)
}); 

module.exports = router;