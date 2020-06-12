var express = require('express');
var router = express.Router();

var workDao = require('../controllers/work');

// 查询种类
router.post('/taglist', function(req, res, next) {
    workDao.getTagList(req,res,next)
}); 

// 查询全部作品
router.post('/list', function(req, res, next) {
    workDao.getWorkList(req,res,next)
}); 

// 查询单个作品
router.post('/detail', function(req, res, next) {
    workDao.getWorkInfo(req,res,next)
}); 

// 查询已发作品
router.post('/ownlist', function(req, res, next) {
    workDao.getOwnWorkList(req,res,next)
}); 


module.exports = router;