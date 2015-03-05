'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonModel = new Schema({
  firstName: String,
  lastName: String,
  age: Number
});

mongoose.model('Person', PersonModel);