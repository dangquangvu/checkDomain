var express = require('express');
const ur = require('../public/db/mongoose')
const timeStamp = require('../public/db/mongooseTimeMonth')
var router = express.Router();
var app = express();
const mongodb = require('mongodb');
const request = require('request');
var parseData = require('../routes/get.title');
var objectId = mongodb.ObjectID;
var getUrlMongo = mongodb.getUrl;
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var router = express.Router();
var session = require('express-session');
var getDomain = require('./getDomain');
var updateMongo = require('./update.db')
var express = express()
var User = require('../public/db/User');
//module.exports = function(app, passport, router) {
var LocalStrategy = require('passport-local').Strategy;

//router.get('*', (req, res) => res.send('Page Not found 404'));
router.get('/', function(req, res, next) {
    res.redirect('/login')
});
router.post('/see', isLoggedIn, async function(reqR, resR, next) {
    let u = reqR.body.ura;
    let checked = async() => {
        await ur.findOne({ getUrl: u }, (err, body) => {
            if (err) console.log(err);
            if (body) {
                console.log("Url already available, please try again!");
                resR.redirect('/see');
            } else {
                let urll = new ur();
                urll.getUrl = u;
                let options = 'https://' + u;
                request.get({ options, time: true, timeout: 3000 }, async(reqG, res) => {
                    request.get(options, async(req, res1, body) => {
                        let title;
                        if (parseData(body) != null && res1.statusCode != null && res1 != null) {
                            title = await parseData(body);
                            urll.protocolUrl = options;
                            urll.title = title;
                            await urll.save();
                            resR.redirect('/see');
                        } else {
                            request.get('http://' + u, async(req2, res2, body2) => {
                                if (parseData(body2) != null && res2 != null) {
                                    let proUrl = 'http://' + u;
                                    title = await parseData(body2);
                                    urll.protocolUrl = proUrl;
                                    urll.title = title;
                                    await urll.save();
                                    resR.redirect('/see');
                                } else {
                                    let proUrl1 = 'http://' + u;
                                    urll.protocolUrl = proUrl1;
                                    await urll.save();
                                    resR.redirect('/see');
                                }
                            })
                        }
                    })
                })
            }
        })
    }
    checked();
});
router.get('/see', isLoggedIn, function(req, res, next) {
    ur.find({}).then((dulieu) => {
        res.render('see', { title: 'Express', data: dulieu });
    }).catch((e) => {
        res.status(500).send()
    })
});
router.get('/del/:idDel/:urlDel', isLoggedIn, async function(req, res, next) {
    let idDel = objectId(req.params.idDel);
    let urlDel = req.params.urlDel;
    console.log(idDel)
    console.log(urlDel, 'xxxxxxxxxxxxxxxx')
    try {
        let deleteUr = await ur.deleteOne({ _id: idDel });
        console.log('yyyyyyyyyyyy')
    } catch (error) {
        console.log(error)
    }

    try {
        let deletetime = await timeStamp.deleteMany({ getUrl: urlDel }, { multi: true });
        console.log('zzzzzzzzzzzz')
    } catch (error) {
        console.log(error)
    }
    res.redirect('/see');
})

// get domain , ajax ,lambda

router.get('/refreshList', async function(req, res, next) {
    const arrTimeLoad = [];
    let data = await ur.find({});
    data.map(async item => {
        let geturl = item.getUrl;
        let time = [];
        let time2 = [];
        for (let i = 0; i < item.timeLoad.length; i++) {
            time2 = time.push(item.timeLoad[i]);
        }
        let object = { geturl, time }
        await arrTimeLoad.push(object)
    })
    res.send(arrTimeLoad);
});
router.get('/getDomain', isLoggedIn, async function(req, res, next) {
    const arrDomain = []
    let data = []
    data = await getDomain(arrDomain);
    data.map(item => {
        console.log(item);
    })
    res.send(data)
});

router.post('/getDataDomain', async function(req, res, next) {
    let b = req.body.listDomain;
    updateMongo(b);
    res.end();
});

// Login logout Sign up 

router.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/see',
    failureRedirect: '/login',
    failureFlash: true
}));
router.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) {
        console.log(req.session)
        return next();
    }
    //req.session.destroy();
    console.log(req.session)
    res.redirect('/login');

}

function checkSession(req, res, next) {
    if (req.session.passport == null) {
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