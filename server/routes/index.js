module.exports = function(app) {
  // router分流
  app.use('/user',require('./user'));
  app.use('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
}