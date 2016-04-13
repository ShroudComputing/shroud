'use strict';

const util = require('util');

const Attribute = require('./classes/attribute.js');
const Mongo = require('./classes/mongo.js');

exports = module.exports = (function () {
  const _config = Symbol('config');
  const _mongo = Symbol('mongo');
  const _attributes = Symbol('attributes');

  class Shroud {
    constructor(config) {
      this[_config] = config || {};
    }

    start() {
      return Promise.all([
        this.mongo()
      ]).catch(this.handleError);
    }
    mongo() {
      if (!this[_mongo]) {
        this[_mongo] = new Mongo(this[_config].database);
        return this[_mongo].connect();
      }
      return new Promise(function(resolve) {
        resolve();
      });
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

    handleError(error) {
      // @todo
      util.log(error);
    }
  }

  return Shroud;
}());