'use strict';

const express = require('express');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const _app = Symbol('app');
const _server = Symbol('server');

module.exports = class Server {

  constructor(app, config) {
    const self = this;
    self[_app] = express();

    self[_app].use(bodyParser.json());
    self[_app].use(bodyParser.json({ type: 'application/vnd.api+json' }));
    self[_app].use(bodyParser.urlencoded({ extended: true }));

    self[_app].use(methodOverride('X-HTTP-Method-Override'));

    // @todo: setup router/routes

    self[_app].get('/', function(req, res) {
      res.send('Hello world!');
    });

    this[_server] = this[_app].listen(config.get('port'), function() {
      console.log('Server listening at %s', self[_server].address().port);
    });
  }
};

module.exports['@name'] = 'shroud:server';
module.exports['@require'] = ['shroud:app', 'shroud:config'];