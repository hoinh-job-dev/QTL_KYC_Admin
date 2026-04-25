var config = global.config;
var Web3 = require('web3');
var crypto = require('./../lib/crypto');

var User = require('./../db/user/user');
var KYC = require('./../db/kyc/KYC');
var EthereumAddress = require('./../db/user/ethereum_address');

var transactionConfig = config.transactionConfig;
var web3 = new Web3(new Web3.providers.HttpProvider(transactionConfig.httpProvider));


function isNotSmartContract(ethaddr, callback) {
    if (!web3.isAddress(ethaddr)) return callback(false);
    var code = web3.eth.getCode(ethaddr, function (er, code) {
        if (er || !code) return callback(false);
        if (code.length > 2) return callback(false);
        return callback(true);
    });
}

module.exports = {

    /**
     * Verify ethereum address which is only one and valid ethereum address (not smart contract)
     * @func isLegalETHAddr
     * @param {string} req - request
     * @param {string} res - in case of error, res return 404 error
     */
    isLegalETHAddr: function (req, res, next) {
        ethaddress = req.body.ethaddress;

        if (!ethaddress) {
            return res.send({ state: 'error', error: global.property.get('error_113') });
        }

        if (!web3.isAddress(ethaddress)) {
            return res.send({ state: 'error', error: global.property.get('error_116') });
        }

        isNotSmartContract(ethaddress, function (re) {
            if (!re) {
                return res.send({ state: 'error', error: global.property.get('error_116') });
            }

            crypto.SHA(ethaddress, function (hash_ethaddress) {
                if (!hash_ethaddress) {
                    return res.send({ state: 'error', error: global.property.get('error_122') });
                }

                EthereumAddress.findOne({ ETH_addr: hash_ethaddress }, function (e, isExisted) {
                    if (e) {
                        return res.send({ state: 'error', error: global.property.get('error_500') });
                    }
                    if (isExisted) {
                        return res.send({ state: 'error', error: global.property.get('error_129') });
                    }

                    return next();
                });
            });
        });
    }
}