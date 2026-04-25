var common = require('./common.config');
var mongo = require('./mongo.config');
var provider = require('./provider.config');

var config = Object.assign(common, mongo, provider);
module.exports = config;