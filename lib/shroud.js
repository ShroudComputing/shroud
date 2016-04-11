'use strict';

const async = require('async');

const Mongo = require('./classes/mongo.js');

exports = module.exports = (function () {
  const _config = Symbol('config');

  class Shroud {
    constructor(config) {
      this[_config] = config || {};
      this.start(function() {

      });
      // @todo
    }

    start(callback) {
      const self = this;
      callback = callback || function() {};
      async.parallel(
        [
          function(next) {
            self.connectMongo(next, self);
          }
        ],
        callback
      );
    }
    connectMongo(callback, context) {
      if (!context.mongo) {
        context.mongo = new Mongo(this[_config].database);
        context.mongo.connect(callback);
        return context.mongo;
      }
      callback && callback(null, this.mongo);
      return context.mongo;
    }
  }

  return Shroud;
}());