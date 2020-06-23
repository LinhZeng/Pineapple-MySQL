// 公用api
var express = require('express')
var router = express.Router();
var fileService = require('../services/file');
var utils = require('../libs/utils');
const e = require('express');


//上传作品文件
router.post('/workupload',fileService.setFileUpload({
    pathType: 'work', 
}).single('file'),function(req,res,next){
    utils.handleJson({
        response: res,
        result: {
            url: fileService.getDate() + '/' + req.file.filename
        }
    })
})
//上传头像
router.post('/avatarupload',fileService.setFileUpload({
    pathType: 'avatar', 
}).single('file'),function(req,res,next){
    utils.handleJson({
        response: res,
        result: {
            url: fileService.getDate() + '/' + req.file.filename
        }
    })
})

module.exports = router;