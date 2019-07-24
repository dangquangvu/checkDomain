var timeMonth = require('../public/db/mongooseTimeMonth')
var url = require('../public/db/mongoose')
var listDomain = [];
let updateMongo = async(listDomain) => {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    listDomain.map(async(item) => {
        try {
            let timeItem = new timeMonth();
            timeItem.getUrl = item.url;
            timeItem.timeLoad = item.timeLoad;
            timeItem.dateTime = item.date;
            let saveUser = await timeItem.save();
        } catch (err) {
            console.log('err' + err);
        }
        try {
            let data = await url.findOne({ _id: item.id });
            let arrTimeLoad = [];
            arrTimeLoad = data.timeLoad;
            if (data.timeLoad.length < 10) {
                console.log('else <10')
                arrTimeLoad.push(item.timeLoad);
                console.log(arrTimeLoad)
                try {
                    let update = await url.updateOne({ _id: item.id }, {
                        $set: {
                            timeLoad: arrTimeLoad
                        }
                    })
                } catch (error) {}
            } else {
                console.log('else >10')
                arrTimeLoad.shift();
                arrTimeLoad.push(item.timeLoad);
                console.log(arrTimeLoad)
                try {
                    let update = await url.updateOne({ _id: item.id }, {
                        $set: {
                            timeLoad: arrTimeLoad
                        }
                    })
                } catch (error) {}
            }
        } catch (error) {}
    })

}

module.exports = updateMongo;