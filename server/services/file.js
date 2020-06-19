// 文件服务
var fs = require('fs');
var multer = require('multer');
var config = require('../config/config')
var path = require('path')

module.exports = {
    // 处理文件上传
    setFileUpload: function(opts) {
        var that = this;
        var storage = multer.diskStorage({
            // 设置上传后文件路径
            destination: function(req,res,cb) {
                cb(null, that.createFilePath(opts.pathType))
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
    },
    createFilePath: function(pathType, filename) {
        var that = this;
        var fpath = path.join(__dirname, '../public/attchments', (pathType || 'default'), that.getDate());
        if(!fs.existsSync(fpath)){ // 目录不存在创建
            fs.mkdirSync(fpath);
        }
        if(filename) {
            return fpath + '/' + filename;
        } else {
            return fpath;
        }
    },
    getDate: function() {
        var fdate = new Date();
        return fdate.getFullYear() + '' + (fdate.getMonth()+1) + '' + fdate.getDate();
    }
}