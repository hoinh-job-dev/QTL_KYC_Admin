var mongoose = require('mongoose');
var crypto = require('./../../lib/crypto');

var non_KYC = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    ETH_addr: {
        type: [String]
    },
    avatar: {
        type: String
    }
});

non_KYC.pre('save', function (next) {
    var non_kyc = this;
    var er = new Error('Cannot encrypt data');

    var _ethaddress = [];
    var ethaddress = non_kyc.ETH_addr;

    if (ethaddress && ethaddress.length > 0) {
        for (var i = 0; i < ethaddress.length; i++) {
            _ethaddress.push(crypto.AESencrypt(ethaddress[i]));
        }
    }

    if (_ethaddress.length <= 0 || _ethaddress.length != ethaddress.length) return next(er);

    non_kyc.ETH_addr = _ethaddress;
    return next();
});

non_KYC.post('init', function (non_kyc, next) {
    var er = new Error('Cannot decrypt data');

    var _ethaddress = [];
    var ethaddress = non_kyc.ETH_addr;

    if (ethaddress && ethaddress.length > 0) {
        for (var i = 0; i < ethaddress.length; i++) {
            _ethaddress.push(crypto.AESdecrypt(ethaddress[i]));
        }
    }

    if (_ethaddress.length <= 0 || _ethaddress.length != ethaddress.length) return next(er);

    non_kyc.ETH_addr = _ethaddress;
    return next();
});

modelnon_KYC= null;
db = global.userdb_connection;

db.on('connected', () => {console.log('Mongoose connected to userDB model non_KYC')
    modelnon_KYC = db.model('non_KYC', non_KYC);
});
db.on('error', (err) => console.error('Connection error:', err));
db.on('disconnected', () => console.log('Mongoose disconnected'));

//module.exports = global.userdb_connection.model('non_KYC', non_KYC);
module.exports = modelnon_KYC;