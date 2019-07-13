var axios = require('axios');

const instance = axios.create();
instance.defaults.timeout = 3000;

let getTimeLambda = async() => {
        let arrReturn = []
        let dataListDomain = await instance.get('http://localhost:8888/getDomain')
        let listDomain = dataListDomain.data

        for (let i = 0; i < listDomain.length; i++) {
            try {
                //await console.log(listDomain[i].getUrl)
                let startTime = Date.now();
                const data = await instance.get(listDomain[i].getUrl)
                let time = Date.now() - startTime;
                listDomain[i].timeLoad = time;
                //console.log(listDomain[i])
            } catch (err) {
                //console.log(listDomain[i].getUrl)
            }
        }
        //return listDomain;
        listDomain.map(item => { console.log(item) })

        axios.post('http://localhost:8888/getDataDomain', { listDomain });
    }
    //getTimeLambda()
module.exports = getTimeLambda;
// let item =;
// //console.log(item)
// item.then(data => { console.log(data) }).catch(err => { console.log(err) })