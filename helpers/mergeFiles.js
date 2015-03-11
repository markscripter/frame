var path = require('path');
var appRoot = require('app-root-path');
var dataPath = appRoot + '/server/views-data/';
var _ = require('lodash');
// return content
var content = {};

module.exports = function (mergeArr) {
  mergeArr.forEach(function (file) {
    _.extend(content, require(dataPath + file));
  });
  return content;
};