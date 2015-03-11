'use strict';

var passport = require('passport');
var Person = require('mongoose').model('Person');
var glob = require('glob');
var appRoot = require('app-root-path');
var chalk = require('chalk');


module.exports = function () {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    Person.findById(id, function (err, user) {
      done(err, user);
    });
  });

  glob(appRoot + '/config/passport/**.strategy.js', {}, function (err, strategies) {
    if (err) {
      console.log(chalk.bgRed.black(err));
    }
    strategies.forEach(function (strategy) {
      require(strategy);
    });
  });
};
