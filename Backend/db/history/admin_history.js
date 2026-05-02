var mongoose = require('mongoose');


var AdminHistory = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    memo: {
        type: String
    },
    createAt: {
        type: Date,
        required: true
    },
});

modelAdminHistory= null;
db = global.historydb_connection;

db.on('connected', () => {console.log('Mongoose connected to historyDB model AdminHistory')
    modelAdminHistory = db.model('AdminHistory', AdminHistory);
});
db.on('error', (err) => console.error('Connection error:', err));
db.on('disconnected', () => console.log('Mongoose disconnected'));


//module.exports = global.historydb_connection.model('AdminHistory', AdminHistory);
module.exports = modelAdminHistory;
