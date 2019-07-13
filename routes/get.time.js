const request = require('request');
const ur = require('../public/db/mongoose')
const timer = function(value) {
    var startTime = Date.now();
    request(value, (req, res, body) => {
        var endTime = Date.now();
        var loadTime = (endTime - startTime) / 1000;
        return loadTime;
    })
}

var checkLists = function() {

}
module.exports.timer = timer;