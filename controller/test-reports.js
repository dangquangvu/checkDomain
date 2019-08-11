var { Url, User, TimeCheck } = require('../db/index')
const moment = require('moment')


let findDate = async() => {
    let date = '2019-08-10'
    console.log(typeof date)
    var startDate = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
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