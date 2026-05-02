var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var config = global.config;


var Admin = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

Admin.pre('save', function (callback) {
    var admin = this;
    if (!admin.isModified('password')) return callback();
    bcrypt.genSalt(config.SALT_WORK_FACTOR, function (err, salt) {
        if (err) return callback(err);
        bcrypt.hash(admin.password, salt, null, function (err, hash) {
            if (err) return callback(err);
            admin.password = hash;
            callback();
        });
    });
});

Admin.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

modelAdmin= null;
db = global.admin_connection;

db.on('connected', () => {console.log('Mongoose connected to DB Admin')
    modelAdmin = db.model('Admin', Admin);
});
db.on('error', (err) => console.error('Connection error:', err));
db.on('disconnected', () => console.log('Mongoose disconnected'));

//module.exports = global.admin_connection.model('Admin', Admin);
module.exports = modelAdmin;