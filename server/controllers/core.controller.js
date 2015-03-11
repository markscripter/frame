'use strict';

var _ = require('lodash');
var appRoot = require('app-root-path');
var pageData = require(appRoot + '/helpers/page-data');
var conf = require(appRoot + '/config/app/all');

module.exports.index = function (req, res) {
  var data = pageData('/server/views/pages/index.jade');
  res.render('pages/index.page.jade', data);
};

module.exports.login = function (req, res) {
  var data = pageData('/server/views/pages/login.jade');
  if (req.flash('error') === 400) {
    _.extend(data, {error: "Incorrect username or password."});
  }
  res.render('pages/login.page.jade', data);
};