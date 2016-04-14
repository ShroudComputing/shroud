'use strict';

// @todo update website in package.json when changing branch

const nconf = require('nconf');

const Shroud = require('./shroud.js');

exports = module.exports = (function() {
  nconf.argv().env().file({file: 'etc/config.json'});

  const app = new Shroud(nconf.get());
  app.start();

  return app;
} ());