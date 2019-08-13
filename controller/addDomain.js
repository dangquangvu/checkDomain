const request = require('request');
const mongodb = require('mongodb');
var { Url, User, TimeCheck } = require('../db/index')
var updateMongo = require('../routes/update.db')
var getDomain = require('../routes/getDomain');
var parseData = require('../routes/get.title');
var objectId = mongodb.ObjectID;

module.exports = {
    addDomain: async(reqR, resR, next) => {
        let iduser = '5d4bdc714f7d0f77e5a9492b';
        console.log(iduser)
        let u = reqR.body.ura;
        if (u) {
            let checked = async() => {
                let data = await Url.find({ $and: [{ getUrl: u }, { idUser: iduser }] })
                console.log(data.length)
                if (data.length > 0) {
                    console.log("Url already available, please try again!", u, data.getUrl);
                    resR.redirect('/see');
                }
                if (data.length == 0) {
                    console.log('yyy')
                    let urll = new Url();
                    urll.getUrl = u;
                    let options = 'https://' + u;
                    request.get({ options, time: true, timeout: 3000 }, async(reqG, res) => {
                        request.get(options, async(req, res1, body) => {
                            let title;
                            if (parseData(body) != null && res1.statusCode != null && res1 != null) {
                                title = await parseData(body);
                                urll.protocolUrl = options;
                                urll.title = title;
                                urll.idUser = iduser;
                                await urll.save();
                                resR.redirect('/see');
                            } else {
                                request.get('http://' + u, async(req2, res2, body2) => {
                                    if (parseData(body2) != null && res2 != null) {
                                        let proUrl = 'http://' + u;
                                        title = await parseData(body2);
                                        urll.protocolUrl = proUrl;
                                        urll.idUser = iduser;
                                        urll.title = title;
                                        await urll.save();
                                        resR.redirect('/see');
                                    } else {
                                        let proUrl1 = 'http://' + u;
                                        urll.protocolUrl = proUrl1;
                                        urll.idUser = iduser;
                                        await urll.save();
                                        resR.redirect('/see');
                                    }
                                })
                            }
                        })
                    })
                }
            }
            try {
                await checked();
            } catch (error) {
                console.log('xxx')
            }
        } else {
            console.log('not lenth')
            resR.redirect('/see')
        }
    },
    ajaxGetData: async function(req, res, next) {
        let iduser = '5d4bdc714f7d0f77e5a9492b';
        const arrTimeLoad = [];
        let data = await Url.find({ idUser: iduser });
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
    },
    getDomain: async function(req, res, next) {
        const arrDomain = []
        let data = []
        data = await getDomain(arrDomain);
        res.send(data)
    },
    getDataDomain: async function(req, res, next) {
        let b = req.body.listDomain;
        updateMongo(b);
        res.end();
    }

}