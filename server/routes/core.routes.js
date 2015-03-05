'use strict';

var appRoot = require('app-root-path');
var conf = require(appRoot + '/config/app/all');

module.exports = function (app) {
  app.route('/')
    .get(function (req, res) {
      res.render('pages/index.page.jade', require(conf.viewData + 'index.json'));
    });
};