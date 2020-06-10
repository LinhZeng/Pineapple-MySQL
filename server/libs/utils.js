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
    }
}