var express = require('express');
var router = express.Router();

var userDao = require('../controllers/user');

// 查询全部用户
router.get('/list', function(req, res, next) {
  userDao.getUserList(req,res,next)
});

module.exports = router;
