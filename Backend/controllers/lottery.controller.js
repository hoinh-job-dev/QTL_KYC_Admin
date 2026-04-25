var config = global.config;
var async = require('async');
var crypto = require('./../lib/crypto');
var utils = require('./../lib/utils');

var ClaimedPrizes = require('./../db/lottery/claimed_prizes');
var ClaimHistory = require('./../db/lottery/claim_history');


module.exports = {

    /**
     * Get history
     * @func getHistory
     * @param {string} req - request
     * @param {string} res - in case of error, res return 404 error
     */
    getHistory: function (req, res) {
        ClaimHistory.find(function (er, re) {
            if (er || !re) {
                return res.send({ state: 'error', error: global.property.get('error_500') });
            }

            return res.send({ state: "success", data: re });
        });
    },

    /**
     * Get prizes data
     * @func getPrizes
     * @param {string} req - request
     * @param {string} res - in case of error, res return 404 error
     */
    getPrizes: function (req, res) {
        ClaimedPrizes.find(function (er, re) {
            if (er || !re) {
                return res.send({ state: 'error', error: global.property.get('error_500') });
            }

            return res.send({ state: "success", data: re });
        });
    },

    /**
     * Pay the winning user
     * @func payPrizes
     * @param {string} req - request
     * @param {string} res - in case of error, res return 404 error
     */
    payPrizes: function (req, res, next) {
        var userId = req.body.userId;
        var pay = req.body.pay;

        if (!userId || pay == null) {
            return res.send({ state: "error", error: global.property.get('error_106') });
        }

        if (pay == true) {
            if (!utils.logAction(req, 'pay prize', userId)) {
                return res.send({ state: 'error', error: global.property.get('error_107') });
            }

            var amount = 0;
            var ethaddresses = [];

            ClaimedPrizes.find({ userId: userId, isPaid: false }, function (er, prizes) {
                async.eachSeries(prizes, function (prize, cb) {

                    // Calculate amount to pay
                    if (prize.outOfDate == false) {
                        amount += prize.reward;
                    }

                    // Listing ethereums
                    if (prize.winner && !utils.isIn(prize.winner, ethaddresses)) {
                        ethaddresses.push(prize.winner);
                    }

                    ClaimedPrizes.findOneAndUpdate(
                        { _id: prize._id },
                        { $set: { isPaid: pay } },
                        { new: true },
                        function (er, re) {
                            if (er || !re) {
                                return cb('error_500');
                            }

                            return cb();
                        });
                }, function (e) {
                    if (e) {
                        return res.send({ state: 'error', error: global.property.get(e) });
                    }

                    req.body.amount = amount;
                    req.body.ethaddresses = ethaddresses;
                    return next();
                });
            });
        }
        else if (pay == false) {
            if (!utils.logAction(req, 'reject prize', userId)) {
                return res.send({ state: 'error', error: global.property.get('error_107') });
            }

            ClaimedPrizes.find({ userId: userId, isPaid: false }, function (er, prizes) {
                async.eachSeries(prizes, function (prize, cb) {
                    ClaimedPrizes.findOneAndRemove(
                        { _id: prize._id },
                        function (er, re) {
                            if (er || !re) {
                                return cb('error_500');
                            }

                            return cb();
                        });
                }, function (e) {
                    if (e) {
                        return res.send({ state: 'error', error: global.property.get(e) });
                    }

                    return res.send({ state: "success", data: '0x' });
                });
            });
        }
        else {
            return res.send({ state: "error", error: global.property.get('error_106') });
        }
    },

    /**
     * Log history
     * @func logHistory
     * @param {string} req - request
     * @param {string} res - in case of error, res return 404 error
     */
    logHistory: function (req, res, next) {
        var userId = req.body.userId;
        var pay = req.body.pay;

        if (!userId || pay == null) {
            return res.send({ state: "error", error: global.property.get('error_106') });
        }

        ClaimedPrizes.findOne({ userId: userId, isPaid: false }, function (er, re) {
            if (er || !re) {
                return res.send({ state: 'error', error: global.property.get('error_500') });
            }

            var status = 0;
            if (pay == false) status = 1;
            if (pay == true) status = 2;

            ClaimHistory.findOneAndUpdate(
                { _id: re.claim_history_id },
                { $set: { status: status } }, function (er, re) {
                    if (er || !re) {
                        return res.send({ state: 'error', error: global.property.get('error_500') });
                    }

                    return next();
                });
        });
    }

}