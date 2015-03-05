'use strict';

var mongoose = require('mongoose');
var Person = mongoose.model('Person');
var _ = require('lodash');

module.exports.create = function (req, res) {
  var person = new Person(req.body);

  person.save(function (err, person) {
    if (err) {
      res.status(400).send({
        message: "error"
      });
    } else {
      res.json(person);
    }
  });
};

module.exports.read = function (req, res) {
  res.json(req.person);
};

module.exports.list = function (req, res) {
  console.log('IP: ' + req.ip);
  Person.find().sort('-created').exec(function (err, people) {
    if (err) {
      res.status(400).send({
        message: err
      });
    } else {
      res.json(people);
    }
  });
};

module.exports.personById = function (req, res, next, id) {
  Person.findById(id).exec(function (err, person) {
    if (err) {
      return next(err);
    }
    if (!person) {
      return res.status(400).send({
        message: 'Article not found'
      });
    }
    req.person = person;
    next();
  });
};