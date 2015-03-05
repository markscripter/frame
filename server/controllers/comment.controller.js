'use strict';

var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var _ = require('lodash');

module.exports.create = function (req, res) {
  var comment = new Comment(req.body);

  comment.save(function (err, com) {
    if (err) {
      res.status(400).send({
        message: "error"
      });
    } else {
      res.json(com);
    }
  });
};

module.exports.read = function (req, res) {
  res.json(req.comment);
};

module.exports.list = function (req, res) {
  console.log('IP: ' + req.ip);
  Comment.find().exec(function (err, comments) {
    if (err) {
      res.status(400).send({
        message: err
      });
    } else {
      res.json(comments);
    }
  });
};

module.exports.commentById = function (req, res, next, id) {
  Comment.findById(id).exec(function (err, comment) {
    if (err) {
      return next(err);
    }
    if (!comment) {
      return res.status(400).send({
        message: 'Comment not found'
      });
    }
    req.comment = comment;
    next();
  });
};