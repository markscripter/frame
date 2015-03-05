'use strict';

var mongoose = require('mongoose');
var chalk = require('chalk');
var dbConfig = require('./dev');

module.exports.connectDB = function () {
  var db = mongoose.connect(dbConfig.db.uri);

  mongoose.connection.on('error', function (err) {
    console.log(chalk.red('Connection Error: ' + err));
  });

  // mongoose.connection.once('open', function (callback) {
  //   console.log(chalk.green('Connection made to: ' + dbConfig.db.uri));
  // });

  return db;
};

