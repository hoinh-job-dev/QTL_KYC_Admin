var env = process.env.NODE_ENV;

/**
 * Development configuration
 */
var development = {
    server_port: '5000',
    token: {
        expriedTime: 24 * 3600
    },
    SALT_WORK_FACTOR: 10,
    CRYPTO_KEY: 'secret key of doge',
    privilege: {
        master_admin: 'master',
        system_admin: 'system',
        operator_admin: 'operator'
    },
    white_list: ["115.75.4.185", "127.0.0.1", "::ffff:127.0.0.1"]
}

/**
 * Production configuration
 */
var production = {
    server_port: '5000',
    token: {
        expriedTime: 24 * 3600
    },
    SALT_WORK_FACTOR: 10,
    CRYPTO_KEY: 'secret key of doge',
    privilege: {
        master_admin: 'master',
        system_admin: 'system',
        operator_admin: 'operator'
    },
    white_list: ["115.75.4.185", "127.0.0.1", "::ffff:127.0.0.1"]
}


/**
 * Export module
 */
var config = {
    development: development,
    production: production
};
module.exports = config[env];