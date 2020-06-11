var express = require('express');
var router = express.Router();

var workDao = require('../controllers/work');

// 查询全部作品
router.post('/list', function(req, res, next) {
    workDao.getWorkList(req,res,next)
}); 

module.exports = router;