var express = require('express');                   // Loading in dependencies (AS)
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var app = express();                                //Loading the express app (AS)

// view engine setup
app.set('views', path.join(__dirname, 'views'));    //Setting default views to the view directory (AS)
app.set('view engine', 'hjs');                      //Setting view engine to use hogan templates (AS)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//Use express as middleware to serve static files
//Serve up files that are in the public directory and use Express's static file handler to do so
app.use('/public',express.static("public"));

//Handlebars config
var exphbs = require('express3-handlebars');
app.engine('handlebars',
    exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); //Tell the app that the view engine property is also handlebars

app.use(require('./controllers/'));  // Sequelize routes

app.get('/', function(req,res) {
    res.render('index');
});

app.get('/about', function(req,res) {
    res.render('about');
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {                  // 404 handling (AS)
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
