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


module.exports = global.historydb_connection.model('AdminHistory', AdminHistory);
