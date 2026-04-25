var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var config = global.config;
var crypto = require('./../../lib/crypto');

var BlackUser = require('./black_user');

const ERROR = new Error('Error');
const PASSWORD_ERROR = new Error('Must be different from current password');
const CRYPTO_ERROR = new Error('Cannot encrypt data');
const DEACTIVE_ERROR = new Error('User is deactive');


var User = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    email_hash: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    }
});


/**
 * ***********************************************
 * Define middleware
 * ***********************************************
 */

User.post('init', function (user, next) {
    BlackUser.findOne({ userId: user._id }, function (er, re) {
        if (er) return next(er);
        if (re) return next(DEACTIVE_ERROR);
        var _email = null;
        if (user.email) _email = crypto.AESdecrypt(user.email);
        if (_email) user.email = _email;
        if (_email === false) return next(CRYPTO_ERROR);
        return next();
    });
});

User.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next(ERROR);
    bcrypt.genSalt(config.SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            var _email = null;
            var original_email = user.email;
            if (original_email) _email = crypto.AESencrypt(original_email);
            if (_email) user.email = _email;
            if (_email === false) return next(CRYPTO_ERROR);
            crypto.SHA(original_email, function (re) {
                if (!re) return next(CRYPTO_ERROR);
                user.email_hash = re;
                return next();
            });
        });
    });
});


/**
 * ***********************************************
 * Define methods of document
 * ***********************************************
 */

User.methods.verifyPassword = function (password, next) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return next(err);
        next(null, isMatch);
    });
};

User.methods.updatePassword = function (password, next) {
    var userId = this._id;
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return next(err, null);
        if (isMatch) return next(PASSWORD_ERROR, null);
        bcrypt.genSalt(config.SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err, null);
            bcrypt.hash(password, salt, null, function (err, hash) {
                if (err) return next(err, null);
                global.userdb_connection.model('User', User).findOneAndUpdate(
                    { _id: userId },
                    { $set: { password: hash } },
                    { new: true }, function (er, re) {
                        if (er) return next(er, null);
                        return next(null, re);
                    });
            });
        });
    });
}


/**
 * ***********************************************
 * Define statics function
 * ***********************************************
 */

User.statics.findOneByEmail = function (email, callback) {
    if (typeof callback !== 'function') throw new Error('Callback is not a function.');
    if (typeof email === 'string') {
        var self = this;
        crypto.SHA(email, function (email_hash) {
            if (!email_hash) return callback(ERROR, null);
            self.findOne({ email_hash: email_hash }, function (er, re) {
                if (er) return callback(er, null);
                return callback(null, re);
            });
        });
    }
    else return callback(ERROR, null);
}

module.exports = global.userdb_connection.model('User', User);