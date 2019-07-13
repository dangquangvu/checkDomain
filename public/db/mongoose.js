const mongoose = require('mongoose');
const timestamps = require('timestamp');
mongoose.connect('mongodb://127.0.0.1:27017/auto_check', {
    useNewUrlParser: true,
    useCreateIndex: true
})
var url = new mongoose.Schema({
    getUrl: {
        type: String,
        required: true,
        trim: true,
        unique: false
    },
    protocolUrl: {
        type: String,
        trim: true,
        default: 'https://'
    },
    title: {
        type: String,
        required: false,
        trim: true,
        default: "not found!"
    },
    timeLoad: {
        type: Array
    },
    flag: {
        type: Boolean,
        default: false
    }
}, { collection: 'Url' });
module.exports = mongoose.model('url', url);