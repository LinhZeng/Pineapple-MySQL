// 配置文件
var config = {
    // env: 'dev', // 当前环境，便于后面业务中判断
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'pineapple',
        port: 3306
    },
    token: {
        secretOrPrivateKey: 'pasecret'
    },
    file: { // 文件配置
        path: { // 路径
            upload: { // 上传路径
                default: path.join(_dirname, '../public/attchments/default/'),//默认
                avatar: path.join(_dirname, '../public/attchments/avatar/') // 头像
            }
        },
        limit: { // 限制
            fileSize: { // 单个文件最大
                default: 10*1024*1024, // 10M
                avatar: 5*1024*1024
            }
        }
    }
}
module.exports = config;