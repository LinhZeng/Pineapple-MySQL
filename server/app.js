var express = require('express');
var cors = require('cors')// 跨域cors
var bodyParser = require('body-parser');
var logger = require('morgan'); // 开发模式下log
var path = require('path'); //路径
var routes = require('./routes'); // 路由
const config = require('./config/config');

// 实例化express
var app = express();

// 设置模版目录
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));

// 设置Json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
//注意：中间件的加载顺序很重要。如上面设置静态文件目录的中间件应该放到 routes(app) 之前加载，这样静态文件的请求就不会落到业务逻辑的路由里；

// 配置跨域
app.use(cors({
  origin: '*',//config.cors.origin,
  methods: "PUT,POST,GET,DELETE,OPTIONS",
}))

// 路由
routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
