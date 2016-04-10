'use strict';

const path = require('path');

const async = require('async');
const recursive = require('recursive-readdir');

const Factory = require('./factory.js');

module.exports = function() {
  const internals = {};
  const factory = new Factory();

  internals.supplyFactory = function(callback) {
    async.nextTick(
      function() {
        recursive(path.join(__dirname, 'includes'), function (err, files) {
          if (err) {
            return callback(err);
          }

          async.each(
            files,
            function(file, next) {
              factory.registerComponent(require(file));
              return next();
            },
            callback
          );
        });
      }
    );
  };

  internals.start = function(callback) {
    factory.getComponent('shroud:webserver');
    return callback();
  };

  return class Shroud {
    constructor(callback) {
      const self = this;
      callback = callback || function() {};
      self.rootDir = __dirname;
      async.series(
        [
          internals.supplyFactory,
          internals.start
        ],
        callback
      );
    }
  };
};