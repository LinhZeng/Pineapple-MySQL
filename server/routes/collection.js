var express = require('express');
var router = express.Router();

var collectionDao = require('../controllers/collection');

// 查询是否收藏
router.post('/iscollected', function(req, res, next) {
    collectionDao.isCollected(req,res,next)
}); 

// 收藏
router.post('/collect', function(req, res, next) {
    collectionDao.collect(req,res,next)
}); 
// 取消收藏
router.post('/cancel', function(req, res, next) {
    collectionDao.cancelCollect(req,res,next)
}); 

// 查询收藏作品
router.post('/list', function(req, res, next) {
    collectionDao.getCollectionList(req,res,next)
}); 

module.exports = router;