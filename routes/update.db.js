var { Url, User, TimeCheck } = require('../db/index')
const axios = require('axios');
var listDomain = [];
let updateMongo = async(listDomain) => {
    await listDomain.map(async(item) => {
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
            console.log(arrTimeLoad, item.url)
            if (data.timeLoad.length < 10) {
                console.log('else <10')
                arrTimeLoad.push(item.timeLoad);
                let checkWebDeath = async() => {
                    let count = 0;
                    for (let i = 0; i < arrTimeLoad.length(); i++) {
                        if (arr[i] == 0) {
                            count++;
                            if (count == 3) {
                                let urlData = item.url + ' Has a trouble!';
                                let object = {
                                    "msgtype": "text",
                                    "text": {
                                        "content": urlData
                                    }
                                }
                                axios.post('https://oapi.dingtalk.com/robot/send?access_token=f54b31959e65a16de90c41b3640cbc499824b45832ab57bed0249af360247b71', {...object })
                                    .then(data22 => {
                                        console.log(data22.data);
                                    }).catch(err => {
                                        console.log(err)
                                    });
                                break;
                            }
                        } else {
                            count = 0;
                        }
                    }
                }
                await checkWebDeath()
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
                //
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

// url: 'simsaigon.com.vn',
//   domain: 'https://simsaigon.com.vn',
//   date: 2019-08-13T10:25:26.351Z,
//   timeLoad: 2622,
//   id: '5d525c833c3be504c8c1e012',
//   iduser: '5d4bdc714f7d0f77e5a9492b'