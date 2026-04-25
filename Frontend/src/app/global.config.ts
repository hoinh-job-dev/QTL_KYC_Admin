var env = process.env.ENV;

var configuration = {
    development: {
        adminUrl: 'http://localhost:5000',
        resourceUrl: 'http://localhost:3003'
    },
    production: {
        adminUrl: 'https://dev-lottery.quanta.im:5002',
        resourceUrl: 'https://dev-resource.quanta.im'
    }
}

export var config = configuration[env];