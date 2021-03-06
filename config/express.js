var express = require('express');
var logger = require('./logger');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var mongodb = require('mongodb');
var bluebird = require('bluebird');
var glob = require('glob');
var cors = require('cors');
//var MongoClient = mongodb.MongoClient;

module.exports = function (app, config) {

  //app.use(cors({origin:'http://localhost:9000'}));
  logger.log("Loading Mongoose functionality");
  mongoose.Promise = require('bluebird');

// mongodb connection
mongoose.connect("mongodb://gizboy:apple123@ds153978.mlab.com:53978/heroku_z8q7l9hf", {
  promiseLibrary: global.Promise
});

var db = mongoose.connection;

// mongodb error
db.on('error', console.error.bind(console, 'connection error:'));

// mongodb connection open
db.once('open', () => {
  console.log(`Connected to Mongo at: ${new Date()}`);
});
  /*mongoose.connect(process.env.MONGOLAB_URI);/*, {}, function(error, db){

    // console.log will write to the heroku log which can be accessed via the 
    // command line as "heroku logs"
    db.addListener("error", function(error){
      console.log("Error connecting to MongoLab");
    });
  }
*/
  
  /*mongoose.connect(config.db, {useMongoClient: true});
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });*/

  if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));

    mongoose.set('debug', true);
    mongoose.connection.once('open', function callback() {
      logger.log("Mongoose connected to the database");
    });
  
    app.use(function (req, res, next) {
      logger.log('Request from ' + req.connection.remoteAddress, 'info');
      next();
    });
  }

  app.use(bodyParser.json({limit: '1000mb'}));
  app.use(bodyParser.urlencoded({limit: '1000mb', extended: true
    }));

  var models = glob.sync(config.root + '/app/models/*.js');
  models.forEach(function (model) {
    require(model);
  });
  
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller);
  });

require('../app/controllers/users')(app, config);
require('../app/controllers/gallery')(app, config);
require('../app/controllers/photo')(app, config);

app.use(express.static(config.root + '/public'));
  
    app.use(function (req, res) {
      res.type('text/plan');
      res.status(404);
      res.send('404 Not Found');
    });
  
    app.use(function (err, req, res, next) {
      console.error(err.stack);
      res.type('text/plan');
      res.status(500);
      res.send('500 Sever Error');
    });
  
    app.use(function (err, req, res, next) {
      console.log(err);
      if (process.env.NODE_ENV !== 'test') logger.log(err.stack,'error');
      res.type('text/plan');
      if(err.status){
        res.status(err.status).send(err.message);
      } else {
        res.status(500).send('500 Sever Error');
      }
    });
  
    logger.log("Starting application");
  
  };
  
