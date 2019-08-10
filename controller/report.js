const moment = require('moment')
var { Url, User, TimeCheck } = require('../db/index')

module.exports = {
        reportTime: async(req, res) => {
            let startDate = req.body.startDate;
            console.log(startDate)
            let endDate = req.body.endDate;
            console.log(endDate)
            if (startDate) {
                let findDate = async() => {
                    var startDate = moment(startDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
                    console.log('xxx')
                    let data = await TimeCheck.find({
                        dateTime: {
                            $gt: startDate
                        }
                    });

                    console.log(data)

                    console.log('yyy')
                }
                findDate();
            }
            if (endDate) {
                let findDate = async() => {
                    var startDate = moment(endDate).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
                    TimeCheck.find({
                        dateTime: {
                            $gt: endDate
                                // $lt: endDate
                        }
                    }, function(err, data) {
                        if (err) {
                            return err
                        } else {
                            console.log(data)
                        }
                    });
                }
                findDate();
            }
            if (endDate && startDate) {
                let findDate = async() => {
                    var startDate = moment(endDate).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
                    TimeCheck.find({
                        dateTime: {
                            $gt: startDate,
                            $lt: endDate
                        }
                    }, function(err, data) {
                        if (err) {
                            return err
                        } else {
                            console.log(data)
                        }
                    });
                }
                findDate();
            }
        },
        showReports: function(req, res) {
            res.render('time-report.ejs', { title: 'report' });
        }
    }
    // let funcc = async() => {
    //     let a = "2019-08-10"
    //     let findDate = async() => {

//         const a = '2019-08-09'
//         var startDate = moment(a).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
//         //var endDate = moment(b).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00

//         //Find 
//         TimeCheck.find({
//             dateTime: {
//                 $gt: startDate
//                     // $lt: endDate
//             }
//         }, function(err, data) {
//             if (err) {
//                 return err
//             } else {
//                 console.log(data)
//             }
//         });
//     }
//     findDate();
// }
// funcc();