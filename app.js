'use strict';

var mongoose = require('mongoose');
var mongoConf = require('./config/db/mongo');
var chalk = require('chalk');

var db = mongoConf.connectDB();

var app = require('./config/app/main')();

require("./config/passport/passport.config.js")();

app.listen(9000, function () {
  console.log(chalk.green('Server listening on port 9000'));
});


