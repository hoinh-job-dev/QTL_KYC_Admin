var uuid = require('uuid');
var crypto = require('./crypto');
var config = global.config;

var AdminHistory = require('./../db/history/admin_history');
var AdminToken = require('./../db/auth/admin_token');
var Tx = require('./../db/history/tx');

var Utils = function () { }

Utils.createAdminToken = function (adminId, role) {
    if (!adminId) return false;
    var _admintoken = {
        unique_key: uuid.v4(),
        adminId: adminId,
        role: role
    };
    encode_admintoken = crypto.createToken(_admintoken, config.token.expriedTime);
    var admintoken = new AdminToken({
        value: encode_admintoken,
        unique_key: _admintoken.unique_key,
        adminId: _admintoken.adminId,
        role: role
    });
    return admintoken;
}

Utils.saveTx = function (txId, operation, data, callback) {
    if (!txId || !operation || !data) return callback(false);
    var tx = new Tx({
        txId: txId,
        operation: operation,
        objectChanged: data
    });
    tx.save(function (er) {
        if (er) return callback(false);
        return callback(true);
    });
}

Utils.logAction = function (req, action, memo) {
    var ip = Utils.getIP(req);
    var admin = req.user;
    var username = admin.username;
    if (!admin || !username || !ip || !action) return false;
    var adminHistory = new AdminHistory({
        username: username,
        ip: ip,
        action: action,
        memo: memo,
        createAt: new Date(),
    });
    adminHistory.save();
    return true;
}

Utils.parseBearerToken = function (request) {
    var auth = request.headers['authorization'];
    if (typeof auth != 'string') return false;
    var prefix = auth.substring(0, 6);
    if (prefix != 'Bearer') return false;
    var token = auth.substring(7);
    return token;
}

Utils.getIP = function (req) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
    ip = ip.split(',')[0];
    ip = ip.split(':').slice(-1);
    ip = ip[0];
    return ip;
}

Utils.convertKbSize = function (size) {
    return Math.round((size / 1024) * 10) / 10
}

Utils.filterHistory = function (h) {
    if (!h || !h.username || !h.ip || !h.action || !h.createAt) return false;
    var re = {
        username: h.username,
        ip: h.ip,
        action: h.action,
        memo: h.memo,
        createAt: h.createAt
    }
    return re;
}

Utils.filterAdmin = function (a) {
    if (!a) return false;
    var re = {
        username: a.username,
        firstname: a.firstname,
        lastname: a.lastname,
        type: a.role,
        address: a.address
    }
    return re;
}

Utils.filterUser = function (u, ethaddr, blackuser) {
    if (!u) return false;
    var re = {
        userId: u._id,
        email: u.email,
        date_of_birth: u.date_of_birth,
        sex: u.sex,
        firstname: u.firstname,
        lastname: u.lastname,
        type: u.read_only ? 'agent' : 'user',
        level3_passport: u.level3_passport,
        level3_you_with_passport: u.level3_you_with_passport,
        level3_proof_of_address: u.level3_proof_of_address,
        street1: u.street1,
        street2: u.street2,
        state: u.state,
        city: u.city,
        postal_code: u.postal_code,
        country: u.country
    }
    if (u.level3_is_verified === undefined) {
        re.level3_is_verified = 'notyet';
    }
    else {
        re.level3_is_verified = u.level3_is_verified ? 'verified' : 'rejected';
    }
    if (ethaddr) re.ETH_addr = ethaddr;
    re.blackuser = blackuser ? true : false;
    return re;
}

Utils.filterVerify = function (u, ethaddr, blackuser) {
    if (!u) return false;
    var re = {
        userId: u._id,
        email: u.email,
        date_of_birth: u.date_of_birth,
        sex: u.sex,
        firstname: u.firstname,
        lastname: u.lastname,
        type: u.read_only ? 'agent' : 'user',
        street1: u.street1,
        street2: u.street2,
        state: u.state,
        city: u.city,
        postal_code: u.postal_code,
        country: u.country
    }
    if (u.level3_is_verified === undefined) {
        re.level3_is_verified = 'notyet';
    }
    else return false;
    if (ethaddr) re.ETH_addr = ethaddr;
    re.blackuser = blackuser ? true : false;
    return re;
}

Utils.isIn = function (element, array) {
    for (var i = 0; i < array.length; i++) {
        if (element == array[i]) return true;
    }
    return false;
}


module.exports = Utils;