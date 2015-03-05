var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  category: {
    type: String,
    default: 'Other'
  },
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 1.99
  },
  stocked: {
    type: Boolean,
    default: true
  }
});

mongoose.model('Product', ProductSchema);