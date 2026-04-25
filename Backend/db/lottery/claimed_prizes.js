var mongoose = require('mongoose');

var ClaimedPrizes = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    winner: {
        type: String,
        required: true
    },
    claim_history_id: {
        type: String,
        required: true
    },
    round: {
        type: Number,
        required: true
    },
    number_ticket: {
        type: Number,
        required: true
    },
    prize: {
        type: Number,
        required: true
    },
    reward: {
        type: Number,
        required: true
    },
    ticket_price: {
        type: Number,
        required: true
    },
    block_time: {
        type: Date,
        required: true
    },
    unique_hash: {
        type: String,
        required: true,
        unique: true
    },
    outOfDate: {
        type: Boolean,
        default: false,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = global.lotterydb_connection.model('ClaimedPrizes', ClaimedPrizes);