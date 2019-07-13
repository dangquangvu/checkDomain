var request = require('request');
let url = require('../public/db/mongoose');
let getUrlDB = async() => {
    const arrUrl = [];
    var arrRequest = [];
    const data = await url.find({})
    data.map((item) => {
        var getUrl = item.protocolUrl;
        var objectId = item._id;
        var timeLoad;
        var objectData = { getUrl, objectId, timeLoad };
        arrRequest.push(objectData);
    })
    await arrRequest.map((item) => {
        arrUrl.push(item.getUrl);
    })
    const arrCheckListRequest = async() => {
        arrUrl.map(item => {
            let start_time = new Date().getTime();
            request.get({ url: item, time: true, timeout: 3000 }, async(err, response, req) => {
                let time = new Date().getTime() - start_time;
                console.log(time, item)
                if (err == null) {
                    for (let i = 0; i < arrRequest.length; i++) {
                        if (arrRequest[i].getUrl == item) {
                            arrRequest[i].timeLoad = time;
                            await url.updateOne({ _id: arrRequest[i].objectId }, {
                                    $push: {
                                        timeLoad: [arrRequest[i].timeLoad]
                                    }
                                },
                                function(err, raw) {
                                    if (err) return handleError(err);
                                    console.log('The raw response from Mongo was ', raw);
                                })
                        }
                    }

                } else {
                    arrRequest.map(async item3 => {
                        if (item3.getUrl == item) {
                            item3.timeLoad = 0;
                            await url.updateOne({ _id: item3.objectId, title: item3.titleUrl }, {
                                    $push: {
                                        timeLoad: item3.timeLoad
                                    }
                                },
                                function(err, raw) {
                                    if (err) return handleError(err);
                                    console.log('The raw response from Mongo was ', raw);
                                })
                        }
                    })
                }

            })
        })

    }
    arrCheckListRequest()

}

module.exports.getData = getUrlDB;