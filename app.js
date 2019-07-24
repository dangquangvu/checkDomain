var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = express.Router();
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var morgan = require('morgan');
var app = express();
var bodyParser = require('body-parser')
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;

//var flash = require('express-flash');
// view engine setup


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + '../public'));
app.use(express.static(__dirname + "../views"));
//require('./public/db/passport')(passport);
app.use(morgan('dev')); // sử dụng để log mọi request ra console
app.use(cookieParser()); // sử dụng để đọc thông tin từ cookie
app.use(bodyParser());
app.use(session({ secret: 'xxxxxxxxxxxxx', saveUninitialized: true, resave: true }));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_mesages = req.flash('success')
    res.locals.error_messages = req.flash('error')
    next()
})
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);

app.use(function(req, res, next) {
    next(createError(404));
});
app.use(function(req, res) {
    res.status(400);
    res.send({ title: '404: File Not Found', error: error });
});

// Handle 500
app.use(function(error, req, res, next) {
    res.status(500);
    res.send({ title: '500: Internal Server Error', error: error });
});
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;