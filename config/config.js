var path = require('path'),    
rootPath = path.normalize(__dirname + '/..'),    
env = process.env.NODE_ENV || 'development';

var config = {  
development: {    
            root: rootPath,    
            app: {      name: 'GizBoy'    },    
            port: 5000,  
            db: 'mongodb://gizboy:apple123@ds153978.mlab.com:53978/heroku_z8q7l9hf',
            uploads: rootPath + "/public/uploads/",            
            secret: "adkjaljdaskjdla"
 },  

 test: {    
  root: rootPath,    
  app: {      name: 'Gizboy'    },    
  //port: 4000,
  db: 'mongodb://gizboy:apple123@ds153978.mlab.com:53978/heroku_z8q7l9hf',
  secret: "adkjaljdaskjdla"
}, 
 
 production: {    
              root: rootPath,    
              app: {      name: 'Gizboy'    },    
               //port: 80,
               db: 'mongodb://gizboy:apple123@ds153978.mlab.com:53978/heroku_z8q7l9hf',
               secret: "adkjaljdaskjdla"
              }
  };

module.exports = config[env];

