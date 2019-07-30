var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var logger = require('morgan');
var morgan = require('morgan');
var app = express();
var bodyParser = require('body-parser')
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/auto_check", {
    useNewUrlParser: true,
    useCreateIndex: true
});
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
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
var conf = {
    db: {
        db: 'auto_check',
        host: 'localhost',
        collection: 'sessions'
    },
    secret: '076ee61d63aa10a125ea872411e433b9'
};
app.use(session({
    secret: conf.secret,
    cookie: { maxAge: 2592000000 },
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection

        //ttl: 60000
    })
}));
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
// app.get('/see', auth.restrict, routes.account);
// auth.restrict = function(req, res, next) {
//     if (!req.session.userid) {
//         req.session.redirectTo = '/account';
//         res.redirect('/login');
//     } else {
//         next();
//     }
// };
app.use(function(req, res) {
    res.status(400);
    res.send({ title: '404: File Not Found', error: error });
});
app.use(function(error, req, res, next) {
    res.status(500);
    res.send({ title: '500: Internal Server Error', error: error });
});
// var dbUrl = 'mongodb://localhost/auto_check';
// mongoose.connect(dbUrl);
// mongoose.connection.on('open', function() {
//     app.listen(7000);
//     console.log("connection open");
// });
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;