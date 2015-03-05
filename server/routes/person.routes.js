'use strict';

var person = require('../controllers/person.controller');

module.exports = function (app) {
  app.route('/person')
    .get(person.list)
    .post(person.create);

  app.route('/person/:personId')
    .get(person.read)
    .put(person.create);

  app.param('personId', person.personById);
};