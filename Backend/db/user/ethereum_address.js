var mongoose = require('mongoose');
var crypto = require('./../../lib/crypto');

var EthereumAddress = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    ETH_addr: {
        type: String,
        required: true,
        unique: true
    }
});

EthereumAddress.pre('save', function (next) {
    var ethereum_address = this;
    var er = new Error('Cannot encrypt data');

    crypto.SHA(ethereum_address.ETH_addr, function (re) {
        if (!re) return next(er);

        ethereum_address.ETH_addr = re;
        return next();
    });
});

module.exports = global.userdb_connection.model('EthereumAddress', EthereumAddress);