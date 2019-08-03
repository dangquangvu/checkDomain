const mongoose = require('mongoose');

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
        type: Number,
        default: 0
    },
    timeLoad: {
        type: Array
    },
    idUser: {
        type: String
    }
}, { collection: 'timeMonth' });
module.exports = mongoose.model('timeCheck', timeCheck);