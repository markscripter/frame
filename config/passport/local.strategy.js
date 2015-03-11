'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Person = require('mongoose').model('Person');

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
  function (username, password, done) {
    Person.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }));