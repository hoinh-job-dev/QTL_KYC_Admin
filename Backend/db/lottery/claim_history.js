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

modelClaimHistory= null;
db = global.lotterydb_connection;

db.on('connected', () => {console.log('Mongoose connected to lotteryDB model ClaimHistory')
    modelClaimHistory = db.model('ClaimHistory', ClaimHistory);
});
db.on('error', (err) => console.error('Connection error:', err));
db.on('disconnected', () => console.log('Mongoose disconnected'));


//module.exports = global.lotterydb_connection.model('ClaimHistory', ClaimHistory);
module.exports = modelClaimHistory;