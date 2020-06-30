// 配置文件
var path = require('path');

var config = {
    // env: 'dev', // 当前环境，便于后面业务中判断
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'pineapple',
        port: 3306
    },
    cors: { // 跨域
        origin: ['http://localhost:8080']
    },
    token: {
        secretOrPrivateKey: 'pasecret'
    },
    file: { // 文件配置
        path: { // 路径
            upload: { // 上传路径
                default: path.join(__dirname, '../public/attchments/default/'),//默认
                avatar: path.join(__dirname, '../public/attchments/avatar/') // 头像
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