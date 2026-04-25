var mongoose = require('mongoose');

var Tx = mongoose.Schema({
    txId: {
        type: String,
        required: true
    },
    operation: {
        type: String,
        required: true
    },
    objectChanged: {
        type : String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = global.historydb_connection.model('Tx', Tx);