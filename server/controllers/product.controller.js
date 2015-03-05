'use strict';

var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var _ = require('lodash');

module.exports.create = function (req, res) {
  var product = new Product(req.body);

  product.save(function (err, prod) {
    if (err) {
      res.status(400).send({
        message: "error"
      });
    } else {
      res.json(prod);
    }
  });
};

module.exports.read = function (req, res) {
  res.json(req.product);
};

module.exports.list = function (req, res) {
  console.log('IP: ' + req.ip);
  Product.find().sort('-category').exec(function (err, comments) {
    if (err) {
      res.status(400).send({
        message: err
      });
    } else {
      res.json(comments);
    }
  });
};

module.exports.productById = function (req, res, next, id) {
  Product.findById(id).exec(function (err, prod) {
    if (err) {
      return next(err);
    }
    if (!prod) {
      return res.status(400).send({
        message: 'Comment not found'
      });
    }
    req.product = prod;
    next();
  });
};