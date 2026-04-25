var mongoose = require('mongoose');
var config = global.config;


var AdminToken = new mongoose.Schema({
    value: {
        type: String,
        required: true,
        index: true
    },
    adminId: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    unique_key: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        expires: config.token.expriedTime,
        default: Date.now
    }
});


module.exports = global.authdb_connection.model('AdminToken', AdminToken);