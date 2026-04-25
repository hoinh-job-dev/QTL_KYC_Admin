var Admin = require('./../db/admin/admin');
var AdminHistory = require('./../db/history/admin_history');
var crypto = require('./../lib/crypto');
var utils = require('./../lib/utils');
var config = global.config;


module.exports = {

    /**
     * Add new admin, just only master can do
     * @func addAdmin
     * @param {string} req - request
     * @param {string} res - in case of error, res return error
     */
    addAdmin: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var address = req.body.address;
        var role = req.body.role;

        if (!username || !password || !firstname || !lastname || !address || !role) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }
        if (role !== config.privilege.master_admin && role !== config.privilege.system_admin && role !== config.privilege.operator_admin) {
            return res.send({ state: 'error', error: global.property.get('error_111') });
        }

        admin = new Admin();
        admin.username = username;
        admin.password = password;
        admin.firstname = firstname;
        admin.lastname = lastname;
        admin.address = address;
        admin.role = role;

        admin.save(function (er, re) {
            if (er) {
                return res.send({ state: 'error', error: global.property.get('error_500') });
            }
            if (!utils.logAction(req, 'add admin', username + " - " + role)) {
                return res.send({ state: 'error', error: global.property.get('error_107') });
            }

            return res.send({ state: 'success', data: utils.filterAdmin(re) });
        });
    },

    /**
     * Delete admin, just only master can do
     * @func deleteAdmin
     * @param {string} req - request
     * @param {string} res - in case of error, res return error
     */
    deleteAdmin: function (req, res) {
        var username = req.body.username;

        if (!username) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }

        Admin.findOneAndRemove({ username: username }, function (e, r) {
            if (e) {
                return res.send({ state: "error", error: global.property.get('error_500') });
            }
            if (!utils.logAction(req, 'delete admin', username)) {
                return res.send({ state: 'error', error: global.property.get('error_107') });
            }

            return res.send({ state: "success", data: utils.filterAdmin(r) });
        });
    },

    /**
     * Change password of user
     * @func changePassword
     * @param {string} req - request
     * @param {string} res - in case of error, res return error
     */
    changePassword: function (req, res) {
        var username = req.user.username;
        var oldPassword = req.body.oldPassword;
        var newPassword = req.body.newPassword;

        if (!username || !oldPassword || !newPassword) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }

        Admin.findOne({ username: username }, function (err, admin) {
            if (err) {
                return res.send({ state: 'error', error: global.property.get('error_500') });
            }
            if (!admin) {
                return res.send({ state: 'error', error: global.property.get('error_101') });
            }

            admin.verifyPassword(oldPassword, function (err, isMatched) {
                if (err) {
                    return res.send({ state: 'error', error: global.property.get('error_500') });
                }
                if (!isMatched) {
                    return res.send({ state: 'error', error: global.property.get('error_102') });
                }

                crypto.Bcrypt(newPassword, function (err, newHash) {
                    if (err) {
                        return res.send({ state: 'error', error: global.property.get('error_500') });
                    }
                    if (!newHash) {
                        return res.send({ state: 'error', error: global.property.get('error_109') });
                    }

                    Admin.findOneAndUpdate(
                        { username: username },
                        { $set: { password: newHash } },
                        { new: true }, function (err, re) {
                            if (err) {
                                return res.send({ state: 'error', error: global.property.get('error_500') });
                            }
                            if (!re) {
                                return res.send({ state: 'error', error: global.property.get('error_500') });
                            }
                            if (!utils.logAction(req, 'change password', '')) {
                                return res.send({ state: 'error', error: global.property.get('error_107') });
                            }

                            return res.send({ state: 'success' });
                        });
                });
            });
        });
    },

    /**
     * Get admin history
     * @func getAllHistory
     * @param {string} req - request
     * @param {string} res - in case of error, res return error
     */
    getAllHistory: function (req, res) {
        AdminHistory.find(function (er, re) {
            if (er) {
                return res.send({ state: 'error', error: global.property.get('error_500') });
            }

            var data = [];
            for (var i = 0; i < re.length; i++) {
                var temp = utils.filterHistory(re[i]);
                if (temp) data.push(temp);
            }
            return res.send({ state: 'success', data: data });
        });
    },

    /**
     * Get my history
     * @func getMyHistory
     * @param {string} req - request
     * @param {string} res - in case of error, res return error
     */
    getMyHistory: function (req, res) {
        var username = req.user.username;

        if (!username) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }

        AdminHistory.find({ username: username }, function (er, re) {
            if (er) {
                return res.send({ state: 'error', error: global.property.get('error_500') });
            }

            var data = [];
            for (var i = 0; i < re.length; i++) {
                var temp = utils.filterHistory(re[i]);
                if (temp) data.push(temp);
            }
            return res.send({ state: 'success', data: data });
        });
    },

    /**
     * Get admin list
     * @func getAdminList
     * @param {string} req - request
     * @param {string} res - in case of error, res return error
     */
    getAdminList: function (req, res) {
        Admin.find(function (er, re) {
            if (er) {
                return res.send({ state: 'error', error: global.property.get('error_500') });
            }

            var data = [];
            for (var i = 0; i < re.length; i++) {
                var temp = utils.filterAdmin(re[i]);
                if (temp) data.push(temp);
            }
            return res.send({ state: 'success', data: data });
        });
    }

}