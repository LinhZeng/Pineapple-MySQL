// 工具类

module.exports = {
    handleJson: function(opts) {
        if(opts.result) {
            opts.response.json({
                code: "200",
                msg: opts.msg,
                result: opts.result
            })
        } else {
            opts.response.json({
                code: "-1",
                msg: opts.msg,
                result: ''
            })
        }
    },
    handleError:function(opts) {
        var that = this;
        var error = opts.error || "error";
        if(error == 'break') return;
        // 处理错误回执消息
        var failOptions = {
            response: opts.response,
            result: ''
        }
        if(typeof error === 'string') {
            failOptions.msg = error
        }
        that.handleJson(failOptions);
    },
    trim: function(str) {
        if(str) {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        } else return '';
    }
}