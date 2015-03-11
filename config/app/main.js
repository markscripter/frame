'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var glob = require('glob');
var chalk = require('chalk');
var passport = require('passport');
var session = require('express-session');
var appRoot = require('app-root-path');
var flash = require('connect-flash');

module.exports = function () {
  var app = express();

  // Set views path and view engine
  app.set('views', './server/views');
  app.set('view engine', 'jade');
  app.engine('jade', require('jade').__express);

  // static content
  app.use('/css', express.static("public/css"));
  app.use('/js', express.static("public/js"));

  // body parsing
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // Use helmet to secure Express headers
  app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
  app.use(helmet.ienoopen());
  app.disable('x-powered-by');


  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: require('./all.js').secret
  }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  /**********************
    Models
  ***********************/
  var models = glob.sync(appRoot + '/server/models/**.model.js');
  models.forEach(function (model) {
    console.log(chalk.blue(model));
    require(model);
  });

  /**********************
    Routes
  ***********************/
  glob(appRoot + '/server/routes/**.routes.js', {}, function (err, routes) {
    if (err) {
      console.log(chalk.bgRed.black(err));
    }
    routes.forEach(function (route) {
      require(route)(app);
    });
  });

  return app;
};
