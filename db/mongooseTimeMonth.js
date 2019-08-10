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
        type: Date,
        default: Date.now()
    },
    idUser: {
        type: String
    }
}, { collection: 'timeMonth' });
module.exports = mongoose.model('timeCheck', timeCheck);