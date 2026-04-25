var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var compression = require('compression');
var config = require('./config/config');


/**
 * Initialize
 */
var app = express();

/**
 * Setup middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(compression());

/**
 * Add static paths
 */
app.use(express.static(path.join(__dirname, 'dist'), { index: '_' }));

/**
 * Routers
 */

app.get('*.(js)(css)', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

/**
 * Run server
 */
app.listen(config.server_port, function () {
    console.log('Server is listening on port', config.server_port);
});
