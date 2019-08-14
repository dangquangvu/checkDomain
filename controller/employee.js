const cheerio = require('cheerio');
const axios = require('axios');

module.exports = {
    employeeCheckOn: async(req, res) => {
        // let header = {
        //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
        //     'Content-Type': 'text/html; charset=UTF-8'
        // }
        // let options = {
        //     url: 'https://118.70.81.234:8443/api/thongketongdai.php',
        //     method: 'GET',
        //     headers: header
        // }
        // let data = await axios(options);
        // if (data) {
        //     let $ = cheerio.load(data);
        //     console.log($('th').html())
        // }
        res.render('employeeCheck.ejs', {
            title: 'employee'
        })

    }
}