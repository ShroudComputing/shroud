'use strict';

const async = require('async');
const util = require('util');

const Mongo = require('./classes/mongo.js');

exports = module.exports = (function () {
  const _config = Symbol('config');
  const _mongo = Symbol('mongo');

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
            self._mongo(next, self);
          }
        ],
        callback
      );
    }
    mongo(callback) {
      return this._mongo(callback, this);
    }
    _mongo(callback, context) {
      // @todo: validate
      if (!context[_mongo]) {
        context[_mongo] = new Mongo(this[_config].database);
        context[_mongo].connect(callback);
        return context[_mongo];
      }
      callback && callback(null, context[_mongo]);
      return context;
    }
  }

  return Shroud;
}());