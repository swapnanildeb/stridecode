var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

var routes = require('./routes/index');
var about = require('./routes/about')
var signup = require('./routes/signup')
var products = require('./routes/products')
var contact = require('./routes/contact')
var signuptype = require('./routes/signuptype')
var studentsignup = require('./routes/studentsignup')
var teachersignup = require('./routes/teachersignup')
var classcode = require('./routes/classcode')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
//****** Add { extended: false } inside urlencoded if doesn't work
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Makes db accessible to the router
app.use(function(req,res,next){
  req.db = db;
  next();
});

app.use('/', routes);
app.use('/about', about);
app.use('/signup', signup);
app.use('/products', products);
app.use('/contact', contact);
app.use('/signuptype', signuptype);
app.use('/studentsignup', studentsignup);
app.use('/teachersignup', teachersignup);
app.use('/classcode', classcode);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
