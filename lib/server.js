'use strict';

const express = require('express');

module.exports = function(_app, config) {
  const app = express();

  app.get('/', function(req, res) {
    res.send('Hello world!');
  });

  const server = app.listen(config.get('port'), function() {
    console.log('Server listening at %s', server.address().port);
  });

  return app;
};

module.exports['@name'] = 'shroud:server';
module.exports['@require'] = ['shroud:app', 'shroud:config'];