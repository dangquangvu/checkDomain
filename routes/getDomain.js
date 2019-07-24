const ur = require('../public/db/mongoose')
const arrData = [];
var getDomain = async(arrData) => {
    const arrDataMongo = []
    let data = await ur.find({});
    data.map(item => {
        if (item.flag == true) {
            arrDataMongo.push(item);
        }
    })
    if (arrDataMongo.length > 5) {
        for (let i = 0; i < 5; i++) {
            let url = arrDataMongo[i].getUrl;
            let domain = arrDataMongo[i].protocolUrl;
            let id = arrDataMongo[i]._id;
            let timeLoad = 0;
            let date = 0;
            let object = { url, domain, id, timeLoad, date };
            arrData.push(object);
            try {
                let data = await ur.updateOne({ _id: id }, {
                    $set: {
                        flag: false
                    }
                })
            } catch (err) {
                return handleError(error)
            }
        }
        console.log('if')
    } else if (arrDataMongo.length <= 5) {
        await arrDataMongo.map(async item => {
            let url = item.getUrl;
            let domain = item.protocolUrl;
            let id = item._id;
            let timeLoad = 0;
            let date = 0;
            let object = { url, domain, id, timeLoad, date };
            await arrData.push(object);
        })
        try {
            let data = await ur.updateMany({}, {
                $set: {
                    flag: true
                }
            }, { multi: true })
        } catch (err) {
            return handleError(error)
        }
        console.log('else');
    }
    return arrData;
}

module.exports = getDomain;