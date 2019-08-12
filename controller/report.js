const moment = require('moment')
var { Url, User, TimeCheck } = require('../db/index')
const axios = require('axios');
module.exports = {
    reportTime: async(req, res) => {
        let startDate = req.body.startDate;
        console.log(startDate)
        let endDate = req.body.endDate;
        console.log(endDate)
        let urlUser = req.body.selectUrl;
        let iduser = req.session.passport.user;
        const arrData = [];
        if (startDate) {
            let findDate = async() => {
                let date = moment(startDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
                console.log(date)
                let data = await TimeCheck.find({
                    idUser: iduser,
                    getUrl: urlUser,
                    dateTime: {
                        $gte: date
                    }
                });
                if (data) {
                    await data.map(async item => {
                        let datetime = item.dateTime;
                        let utcDate = moment(datetime).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ");
                        var myDate = new Date(utcDate);
                        var result = myDate.getTime();
                        let resultDate = result;
                        let timeload = item.timeLoad;
                        let objectdata = [resultDate, timeload]
                        arrData.push(objectdata);
                    })
                    res.json(arrData)

                } else {
                    console.log('err-get-reports')
                }
            }
            await findDate();
        } else if (endDate) {
            let findDate = async() => {
                let date = moment(endDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
                let data = await TimeCheck.find({
                    idUser: iduser,
                    getUrl: urlUser,
                    dateTime: {
                        $gte: date
                    }
                });
                if (data) {
                    await data.map(async item => {
                        let datetime = item.dateTime;
                        let utcDate = moment(datetime).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ");
                        var myDate = new Date(utcDate);
                        var result = myDate.getTime();
                        let resultDate = result;
                        let timeload = item.timeLoad;
                        let objectdata = [resultDate, timeload]
                        arrData.push(objectdata);
                    })
                    res.json(arrData)

                } else {
                    console.log('err-get-reports')
                }
            }
            await findDate();
        } else if (endDate && startDate) {
            let findDate = async() => {
                let sdate = moment(startDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
                let edate = moment(endDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
                let data = await TimeCheck.find({
                    dateTime: {
                        idUser: iduser,
                        getUrl: urlUser,
                        $gte: sdate,
                        $lte: edate
                    }
                })
                if (data) {
                    await data.map(async item => {
                            let datetime = item.dateTime;
                            let utcDate = moment(datetime).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ");
                            var myDate = new Date(utcDate);
                            var result = myDate.getTime();
                            let resultDate = result;
                            let timeload = item.timeLoad;
                            let objectdata = [resultDate, timeload]
                            arrData.push(objectdata);
                        })
                        // .map(item => {
                        //     console.log(item);
                        // })
                    res.json(arrData)

                } else {
                    console.log('err-get-reports')
                }
            }
            await findDate();
        }
    },
    showReports: async function(req, res) {
        let iduser = req.session.passport.user;
        const arrDataUrlReporst = [];
        let data_iduser_url = async() => {
            try {
                let data = await Url.find({ idUser: iduser })
                if (data) {
                    data.map(item => {
                        arrDataUrlReporst.push(item.getUrl);
                    })
                }
                return arrDataUrlReporst;
            } catch (error) {
                console.log('err-get-reports')
            }
        }
        let dataHanlerUrlReports = await data_iduser_url();
        res.render('time-report.ejs', { title: 'report', data: dataHanlerUrlReports });
    },
    dataReports: async(req, res, next) => {
        let b = req.body.arrData;
        res.json(b)
    }
}

// moment(endDate).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ");