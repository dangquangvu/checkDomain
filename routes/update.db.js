var { Url, User, TimeCheck } = require('../db/index')
var listDomain = [];
let updateMongo = async(listDomain) => {
    listDomain.map(async(item) => {
        try {
            let timeItem = new TimeCheck();
            timeItem.getUrl = item.url;
            timeItem.timeLoad = item.timeLoad;
            timeItem.dateTime = item.date;
            timeItem.idUser = item.iduser;
            let saveUser = await timeItem.save();
        } catch (err) {
            console.log('err' + err);
        }
        try {
            let data = await Url.findOne({ _id: item.id });
            let arrTimeLoad = [];
            arrTimeLoad = data.timeLoad;
            if (data.timeLoad.length < 10) {
                console.log('else <10')
                arrTimeLoad.push(item.timeLoad);
                console.log(arrTimeLoad)
                try {
                    let update = await Url.updateOne({ _id: item.id }, {
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
                    let update = await Url.updateOne({ _id: item.id }, {
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