'use strict';

// @todo update website in package.json when changing branch

const nconf = require('nconf');

const Shroud = require('./lib/shroud.js');

exports = module.exports = (function() {
  nconf.argv().env().file({file: 'etc/config.json'});

  return new Shroud(nconf.get()).start();
} ());