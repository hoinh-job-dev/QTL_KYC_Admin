var passport = require('passport');
var utils = require('./../lib/utils');

var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var Admin = require('./../db/admin/admin');
var AdminToken = require('./../db/auth/admin_token');

/**
 * Serialize/Deserialize requests
 */
passport.serializeUser(function (admin, done) {
    return done(null, admin.adminId);
});
passport.deserializeUser(function (id, done) {
    Admin.findById(id, function (err, admin) {
        if (err) return done(err, null);
        var return_data = {
            adminId: admin._id,
            username: admin.username,
            firstname: admin.firstname,
            lastname: admin.lastname,
            address: admin.address,
            role: admin.role
        }
        return done(null, admin);
    });
});

/**
 * Authenticate
 */
passport.use('admin-local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function (username, password, callback) {
    Admin.findOne({ username: username }, function (err, admin) {
        if (err) return callback(err);
        if (!admin) return callback(null, false);

        admin.verifyPassword(password, function (err, isMatch) {
            if (err) return callback(err);
            if (!isMatch) return callback(null, false);

            var return_data = {
                adminId: admin._id,
                username: admin.username,
                firstname: admin.firstname,
                lastname: admin.lastname,
                address: admin.address,
                role: admin.role
            }

            return callback(null, return_data);
        });
    });
}));

/**
 * Is logged in
 */
passport.use('bearer', new BearerStrategy(
    function (adminToken, callback) {
        AdminToken.findOne({ value: adminToken }, function (err, token) {
            if (err) return callback(err);
            if (!token) return callback(null, false);

            Admin.findOne({ _id: token.adminId }, function (err, admin) {
                if (err) return callback(err);
                if (!admin) return callback(null, false);

                var return_data = {
                    adminId: admin._id,
                    username: admin.username,
                    role: admin.role,
                }

                return callback(null, return_data, { scope: '*' });
            });
        });
    }
));

/**
 * Save token
 */
var saveToken = function (req, res) {
    var adminId = req.user.adminId;
    var username = req.user.username;
    var role = req.user.role;

    if (!adminId || !username || !role) {
        return res.send({ state: 'error', error: global.property.get('error_106') });
    }

    admintoken = utils.createAdminToken(adminId, role);
    admintoken.save(function (er) {
        if (er) {
            return res.send({ state: 'error', error: global.property.get('error_104') });
        }
        if (!utils.logAction(req, 'login', '')) {
            return res.send({ state: 'error', error: global.property.get('error_107') });
        }

        data = {
            username: username,
            role: role,
            token: admintoken.value
        }

        return res.send({ state: 'success', data: data });
    });
}

/**
 * Logout
 */
var logout = function (req, res) {
    admintoken = utils.parseBearerToken(req);

    if (!admintoken) {
        return res.send({ state: 'error', error: global.property.get('error_106') });
    }

    AdminToken.find({ value: admintoken }).remove(function (err) {
        if (err) {
            return res.send({ state: 'error', data: global.property.get('error_500') });
        }

        return res.send({ state: 'success' });
    });
}


module.exports = {
    adminAuthenticated: passport.authenticate('admin-local-login', {
        session: false
    }),
    saveToken: saveToken,
    isLoggedIn: passport.authenticate('bearer', {
        session: false
    }),
    logout: logout
}