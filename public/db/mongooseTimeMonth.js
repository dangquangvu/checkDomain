const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/auto_check', {
    useNewUrlParser: true,
    useCreateIndex: true
})
var timeMonth = new mongoose.Schema({
    getUrl: {
        type: String,
        required: true,
        trim: true,
        unique: false
    },
    timeLoad: {
        type: Number
    },
    dateTime: {
        type: Number,
        default: 0
    }
}, { collection: 'timeMonth' });
module.exports = mongoose.model('timeMonth', timeMonth);