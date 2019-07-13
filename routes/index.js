var express = require('express');
const ur = require('../public/db/mongoose')
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');
const assert = require('assert');
const request = require('request');
const jsdom = require('jsdom');
var parseData = require('../routes/get.title');
var getTimer = require('../routes/get.time');
var objectId = mongodb.ObjectID;
var getDomain = require('./getDomain');
const dbName = 'auto_check';
router.get('/', function(req, res, next) {
    res.redirect('/see');
});
router.post('/', async function(reqR, resR, next) {
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
                            console.log(title)
                            console.log(options)
                            console.log(u)
                            console.log(res1.statusCode)
                            urll.protocolUrl = options;
                            urll.title = title;
                            await urll.save();
                            resR.redirect('/see');
                        } else {
                            request.get('http://' + u, async(req2, res2, body2) => {
                                if (parseData(body2) != null && res2 != null) {
                                    let proUrl = 'http://' + u;
                                    console.log('yyyyyyyyyyyyyyy')
                                    title = await parseData(body2);
                                    console.log(title)
                                    console.log(res2.statusCode)
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
router.get('/see', function(req, res, next) {
    ur.find({}).then((dulieu) => {
        res.render('see', { title: 'Express', data: dulieu });
    }).catch((e) => {
        res.status(500).send()
    })
});
router.get('/del/:idDel', function(req, res, next) {
    var idDel = objectId(req.params.idDel);
    console.log(idDel)
    ur.deleteOne({ _id: idDel }, function(err) {
        if (err)
            console.log('The raw response from Mongo was ', err);
        res.redirect('/see')
    });
})
router.get('/refreshList', async function(req, res, next) {
    const arrTimeLoad = [];
    let data = await ur.find({});
    data.map(async item => {
        let geturl = item.getUrl;
        let time = [];
        let time2 = [];
        for (let i = item.timeLoad.length - 20; i < item.timeLoad.length; i = i + 2) {
            time2 = time.push(item.timeLoad[i]);
        }
        let object = { geturl, time }
            //console.log(object)
        await arrTimeLoad.push(object)
    })
    res.send(arrTimeLoad);
});
router.get('/getDomain', async function(req, res, next) {
    //let value = await ur.find({});
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
    console.log(typeof b);
    b.map(async item => {
        await ur.updateOne({ _id: item.id }, {
                $push: {
                    timeLoad: item.timeLoad
                }
            },
            function(err, raw) {
                if (err) return handleError(err);
                console.log('The raw response from Mongo was ', raw);
            })
    })
});
module.exports = router;