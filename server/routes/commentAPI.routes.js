'use strict';

var appRoot = require('app-root-path');
var comment = require('../controllers/comment.controller');

module.exports = function (app) {
  app.route('/api/comments')
    .get(comment.list)
    .post(comment.create);

  app.route('/api/comments/:commentId')
    .get(comment.read)
    .put(comment.create);

  app.param('commentId', comment.commentById);
};