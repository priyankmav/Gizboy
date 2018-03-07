var express = require('express');
var config = require('./config/config');
var logger = require('./config/logger');
var app = express();


const PORT = process.env.PORT || 5000;

require('./config/express')(app, config);

logger.log('info', "Creating HTTP server on port: %s", config.port);
require('http').createServer(app).listen(config.port, function () {
    logger.log('info',"HTTP Server listening on port: %s, in %s mode", config.port, app.get('env'));
});

module.exports = app;
