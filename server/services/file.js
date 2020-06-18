// 文件服务
var fs = require('fs');
var multer = require('multer');
var config = require('../config/config')

module.exports = {
    // 处理文件上传
    setFileUpload: function(opts) {
        var that = this;
        var storage = multer.diskStorage({
            // 设置上传后文件路径
            destination: function(req,res,cb) {
                cb(null,that.createFilePath(opts.pathType))
            },
            // 给上传文件重命名，获取添加后缀名
            filename: function(req,file,cb) {
                var filename = Date.now()+'-'+file.originalname;
                cb(null, filename)
            } 
        });
        var upload = multer({
            limits: { // 限制
                fileSize: config.file.limit.fileSize[opts.pathType] || config.file.limit.fileSize.default
            },
            storage: storage
        })
        return upload;
    }
}