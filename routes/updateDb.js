const ur = require('../public/db/mongoose')
const arrData = [];
var getDomain = async(arrData) => {
    const arrDataMongo = []
    let count = 0;
    let data = await ur.find({});
    data.map(item => {
        console.log(item)
    })
}
getDomain()