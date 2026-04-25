// Load required packages
var mongoose = require('mongoose');
var utils = require('./../../lib/utils');
var crypto = require('./../../lib/crypto');

// Define our user schema
var KYC = mongoose.Schema({

    // Primary key
    userId: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    hash_need_for_verification: {
        type: String,
        unique: true,
        require: true
    },

    // KYC level 1
    email: {
        type: String,
        unique: true,
        required: true
    },
    date_of_birth: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    street1: {
        type: String,
        require: true
    },
    street2: {
        type: String
    },
    state: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    postal_code: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },

    // KYC level 3
    level3_passport: {
        type: String
    },
    level3_you_with_passport: {
        type: String
    },
    level3_proof_of_address: {
        type: String
    },
    level3_is_verified: {
        type: Boolean
    },

    // Agent
    read_only: {
        type: Boolean,
        require: true
    }
});


KYC.pre('save', function (next) {
    var kyc = this;
    var er = new Error('Cannot encrypt data.');

    var _email = null;
    if (kyc.email) _email = crypto.AESencrypt(kyc.email);
    if (_email) kyc.email = _email;
    if (_email === false) return next(er);

    var _date_of_birth = null;
    if (kyc.date_of_birth) _date_of_birth = crypto.AESencrypt(kyc.date_of_birth);
    if (_date_of_birth) kyc.date_of_birth = _date_of_birth;
    if (_date_of_birth === false) return next(er);

    var _firstname = null;
    if (kyc.firstname) _firstname = crypto.AESencrypt(kyc.firstname);
    if (_firstname) kyc.firstname = _firstname;
    if (_firstname === false) return next(er);

    var _lastname = null;
    if (kyc.lastname) _lastname = crypto.AESencrypt(kyc.lastname);
    if (_lastname) kyc.lastname = _lastname;
    if (_lastname === false) return next(er);

    var _street1 = null;
    if (kyc.street1) _street1 = crypto.AESencrypt(kyc.street1);
    if (_street1) kyc.street1 = _street1;
    if (_street1 === false) return next(er);

    var _street2 = null;
    if (kyc.street2) _street2 = crypto.AESencrypt(kyc.street2);
    if (_street2) kyc.street2 = _street2;
    if (_street2 === false) return next(er);

    var _state = null;
    if (kyc.state) _state = crypto.AESencrypt(kyc.state);
    if (_state) kyc.state = _state;
    if (_state === false) return next(er);

    var _city = null;
    if (kyc.city) _city = crypto.AESencrypt(kyc.city);
    if (_city) kyc.city = _city;
    if (_city === false) return next(er);

    var _postal_code = null;
    if (kyc.postal_code) _postal_code = crypto.AESencrypt(kyc.postal_code);
    if (_postal_code) kyc.postal_code = _postal_code;
    if (_postal_code === false) return next(er);

    var _country = null;
    if (kyc.country) _country = crypto.AESencrypt(kyc.country);
    if (_country) kyc.country = _country;
    if (_country === false) return next(er);

    return next();
});

KYC.post('init', function (kyc, next) {
    var er = new Error('Cannot decrypt data.');

    var _email = null;
    if (kyc.email) _email = crypto.AESdecrypt(kyc.email);
    if (_email) kyc.email = _email;
    if (_email === false) return next(er);

    var _date_of_birth = null;
    if (kyc.date_of_birth) _date_of_birth = crypto.AESdecrypt(kyc.date_of_birth);
    if (_date_of_birth) kyc.date_of_birth = _date_of_birth;
    if (_date_of_birth === false) return next(er);

    var _firstname = null;
    if (kyc.firstname) _firstname = crypto.AESdecrypt(kyc.firstname);
    if (_firstname) kyc.firstname = _firstname;
    if (_firstname === false) return next(er);

    var _lastname = null;
    if (kyc.lastname) _lastname = crypto.AESdecrypt(kyc.lastname);
    if (_lastname) kyc.lastname = _lastname;
    if (_lastname === false) return next(er);

    var _street1 = null;
    if (kyc.street1) _street1 = crypto.AESdecrypt(kyc.street1);
    if (_street1) kyc.street1 = _street1;
    if (_street1 === false) return next(er);

    var _street2 = null;
    if (kyc.street2) _street2 = crypto.AESdecrypt(kyc.street2);
    if (_street2) kyc.street2 = _street2;
    if (_street2 === false) return next(er);

    var _state = null;
    if (kyc.state) _state = crypto.AESdecrypt(kyc.state);
    if (_state) kyc.state = _state;
    if (_state === false) return next(er);

    var _city = null;
    if (kyc.city) _city = crypto.AESdecrypt(kyc.city);
    if (_city) kyc.city = _city;
    if (_city === false) return next(er);

    var _postal_code = null;
    if (kyc.postal_code) _postal_code = crypto.AESdecrypt(kyc.postal_code);
    if (_postal_code) kyc.postal_code = _postal_code;
    if (_postal_code === false) return next(er);

    var _country = null;
    if (kyc.country) _country = crypto.AESdecrypt(kyc.country);
    if (_country) kyc.country = _country;
    if (_country === false) return next(er);

    var _level3_passport = null;
    if (kyc.level3_passport) _level3_passport = crypto.decryptKYCLevel3(kyc.level3_passport);
    if (_level3_passport) kyc.level3_passport = _level3_passport;
    if (_level3_passport === false) return next(er);

    var _level3_you_with_passport = null;
    if (kyc.level3_you_with_passport) _level3_you_with_passport = crypto.decryptKYCLevel3(kyc.level3_you_with_passport);
    if (_level3_you_with_passport) kyc.level3_you_with_passport = _level3_you_with_passport;
    if (_level3_you_with_passport === false) return next(er);

    var _level3_proof_of_address = null;
    if (kyc.level3_proof_of_address) _level3_proof_of_address = crypto.decryptKYCLevel3(kyc.level3_proof_of_address);
    if (_level3_proof_of_address) kyc.level3_proof_of_address = _level3_proof_of_address;
    if (_level3_proof_of_address === false) return next(er);

    return next();
});

module.exports = global.KYC_connection.model('KYC', KYC);