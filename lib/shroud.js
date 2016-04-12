'use strict';

const async = require('async');
const util = require('util');

const Attribute = require('./classes/attribute.js');
const Mongo = require('./classes/mongo.js');

exports = module.exports = (function () {
  const _config = Symbol('config');
  const _mongo = Symbol('mongo');
  const _attributes = Symbol('attributes');

  class Shroud {
    constructor(config, callback) {
      this[_config] = config || {};
      this.start(function() {
        // @todo
        callback && callback();
      });
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

    attribute(name, attribute) {
      if (typeof this[_attributes] === 'undefined') {
        this[_attributes] = {};
      }
      if (typeof attribute !== 'undefined') {
        if (typeof this[_attributes][name] !== 'undefined') {
          // @todo: Add possibility to override of same type?
          throw new Error(util.format('attribute %s is already registered', name));
        }
        if (!(attribute instanceof Attribute)) {
          throw new Error('attribute has to be of type Attribute');
        }
        this[_attributes][name] = attribute;
      }
      return this[_attributes][name];
    }
  }

  return Shroud;
}());