var {Web3} = require('web3');
var async = require('async');
var config = global.config;
var utils = require('./../lib/utils');

/**
 * Web3 config
 */
var transactionConfig = config.transactionConfig;
//var web3 = new Web3(new Web3.providers.HttpProvider(transactionConfig.httpProvider));
var web3 = new Web3(transactionConfig.httpProvider);
var primeAddress = transactionConfig.primeAccount.address;
var primePassphrase = transactionConfig.primeAccount.passphrase;

/**
 * Supporting functions
 */
function unlockAccount(address, pass, callback) {
    web3.personal.unlockAccount(address, pass, 1000, function (e, re) {
        if (re) {
            return callback(true);
        }
        else {
            return callback(false);
        }
    });
}

function callSC(interface, address, callback) {
    var availableSC = web3.eth.contract(interface).at(address);
    return callback(availableSC);
}


module.exports = {

    /**
     * Register KYC
     * @func registerKYC
     * @param {string} req - request
     * @param {string} res - in case of error, return error
     */
    registerKYC: function (req, res) {
        var ethaddress = req.body.ethaddress;

        if (!ethaddress) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }
        if (!web3.isAddress(ethaddress)) {
            return res.send({ state: 'error', error: global.property.get('error_116') });
        }

        unlockAccount(primeAddress, primePassphrase, function (re) {
            if (!re) {
                return res.send({ state: 'error', error: global.property.get('error_120') });
            }

            callSC(transactionConfig.kycABI, transactionConfig.kycContract, function (sc) {
                txid = sc.registerKYC(ethaddress, 1, { from: primeAddress });

                if (!txid) {
                    return res.send({ state: 'error', error: global.property.get('error_119') });
                }

                utils.saveTx(txid, 'register', ethaddress, function (re) {
                    if (!re) {
                        return res.send({ state: 'error', error: global.property.get('error_500') });
                    }

                    return res.send({ state: 'success', data: txid });
                });
            });
        });
    },

    /**
     * Change KYC
     * @func changeKYC
     * @param {string} req - request
     * @param {string} res - in case of error, return error
     */
    changeKYC: function (req, res) {
        var ethaddress = req.body.ethaddress;

        if (!ethaddress) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }
        if (!web3.isAddress(ethaddress)) {
            return res.send({ state: 'error', error: global.property.get('error_116') });
        }

        unlockAccount(primeAddress, primePassphrase, function (re) {
            if (!re) {
                return res.send({ state: 'error', error: global.property.get('error_120') });
            }

            callSC(transactionConfig.kycABI, transactionConfig.kycContract, function (sc) {
                txid = sc.changeKYCLevel(ethaddress, 3, { from: primeAddress });

                if (!txid) {
                    return res.send({ state: 'error', error: global.property.get('error_119') });
                }

                utils.saveTx(txid, 'upgrade', ethaddress, function (re) {
                    if (!re) {
                        return res.send({ state: 'error', error: global.property.get('error_500') });
                    }

                    return res.send({ state: 'success', data: txid });
                });
            });
        });
    },

    /**
     * Activate KYC
     * @func activateKYC
     * @param {string} req - request
     * @param {string} res - in case of error, return struct result
     */
    activateKYC: function (req, res) {
        var ethaddress = req.body.ethaddress;

        if (!ethaddress) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }
        if (!web3.isAddress(ethaddress)) {
            return res.send({ state: 'error', error: global.property.get('error_116') });
        }

        unlockAccount(primeAddress, primePassphrase, function (re) {
            if (!re) {
                return res.send({ state: 'error', error: global.property.get('error_120') });
            }

            callSC(transactionConfig.kycABI, transactionConfig.kycContract, function (sc) {
                re = sc.kycInfo(ethaddress, { from: primeAddress });
                level = Number(re[0]);
                deactive = re[1];

                if (level == 0 || !deactive) {
                    return res.send({ state: 'error', error: re });
                }

                txid = sc.toggleDeactivateKYC(ethaddress, { from: primeAddress });

                if (!txid) {
                    return res.send({ state: 'error', error: global.property.get('error_119') });
                }

                utils.saveTx(txid, 'activate kyc', ethaddress, function (re) {
                    if (!re) {
                        return res.send({ state: 'error', error: global.property.get('error_500') });
                    }

                    return res.send({ state: 'success', data: txid });
                });
            });
        });
    },

    /**
     * Deactivate KYC
     * @func deactivateKYC
     * @param {string} req - request
     * @param {string} res - in case of error, return struct result
     */
    deactivateKYC: function (req, res) {
        var ethaddress = req.body.ethaddress;

        if (!ethaddress) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }
        if (!web3.isAddress(ethaddress)) {
            return res.send({ state: 'error', error: global.property.get('error_116') });
        }

        unlockAccount(primeAddress, primePassphrase, function (re) {
            if (!re) {
                return res.send({ state: 'error', error: global.property.get('error_120') });
            }

            callSC(transactionConfig.kycABI, transactionConfig.kycContract, function (sc) {
                re = sc.kycInfo(ethaddress, { from: primeAddress });
                level = Number(re[0]);
                deactive = re[1];

                if (level == 0 || deactive) {
                    return res.send({ state: 'error', error: re });
                }

                txid = sc.toggleDeactivateKYC(ethaddress, { from: primeAddress });

                if (!txid) {
                    return res.send({ state: 'error', error: global.property.get('error_119') });
                }

                utils.saveTx(txid, 'deactivate kyc', ethaddress, function (re) {
                    if (!re) {
                        return res.send({ state: 'error', error: global.property.get('error_500') });
                    }

                    return res.send({ state: 'success', data: txid });
                });
            });
        });
    },

    /**
     * Payment
     * @func pay
     * @param {string} req - request
     * @param {string} res - in case of error, return struct result
     */
    pay: function (req, res) {
        var ethaddresses = req.body.ethaddresses;
        var amount = req.body.amount;

        if (!ethaddresses || ethaddresses.length <= 0 || !amount) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }

        async.eachSeries(ethaddresses, function (ethaddress, cb) {
            if (!web3.isAddress(ethaddress)) {
                return cb('error_116');
            }

            unlockAccount(primeAddress, primePassphrase, function (re) {
                if (!re) {
                    return cb('error_120');
                }

                callSC(transactionConfig.lotteryFundABI, transactionConfig.lotteryFundContract, function (sc) {
                    txid = sc.payoutPrize(ethaddress, amount, { from: primeAddress });

                    if (!txid) {
                        return cb('error_119');
                    }

                    utils.saveTx(txid, 'Pay_Out', ethaddress, function (re) {
                        if (!re) {
                            return cb('error_500');
                        }

                        return cb();
                    });
                });
            });
        }, function (e) {
            if (e) {
                return res.send({ state: 'error', error: global.property.get(e) });
            }

            return res.send({ state: 'success', data: '' });
        });
    }
}