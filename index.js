var express = require('express');
var config = require('./config/config');
var logger = require('./config/logger');
var app = express();


var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number);

require('./config/express')(app, config);

logger.log('info', "Creating HTTP server on port: %s", config.port);
require('http').createServer(app).listen(config.port, function () {
    logger.log('info',"HTTP Server listening on port: %s, in %s mode", config.port, app.get('env'));
});

module.exports = app;
