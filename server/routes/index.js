module.exports = function(app) {
  // router分流
  app.use('/common',require('./common'));
  app.use('/user',require('./user'));
  app.use('/work',require('./work'));
  app.use('/collection',require('./collection'));
  app.use('/', function(req, res, next) {
    console.log('welcome to pineapple')
    res.render('index', { title: 'Express' });
  });
}