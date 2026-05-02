var env = process.env.NODE_ENV;

/**
 * Development configuration
 */
var development = {
    authdb_server: 'mongodb://localhost:27017/qtl_authdb',
    admin_server: 'mongodb://localhost:27017/qtl_admin',
    userdb_server: 'mongodb://localhost:27017/qtl_userdb',
    historydb_server: 'mongodb://localhost:27017/qtl_historydb',
    KYC_server: 'mongodb://localhost:27017/qtl_KYC',
    lotterydb_server: 'mongodb://localhost:27017/qtl_lotterydb',
    mongo: {
        auth: false,
        options: {
            auth: {
                authdb: "admin"
            },
            user: "admin",
            pass: "admin"
        }
    }
}

/**
 * Production configuration
 */
var production = {
    authdb_server: 'mongodb://localhost:27017/qtl_authdb',
    admin_server: 'mongodb://localhost:27017/qtl_admin',
    userdb_server: 'mongodb://localhost:27017/qtl_userdb',
    historydb_server: 'mongodb://localhost:27017/qtl_historydb',
    KYC_server: 'mongodb://localhost:27017/qtl_KYC',
    lotterydb_server: 'mongodb://localhost:27017/qtl_lotterydb',
    mongo: {
        auth: true,
        options: {
            auth: {
                authdb: "admin"
            },
            user: "admin",
            pass: "admin"
        }
    }
}


/**
 * Export module
 */
var config = {
    development: development,
    production: production
};
module.exports = config[env];