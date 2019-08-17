const cheerio = require('cheerio');
const axios = require('axios');
var request = require("request");
var https = require('https');

module.exports = {
    employeeCheckOnAjax: async(req, res) => {
        request.get('https://118.70.81.234:8443/api/thongketongdai.php', {
            rejectUnauthorized: false
        }, (err, res1, body) => {
            var fruits = [];
            if (err) {
                console.log(err);
            }
            if (body) {
                var $ = cheerio.load(body);
                $("tr:not(:nth-of-type(2)):not(:nth-of-type(1))").each(function() {
                    $(this).find("th[style]").each(function() {
                        let textval = $(this).text()
                        fruits.push(textval.trim())
                    })
                })
                res.send(fruits)
            }
        })
    },
    employeeOnlineView: function(req, res, next) {
        res.render('employeeCheck.ejs', { title: 'Employees Online', data: 100 });
    }
}