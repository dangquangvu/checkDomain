const moment = require('moment')
var { Url, User, TimeCheck } = require('../db/index')

// module.exports = {
//     reportTime: async(req, res) => {

//     }
// }
let funcc = async() => {
    let a = "2019-08-10"
    let findDate = async() => {

        const a = '2019-08-09'
        var startDate = moment(a).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
        //var endDate = moment(b).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.endTime = 2016-09-25 01:00:00

        //Find 
        TimeCheck.find({
            dateTime: {
                $gt: startDate
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
funcc();