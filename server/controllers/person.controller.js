'use strict';

var mongoose = require('mongoose');
var Person = mongoose.model('Person');
var _ = require('lodash');
var passport = require('passport');

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

module.exports.isLoggedIn = function (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('error', '401');
    res.redirect('/login');
  }
  next();
};

module.exports.signIn = function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err || !user) {
      req.flash('error', '400');
      res.redirect('/login');
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      req.login(user, function (err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
    }
  })(req, res, next);
};