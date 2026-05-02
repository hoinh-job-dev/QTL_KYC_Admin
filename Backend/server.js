var express = require('express');
var mongoose = require('mongoose');
var {propertiesReader} = require('properties-reader');
var properties = propertiesReader('./properties.file');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var cors = require('cors');
var config = require('./config/config');

var app = express();
var env = app.get('env') || 'development';


/**
 * Create connection to mongodb
 */
mongoose.Promise = require('bluebird');
var authdb_connection;
var admin_connection;
var userdb_connection;
var historydb_connection;
var KYC_connection;
var lotterydb_connection;

if (config.mongo.auth) {
    authdb_connection = mongoose.createConnection(config.authdb_server, config.mongo.options);
    admin_connection = mongoose.createConnection(config.admin_server, config.mongo.options);
    userdb_connection = mongoose.createConnection(config.userdb_server, config.mongo.options);
    historydb_connection = mongoose.createConnection(config.historydb_server, config.mongo.options);
    KYC_connection = mongoose.createConnection(config.KYC_server, config.mongo.options);
    lotterydb_connection = mongoose.createConnection(config.lotterydb_server, config.mongo.options);
}
else {
    authdb_connection = mongoose.createConnection(config.authdb_server);
    admin_connection = mongoose.createConnection(config.admin_server);
    userdb_connection = mongoose.createConnection(config.userdb_server);
    historydb_connection = mongoose.createConnection(config.historydb_server);
    KYC_connection = mongoose.createConnection(config.KYC_server);
    lotterydb_connection = mongoose.createConnection(config.lotterydb_server);
}


/**
 * Set up global variables
 */
global.config = config;
global.property = properties;
global.authdb_connection = authdb_connection;
global.admin_connection = admin_connection;
global.userdb_connection = userdb_connection;
global.historydb_connection = historydb_connection;
global.KYC_connection = KYC_connection;
global.lotterydb_connection = lotterydb_connection;


/**
 * Config middleware
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());
app.use(passport.session());


/**
 * Set up routers
 */
var router = require('./routers/router');
app.use('/', router);


/**
 * Run server
 */
app.listen(config.server_port, function () {
    console.log('Server is listening on port', config.server_port);
});