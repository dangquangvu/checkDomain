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
                let date = moment(startDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
                console.log(date)
                let data = await TimeCheck.find({
                    dateTime: {
                        $gte: date
                    }
                });
                console.log(typeof data, data.length)
                let time = await TimeCheck.find({});
                console.log(time.length)
                if (data) {

                }
            }
            findDate();
        } else if (endDate) {
            let findDate = async() => {
                let date = moment(endDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
                let data = await TimeCheck.find({
                    dateTime: {
                        $gte: date
                    }
                });
                console.log(typeof data)
                let time = await TimeCheck.find({});
                console.log(time.length)
                if (data) {

                }
            }
            findDate();
        } else if (endDate && startDate) {
            let findDate = async() => {
                let sdate = moment(startDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
                let edate = moment(endDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
                let data = await TimeCheck.find({
                    dateTime: {
                        $gte: sdate,
                        $lte: edate
                    }
                })
                console.log(typeof data, data.length)
                let time = await TimeCheck.find({});
                console.log(time.length)
            }
            findDate();
        }
    },
    showReports: function(req, res) {
        res.render('time-report.ejs', { title: 'report' });
    }
}

// moment(endDate).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ");