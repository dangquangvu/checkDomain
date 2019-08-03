const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/auto_check", {
    useNewUrlParser: true
});
module.exports = {
    Url: require('./mongoose'),
    User: require('./User'),
    TimeCheck: require('./mongooseTimeMonth')
}