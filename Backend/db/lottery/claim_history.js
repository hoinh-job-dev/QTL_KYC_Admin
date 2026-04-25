var mongoose = require('mongoose');

var ClaimHistory = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    winner: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 0, // 0: pending, 1: rejected, 2: paid
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = global.lotterydb_connection.model('ClaimHistory', ClaimHistory);