var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var path = require('path');
var fs = require('fs');
var rsa = require('node-rsa');

var config = global.config;

/**
 * RSA key files
 */
var resources_server_pub = fs.readFileSync(path.join(__dirname, './../private/resources_server/rsa_1024_pub.pem'));
var admin_server_priv = fs.readFileSync(path.join(__dirname, './../private/admin_server/rsa_1024_priv.pem'));


var crypto = function () { };

crypto.AESencrypt = function (plaintext) {
    if (plaintext == null || plaintext == undefined || plaintext == NaN) return false;
    if (config.CRYPTO_KEY == null || config.CRYPTO_KEY == undefined || config.CRYPTO_KEY == NaN) return false;
    var ciphertext = CryptoJS.AES.encrypt(plaintext.toString(), config.CRYPTO_KEY).toString();
    return ciphertext;
}

crypto.AESdecrypt = function (ciphertext) {
    if (ciphertext == null || ciphertext == undefined || ciphertext == NaN) return false;
    if (config.CRYPTO_KEY == null || config.CRYPTO_KEY == undefined || config.CRYPTO_KEY == NaN) return false;
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), config.CRYPTO_KEY);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}

crypto.Bcrypt = function (plaintext, callback) {
    if (plaintext == null || plaintext == undefined || plaintext == NaN) return callback('Invalid input', null);
    bcrypt.genSalt(config.SALT_WORK_FACTOR, function (err, salt) {
        if (err) return callback(err, null);
        bcrypt.hash(plaintext.toString(), salt, null, function (err, hash) {
            if (err) return callback(err, null);
            return callback(null, hash);
        });
    });
}

crypto.SHA = function (mes, callback) {
    if (mes == null || mes == undefined || mes == NaN) return callback(false);
    return callback(SHA256(mes.toString()).toString());
}

crypto.compare = function (old, newOne, callback) {
    if (old == null || old == undefined || old == NaN) return callback('Invalid input', null);
    if (newOne == null || newOne == undefined || newOne == NaN) return callback('Invalid input', null);
    bcrypt.compare(old.toString(), newOne.toString(), function (err, isMatch) {
        if (err) return callback(err, null);
        callback(null, isMatch);
    });
}

crypto.decryptKYCLevel3 = function (cipher) {
    if (typeof cipher != 'string') return false;
    var buffer = Buffer.from(cipher, 'binary');
    var pub = new rsa();
    pub.importKey(resources_server_pub, 'pkcs8-public-pem');
    return pub.decryptPublic(buffer).toString();
}

crypto.createToken = function (value, sessionTime) {
    return jwt.sign(value, admin_server_priv, { expiresIn: sessionTime, algorithm: 'RS256' });
}


module.exports = crypto;