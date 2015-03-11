var path = require('path');
var appRoot = require('app-root-path');
var merge = require('./mergeFiles.js');
var _ = require('lodash');

var dataPath = appRoot + '/server/views-data/';
var jsonData = {};

module.exports = function (page) {
  var base = path.basename(page);
  jsonData = require(dataPath + base.substring(0, base.indexOf('.')) + '.json');
  if (jsonData.hasOwnProperty("mergeFiles")) {
    _.extend(jsonData, merge(jsonData.mergeFiles));
  }
  return jsonData;
};