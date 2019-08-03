var { Url } = require('../db/index')
arrData = [];
var getDomain = async(arrData) => {
        // const iduser = '5d380cabf99f7858fc33e9c4'
        //console.log('xxx')
        const arrDataMongo = []
            //{ $and: [{ flag: true }, { idUser: iduser }]
        let data = await Url.find({ flag: true }).limit(10);
        console.log(data.length, typeof data)
        let mapItem = await data.map(item => {
            arrDataMongo.push(item);
        })
        if (arrDataMongo.length > 5) {
            for (let i = 0; i < 5; i++) {
                //console.log('xxx')
                let url = arrDataMongo[i].getUrl;
                let domain = arrDataMongo[i].protocolUrl;
                let id = arrDataMongo[i]._id;
                let iduser = arrDataMongo[i].idUser;
                let timeLoad = 0;
                let date = 0;
                let object = { url, domain, date, timeLoad, id, iduser };
                arrData.push(object);
                try {
                    let data = await Url.updateOne({ _id: id }, {
                        $set: {
                            flag: false
                        }
                    })
                } catch (err) {

                }
            }
            console.log('if')
        } else if (arrDataMongo.length <= 5) {
            await arrDataMongo.map(async item => {
                console.log('yyy')
                let url = item.getUrl;
                let domain = item.protocolUrl;
                let id = item._id;
                let iduser = item.idUser;
                let timeLoad = 0;
                let date = 0;
                let object = { url, domain, date, timeLoad, id, iduser };
                //console.log(object, typeof arrData)
                await arrData.push(object);
            })
            try {
                let data = await Url.updateMany({}, {
                    $set: {
                        flag: true
                    }
                }, { multi: true })
            } catch (err) {

            }
            console.log('else');
        }
        return arrData;
    }
    //getDomain();
module.exports = getDomain;