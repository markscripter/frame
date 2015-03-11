'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var PersonModel = new Schema({
  provider: {
    type: String,
    required: 'Provider is required'
  },
  displayName: {
    type: String,
    trim: true,
    default: 'Anon'
  },
  username: {
    type: String,
    unique: 'Username already exists.',
    required: 'Please enter a username',
    trim: true
  },
  name: {
    familyName: {
      type: String,
      trim: true
    },
    givenName: {
      type: String,
      trim: true
    },
    middleName: {
      type: String,
      trim: true
    }
  },
  email: {
    type: String,
    trim: true,
    required: 'Please enter an email',
    unique: 'Email already exists.'
  },
  password: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  },
  salt: {
    type: String
  },
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user']
  }
});

PersonModel.pre('save', function (next) {
  if (this.password && this.password.length > 6) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

PersonModel.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
  }
  return password;
};

PersonModel.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};

mongoose.model('Person', PersonModel);
