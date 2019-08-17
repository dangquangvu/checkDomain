const mongoose = require('mongoose');
const moment = require('moment');
var timeCheck = new mongoose.Schema({
    getUrl: {
        type: String,
        required: true,
        trim: true
    },
    timeLoad: {
        type: Number
    },
    dateTime: {
        type: Date,
        default: moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ")
    },
    idUser: {
        type: String
    },
    idUrl: {
        type: String
    }
}, { collection: 'timeMonth' });
module.exports = mongoose.model('timeCheck', timeCheck);