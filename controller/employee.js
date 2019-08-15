const cheerio = require('cheerio');
const axios = require('axios');
var request = require("request");
var https = require('https');

module.exports = {
    employeeCheckOnAjax: async(req, res) => {
        let url = "https://118.70.81.234:8443/api/thongketongdai.php"
        const fruits = [];
        let data = async() => {
            let arr = await axios.get("https://118.70.81.234:8443/api/thongketongdai.php", {

                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            });
            if (arr) {
                var $ = cheerio.load(arr.data);
                $("tr:not(:nth-of-type(2)):not(:nth-of-type(1))").each(function() {
                    $(this).find("th[style]").each(function() {
                        let textval = $(this).text()
                        fruits.push(textval.trim())
                    })
                })
                return fruits;
            }
        }
        let i = async() => {
            let arr1 = await data();
            console.log(arr1)
            res.send(arr1);
        }
        i();
    },
    employeeOnlineView: function(req, res, next) {
        res.render('employeeCheck.ejs', { title: 'Employees Online' });
    }
}