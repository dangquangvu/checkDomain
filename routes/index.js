var express = require('express');
var router = express.Router();
var app = express();
const request = require('request');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var { Url, User, TimeCheck } = require('../db/index')
var { AddDomain, ClientSide } = require('../controller')
var LocalStrategy = require('passport-local').Strategy;

router.get('/reports', function(req, res) {
    res.render('time-report.ejs', { title: 'report' });
});
router.get('/', ClientSide.showIndex);
router.get('/see', isLoggedIn, ClientSide.see);
router.get('/del/:idDel/:urlDel', isLoggedIn, ClientSide.deleteDomain)
router.get('/refreshList', isLoggedIn, AddDomain.ajaxGetData);
router.get('/getDomain', AddDomain.getDomain);
router.post('/getDataDomain', AddDomain.getDataDomain);
router.post('/see', isLoggedIn, AddDomain.addDomain);

// Login logout Sign up 

router.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage'), title: 'Log In' });
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/see',
    failureRedirect: '/login',
    failureFlash: true
}));
router.get('/signup', function(req, res) {

    res.render('signup.ejs', { message: req.flash('signupMessage'), title: 'Sign Up' });
});
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/login');
});


function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login')
    }

}
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {

        User.findOne({ email: email }, function(err, user) {
            if (err)
                return done(err);
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }
            if (!user.validPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }
            return done(null, user);
        });

    }));

passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({ email: email }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'Email  đã tồn tại .'));
                } else {
                    var newUser = new User();
                    newUser.email = email;
                    newUser.password = newUser.generateHash(password);
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }

            });

        });

    }));

module.exports = router;