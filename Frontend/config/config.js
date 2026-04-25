var env = process.env.NODE_ENV;

var config = {
    development: {
        my_domain: 'http://localhost:5001',
        my_ip: '127.0.0.1',
        server_port: '5001'
    },
    production: {
        my_domain: 'http://127.0.0.1:5001',
        my_ip: '127.0.0.1',
        server_port: '5001'
    }
};

module.exports = config[env];