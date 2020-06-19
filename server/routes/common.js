// 公用api
var express = require('express')
var router = express.Router();
var fileService = require('../services/file');
var utils = require('../libs/utils');
const e = require('express');


//上传文件
router.post('/upload',fileService.setFileUpload({
    pathType:'work', // 上传对应文件夹，默认
}).single('file'),function(req,res,next){
    utils.handleJson({
        response: res,
        result: {
            url: fileService.getDate() + '/' + req.file.filename
        }
    })
})

module.exports = router;