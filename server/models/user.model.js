// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var crypto = require('crypto');

// var UserSchema = new Schema({
//   username: {
//     type: String,
//     trim: true,
//     unique: 'Username already exists',
//     required: 'Please enter a username'
//   },
//   email: {
//     type: String,
//     trim: true,
//     default: '',
//     validate: [validateLocalStrategyProperty, 'Please fill in your email'],
//     match: [/.+\@.+\..+/, 'Please fill a valid email address']
//   },
//   password: {
//     type: String,
//     default: ''
//   },
//   updated: {
//     type: Date
//   },
//   created: {
//     type: Date,
//     default: Date.now
//   },
//   provider: {
//     type: String,
//     require: 'Please enter a provider'
//   },
//   roles: {
//     type: [{
//       type: String,
//       enum: ['user', 'admin']
//     }],
//     default: ['user']
//   }
// });