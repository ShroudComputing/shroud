'use strict';

var log4js = require('log4js');

var nconf = require('nconf');

var childProcess = require('child_process');
var app = require('shroud-app');

nconf.argv().env().file({file: 'etc/config.json'});

var internals = {};

internals.Shroud = function() {
  this.loadLogger();
  this.loadModules();
};

internals.Shroud.prototype.loadLogger = function() {
  log4js.configure('etc/log4js.json');
  this.logger = log4js.getLogger();
  this.logger.setLevel(nconf.get('logging:level'));
/*
  internals.logger.trace('trace');
  internals.logger.debug('debug');
  internals.logger.info('info');
  internals.logger.warn('warn');
  internals.logger.error('error');
  internals.logger.fatal('fatal');
  */
};

internals.Shroud.prototype.loadModules = function() {
  var self = this;
  self.modules = {};
  childProcess.exec('npm ls --json', function(err, stdout) {
    var modules = JSON.parse(stdout)['dependencies'];
    Object.keys(modules).forEach(function(key) {
      if (key.startsWith('shroud-')) {
        self.modules[key.substring(7, key.length)] = require(key);
      }
    });
  });
};

exports = module.exports = new internals.Shroud();