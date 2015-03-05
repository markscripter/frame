var path = require('path');
var appRoot = require('app-root-path');

var dataPath = appRoot + '/server/views-data/';

module.exports = function (page) {
  var base = path.basename(page);
  return require(dataPath + base.substring(0, base.indexOf('.')) + '.json');
};