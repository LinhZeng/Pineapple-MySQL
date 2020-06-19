// 公用api
var express = require('express')
const router = express.Router();
var fileService = require('../services/file');
const utils = require('../libs/utils');


//上传文件
router.post('/upload',fileService.setFileUpload({
    pathType:'default', // 上传对应文件夹，默认
}).single('file'),function(req,res,next){
    utils.handleJson({
        response: res,
        result: {
            url: req.file.fieldname
        }
    })
})

module.exports = router;