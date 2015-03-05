var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  author: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Comment', CommentSchema);