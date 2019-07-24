const mongoose = require('mongoose');
const timestamps = require('timestamp');
var bcrypt = require('bcrypt-nodejs');
mongoose.connect('mongodb://127.0.0.1:27017/auto_check', {
    useNewUrlParser: true,
    useCreateIndex: true
})
var User = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    }

}, { collection: 'profileUser' });
User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);