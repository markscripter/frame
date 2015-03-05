'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var glob = require('glob');
var chalk = require('chalk');

var appRoot = require('app-root-path');

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

  /**********************
    Models
  ***********************/
  glob(appRoot + '/server/models/**.model.js', {}, function (err, models) {
    if (err) {
      console.log(chalk.bgRed.black(err));
    }
    models.forEach(function (model) {
      require(model);
    });
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
