const ur = require('../public/db/mongoose')
const arrData = [];
var getDomain = async(arrData) => {
    const arrDataMongo = []
    let count = 0;
    let data = await ur.find({});
    await data.map(async item => {
        if (item.flag == true) {
            arrDataMongo.push(item);
        }
    })
    if (arrDataMongo.length > 10) {
        for (let i = 0; i < 10; i++) {
            let getUrl = arrDataMongo[i].protocolUrl;
            let id = arrDataMongo[i]._id;
            let timeLoad = 0;
            let object = { getUrl, id, timeLoad };
            await arrData.push(object);
            await ur.updateOne({ _id: id }, {
                    $set: {
                        flag: false
                    }
                },
                function(err, raw) {
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
                })
        }
        return arrData;
    } else if (arrDataMongo.length <= 10) {
        await arrDataMongo.map(async item => {
            let getUrl = item.protocolUrl;
            let id = item._id;
            let timeLoad = 0;
            let object = { getUrl, id, timeLoad };
            await arrData.push(object);
            await ur.updateOne({ _id: id }, {
                    $set: {
                        flag: false
                    }
                },
                function(err, raw) {
                    if (err) return handleError(err);
                    console.log('The raw response from Mongo was ', raw);
                })
        })
        await ur.updateMany({}, {
                $set: {
                    flag: true
                }
            },
            function(err, raw) {
                if (err) return handleError(err);
                console.log('The raw response from Mongo was ', raw);
            })
        return arrData;
    }
}

module.exports = getDomain;