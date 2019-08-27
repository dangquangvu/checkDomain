const mongoose = require('mongoose');
const timestamps = require('timestamp');

var url = mongoose.Schema({
    getUrl: {
        type: String,
        trim: true,
        require: true
    },
    protocolUrl: {
        type: String,
        trim: true,
        default: 'https://'
    },
    title: {
        type: String,
        trim: true,
        default: "not found!"
    },
    idUser: {
        type: String
    },
    timeLoad: {
        type: Array
    },
    flag: {
        type: Boolean,
        default: true
    },
    hidden: {
        type: Boolean,
        default: false,
    }
}, { collection: 'Url' });
module.exports = mongoose.model('url', url);