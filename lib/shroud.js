'use strict';

const util = require('util');

const Attribute = require('./classes/attribute.js');
const Model = require('./classes/model.js');

const Mongo = require('./classes/mongo.js');

exports = module.exports = (function () {
  const _config = Symbol('config');
  const _mongo = Symbol('mongo');
  const _attributes = Symbol('attributes');
  const _models = Symbol('model');

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

    attribute(attribute) {
      return this._registry(_attributes, attribute, Attribute);
    }

    model(model) {
      return this._registry(_models, model, Model);
    }

    _registry(symbol, object, type) {
      return new Promise(function(resolve, reject) {
        if (!this[symbol]) {
          this[symbol] = {};
        }
        const registry = this[symbol];
        let name;
        // @todo: Improve reject reasons
        switch (typeof object) {
          case 'string':
            name = object;
            if (!registry[name]) {
              return reject(util.format('No object found for %s in _registry for %s', name, symbol));
            }
            break;
          case 'function':
            if (!object.name) {
              return reject(util.format('object has to be a named function'));
            }
            name = object.name;
            if (registry[name]) {
              return reject(util.format('object %s is already registered in _registry for %s', name, symbol));
            }
            if (!(object.prototype instanceof type)) {
              return reject(util.format('object has to be of type %s', type.name));
            }
            break;
          default:
            return reject(util.format('invalid object type.'));
        }
        return resolve(registry[name]);
      });
    }

    handleError(error) {
      // @todo
      util.log(error);
    }
  }

  return Shroud;
}());