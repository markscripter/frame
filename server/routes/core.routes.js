'use strict';

var appRoot = require('app-root-path');
var conf = require(appRoot + '/config/app/all');
var user = require(appRoot + '/server/controllers/person.controller');
var core = require(appRoot + '/server/controllers/core.controller');
var _ = require('lodash');

module.exports = function (app) {
  app.route('/')
    .get(user.isLoggedIn, core.index);

  app.route('/login')
    .get(core.login);
};