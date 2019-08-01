const mongoose = require('mongoose');

var timeMonth = new mongoose.Schema({
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
    }
}, { collection: 'timeMonth' });
module.exports = mongoose.model('timeMonth', timeMonth);