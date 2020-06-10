// var express = require('express');
// var router = express.Router();
var i18n = require('i18n')
var utils = require('./../libs/utils')

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
module.exports = function(app) {
  // router分流
  app.use('/user',require('./user'));
  app.use(function(req,res,next) {
    if(res && !res.headersSent) {
      utils.handleJson({
        response: res,
        msg: i18n.__('requestApiError')
      })
    }
  })
}