var crypto = require('./../lib/crypto');
var multer = require('multer');
var path = require('path');
var utils = require('./../lib/utils');
var config = global.config;

var User = require('./../db/user/user');
var KYC = require('./../db/kyc/KYC');
var non_KYC = require('./../db/user/non_KYC');
var BlackUser = require('./../db/user/black_user');
var EthereumAddress = require('./../db/user/ethereum_address');


module.exports = {

    /**
     * Process user registration
     * @func signup
     * @param {string} req - request
     * @param {string} res - in case of error, res return error
     */
    signup: function (req, res, next) {
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;

        if (!email || !username || !password) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }

        User.findOne({ username: username }, function (er, re) {
            if (er) {
                return res.send({ state: 'error', error: global.property.get('error_500') });
            }
            if (re) {
                return res.send({ state: 'error', error: global.property.get('error_100') });
            }

            User.findOneByEmail(email, function (er, user) {
                if (er) {
                    return res.send({ state: 'error', error: global.property.get('error_500') });
                }
                if (user) {
                    return res.send({ state: 'error', error: global.property.get('error_100') });
                }

                var user = new User({
                    email: email,
                    username: username,
                    password: password
                });

                user.save(function (er, re) {
                    if (er) {
                        return res.send({ state: 'error', error: global.property.get('error_500') });
                    }
                    if (!utils.logAction(req, 'signup', re._id)) {
                        return res.send({ state: 'error', error: global.property.get('error_107') });
                    }

                    var userId = re._id;
                    req.body.userId = userId;

                    return next();
                });
            });
        });
    },

    /**
     * Save KYC Level 1
     * @func saveKYC
     * @param {string} req - request 
     * @param {string} res - in case of error, res return error
     * @param {string} next - if there is no error, keep going to next function
     */
    saveKYC: function (req, res, next) {
        if (
            !req.body.userId ||
            !req.body.email ||
            !req.body.date_of_birth ||
            !req.body.firstname ||
            !req.body.lastname ||
            !req.body.read_only.toString() ||
            !req.body.street1 ||
            !req.body.state ||
            !req.body.city ||
            !req.body.postal_code ||
            !req.body.country
        ) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }

        var kyc = new KYC();
        kyc.userId = req.body.userId;
        kyc.email = req.body.email;
        kyc.date_of_birth = req.body.date_of_birth;
        kyc.firstname = req.body.firstname;
        kyc.lastname = req.body.lastname;
        kyc.read_only = req.body.read_only;
        kyc.street1 = req.body.street1;
        if (req.body.street2) kyc.street2 = req.body.street2;
        kyc.state = req.body.state;
        kyc.city = req.body.city;
        kyc.postal_code = req.body.postal_code;
        kyc.country = req.body.country;

        var concat = kyc.firstname + kyc.date_of_birth + kyc.street1 + kyc.city + kyc.country;
        concat = concat.toLowerCase();

        crypto.SHA(concat, function (hashMes) {
            kyc.hash_need_for_verification = hashMes;
            KYC.findOne({ $or: [{ hash_need_for_verification: hashMes }, { userId: kyc.userId }] }, function (err, isExisted) {
                if (err) {
                    return res.send({ state: 'error', error: global.property.get('error_500') });
                }
                if (isExisted) {
                    return res.send({ state: 'error', error: global.property.get('error_100') });
                }

                kyc.save(function (er) {
                    if (er) {
                        return res.send({ state: 'error', error: global.property.get('error_500') });
                    }
                    if (!utils.logAction(req, 'save KYC', kyc.userId)) {
                        return res.send({ state: 'error', error: global.property.get('error_107') });
                    }

                    return next();
                });
            });
        });
    },

    /**
     * Save non-KYC
     * @func saveNonKYC
     * @param {string} req - request 
     * @param {string} res - in case of error, res return error
     * @param {string} next - if there is no error, keep going to next function
     */
    saveNonKYC: function (req, res, next) {
        var userId = req.body.userId;
        var ethaddress = req.body.ethaddress;

        if (!userId) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }

        var non_kyc = new non_KYC();
        non_kyc.userId = userId;
        if (ethaddress) non_kyc.ETH_addr = [ethaddress];
        else non_kyc.ETH_addr = [];

        non_kyc.save(function (err) {
            if (err) {
                return res.send({ state: 'error', error: global.property.get('error_500') });
            }

            var ethereum_address = new EthereumAddress({
                userId: userId,
                ETH_addr: ethaddress
            });

            ethereum_address.save(function (er) {
                if (er) {
                    return res.send({ state: 'error', error: global.property.get('error_500') });
                }
                if (!utils.logAction(req, 'save non KYC', non_kyc.userId)) {
                    return res.send({ state: 'error', error: global.property.get('error_107') });
                }

                return next();
            });
        });
    },

    /**
     * Verify user
     * @func verifyUser
     * @param {string} req - request 
     * @param {string} res - in case of error, res error message
     */
    verifyUser: function (req, res, next) {
        var userId = req.body.userId;
        var verified = req.body.verified;

        if (!userId) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }

        KYC.findOne({ userId: userId }, function (e, kyc) {
            if (e) {
                return res.send({ state: 'error', error: global.property.get('error_500') });
            }
            if (!kyc) {
                return res.send({ state: 'error', error: global.property.get('error_114') });
            }

            var level3_is_verified = !verified ? false : true;

            kyc.update({ $set: { level3_is_verified: level3_is_verified } }, function (er, re) {
                if (er) {
                    return res.send({ state: 'error', error: global.property.get('error_500') });
                }
                if (!utils.logAction(req, 'verify', userId + " - " + verified)) {
                    return res.send({ state: 'error', error: global.property.get('error_107') });
                }
                if (!level3_is_verified) {
                    return res.send({ state: 'success', data: 'Reject user' });
                }

                non_KYC.findOne({ userId: userId }, function (er, nonkyc) {
                    if (er) {
                        return res.send({ state: 'error', error: global.property.get('error_500') });
                    }
                    if (!nonkyc) {
                        return res.send({ state: 'error', error: global.property.get('error_114') });
                    }

                    req.body.ethaddress = nonkyc.ETH_addr[0];

                    return next();
                });
            });
        });
    },

    /**
     * Modify KYC info
     * @func modifyKYC
     * @param {string} req - request
     * @param {string} res - in case of error, res return 404 error
     */
    modifyKYC: function (req, res) {
        var userId = req.body.userId;
        var datajson = req.body.datajson;

        if (!userId || !datajson) {
            return res.send({ state: "error", error: global.property.get('error_106') });
        }

        var date_of_birth = req.body.datajson.date_of_birth;
        var firstname = req.body.datajson.firstname;
        var lastname = req.body.datajson.lastname;
        var street1 = req.body.datajson.street1;
        var street2 = req.body.datajson.street2;
        var state = req.body.datajson.state;
        var city = req.body.datajson.city;
        var postal_code = req.body.datajson.postal_code;
        var country = req.body.datajson.country;

        var update = {};
        if (date_of_birth) {
            update.date_of_birth = crypto.AESencrypt(date_of_birth);
            if (!update.date_of_birth) {
                return res.send({ state: "error", error: global.property.get('error_109') });
            }
        }
        if (firstname) {
            update.firstname = crypto.AESencrypt(firstname);
            if (!update.firstname) {
                return res.send({ state: "error", error: global.property.get('error_109') });
            }
        }
        if (lastname) {
            update.lastname = crypto.AESencrypt(lastname);
            if (!update.lastname) {
                return res.send({ state: "error", error: global.property.get('error_109') });
            }
        }
        if (street1) {
            update.street1 = crypto.AESencrypt(street1);
            if (!update.street1) {
                return res.send({ state: "error", error: global.property.get('error_109') });
            }
        }
        if (street2) {
            update.street2 = crypto.AESencrypt(street2);
            if (!update.street2) {
                return res.send({ state: "error", error: global.property.get('error_109') });
            }
        }
        if (state) {
            update.state = crypto.AESencrypt(state);
            if (!update.state) {
                return res.send({ state: "error", error: global.property.get('error_109') });
            }
        }
        if (city) {
            update.city = crypto.AESencrypt(city);
            if (!update.city) {
                return res.send({ state: "error", error: global.property.get('error_109') });
            }
        }
        if (postal_code) {
            update.postal_code = crypto.AESencrypt(postal_code);
            if (!update.postal_code) {
                return res.send({ state: "error", error: global.property.get('error_109') });
            }
        }
        if (country) {
            update.country = crypto.AESencrypt(country);
            if (!update.country) {
                return res.send({ state: "error", error: global.property.get('error_109') });
            }
        }

        KYC.findOne({ userId: userId }, function (err, kyc) {
            if (err) {
                return res.send({ state: 'error', error: global.property.get('error_500') });
            }
            if (!kyc) {
                return res.send({ state: 'error', error: global.property.get('error_114') });
            }

            var concat = (firstname ? firstname : kyc.firstname) + (date_of_birth ? date_of_birth : kyc.date_of_birth) + (street1 ? street1 : kyc.street1) + (city ? city : kyc.city) + (country ? country : kyc.country);

            crypto.SHA(concat, function (hashMes) {
                update.hash_need_for_verification = hashMes;
                KYC.findOne({ hash_need_for_verification: hashMes }, function (err, isExisted) {
                    if (err) {
                        return res.send({ state: 'error', error: global.property.get('error_500') });
                    }
                    if (isExisted) {
                        return res.send({ state: 'error', error: global.property.get('error_115') });
                    }

                    KYC.findOneAndUpdate(
                        { userId: userId },
                        { $set: update },
                        { new: true }, function (e, r) {
                            if (e) {
                                return res.send({ state: "error", error: global.property.get('error_500') });
                            }
                            if (!utils.logAction(req, 'modify', userId)) {
                                return res.send({ state: 'error', error: global.property.get('error_107') });
                            }

                            return res.send({ state: "success", data: r });
                        });
                });
            });
        });
    },

    /**
     * Deactive user
     * @func deactiveUser
     * @param {string} req - request 
     * @param {string} res - in case of error, res error message
     */
    deactiveUser: function (req, res) {
        var userId = req.body.userId;

        if (!userId) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }

        var blackuser = new BlackUser();
        blackuser.userId = userId;

        blackuser.save(function (er) {
            if (er) {
                return res.send({ state: 'error', error: global.property.get('error_500') });
            }
            if (!utils.logAction(req, 'deactive', userId)) {
                return res.send({ state: 'error', error: global.property.get('error_107') });
            }

            return res.send({ state: 'success' });
        });
    },

    /**
     * Active user
     * @func deactiveUser
     * @param {string} req - request 
     * @param {string} res - in case of error, res error message
     */
    activeUser: function (req, res) {
        var userId = req.body.userId;

        if (!userId) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }

        BlackUser.findOneAndRemove({ userId: userId }, function (er, re) {
            if (er) {
                return res.send({ state: "error", error: global.property.get('error_500') });
            }
            if (!utils.logAction(req, 'active', userId)) {
                return res.send({ state: 'error', error: global.property.get('error_107') });
            }

            return res.send({ state: "success" });
        });
    },

    /**
     * Get user list
     * @func getUserList
     * @param {string} req - request 
     * @param {string} res - in case of error, res error message
     */
    getUserList: function (req, res) {
        KYC.find(function (er, re) {
            if (er) {
                return res.send({ state: "error", error: global.property.get('error_500') });
            }

            var data = [];
            for (var i = 0; i < re.length; i++) {
                var temp = utils.filterUser(re[i]);
                if (temp) data.push(temp);
            }
            return res.send({ state: 'success', data: data });
        });
    },

    /**
     * Get user info
     * @func getUserInfo
     * @param {string} req - request 
     * @param {string} res - in case of error, res error message
     */
    getUserInfo: function (req, res) {
        var userId = req.body.userId;

        if (!userId) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }

        KYC.findOne({ userId: userId }, function (er, kyc) {
            if (er) {
                return res.send({ state: "error", error: global.property.get('error_500') });
            }
            if (!kyc) {
                return res.send({ state: 'error', error: global.property.get('error_100') });
            }

            non_KYC.findOne({ userId: userId }, function (er, nonkyc) {
                if (er) {
                    return res.send({ state: "error", error: global.property.get('error_500') });
                }
                if (!nonkyc) {
                    nonkyc = {};
                    nonkyc.ETH_addr = [];
                }

                BlackUser.findOne({ userId: userId }, function (er, blackuser) {
                    if (er) {
                        return res.send({ state: "error", error: global.property.get('error_500') });
                    }

                    var data = utils.filterUser(kyc, nonkyc.ETH_addr, blackuser);
                    if (!data) {
                        return res.send({ state: 'error', error: global.property.get('error_112') });
                    }

                    return res.send({ state: 'success', data: data });
                });
            });
        });
    },

    /**
     * Get verify list
     * @func getVerifyList
     * @param {string} req - request 
     * @param {string} res - in case of error, res error message
     */
    getVerifyList: function (req, res) {
        KYC.find(function (er, re) {
            if (er) {
                return res.send({ state: "error", error: global.property.get('error_500') });
            }

            var data = [];
            for (var i = 0; i < re.length; i++) {
                var temp = utils.filterVerify(re[i]);
                if (temp) data.push(temp);
            }
            return res.send({ state: 'success', data: data });
        });
    }

}