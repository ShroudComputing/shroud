'use strict';

const nconf = require('nconf');

const defaults = {
  port: 8321
};

module.exports = function() {
  nconf
    .argv()
    .env()
    .file({
      file: 'config.json'
    })
    .defaults(defaults);
  return nconf;
};

module.exports['@name'] = 'shroud:config';