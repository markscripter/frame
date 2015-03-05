'use strict';

var appRoot = require('app-root-path');
var product = require('../controllers/product.controller');

module.exports = function (app) {
  app.route('/api/products')
    .get(product.list)
    .post(product.create);

  app.route('/api/products/:productId')
    .get(product.read)
    .put(product.create);

  app.param('productId', product.productById);
};