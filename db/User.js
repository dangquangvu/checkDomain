const mongoose = require('mongoose');
const timestamps = require('timestamp');
var bcrypt = require('bcrypt-nodejs');

var User = mongoose.Schema({
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