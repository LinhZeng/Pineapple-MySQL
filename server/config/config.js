// 配置文件
var config = {
    env: 'dev', // 当前环境，便于后面业务中判断
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'test',
        port: 3306
    }
}
module.exports = config;