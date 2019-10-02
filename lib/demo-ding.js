let data = async() => {
    const axios = require('axios')
    let dt = "vũ đẹp trai no.1 ";
    let object = {
        "msgtype": "text",
        "text": {
            "content": dt
        }
    }
    await axios.post('https://oapi.dingtalk.com/robot/send?access_token=da3bfd30996829aad8dfdbccdc208148b612f95b7ac3fe457661cbcfed3de037', {...object })
        .then(data22 => {
            console.log(data22.data);
        }).catch(err => {
            console.log(err)
        });
}
data();