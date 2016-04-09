'use strict';

const nconf = require('nconf');

module.exports = function() {
  nconf
    .argv()
    .env()
    .file({
      file: 'config.json'
    })
    .defaults({
      port: 8321
    });
  return nconf;
};

module.exports['@name'] = 'shroud:config';