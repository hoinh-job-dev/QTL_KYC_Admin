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

modelAdminToken= null;
db = global.authdb_connection;

db.on('connected', () => {console.log('Mongoose connected to authDB model AdminToken')
    modelAdminToken = db.model('AdminToken', AdminToken);
});
db.on('error', (err) => console.error('Connection error:', err));
db.on('disconnected', () => console.log('Mongoose disconnected'));

//module.exports = global.authdb_connection.model('AdminToken', AdminToken);
module.exports = modelAdminToken;