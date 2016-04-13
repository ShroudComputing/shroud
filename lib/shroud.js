'use strict';

const util = require('util');

const Attribute = require('./classes/attribute.js');
const Model = require('./classes/model.js');

const SampleModel = require('./classes/model/sample.js');

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
      const self = this;
      return Promise.all([
        self.mongo().then(function() {
          self.models();
        })
      ]).then(function() {
        util.log('Started shroud');
      }).catch(this.handleError);
    }

    mongo() {
      const self = this;
      if (!self[_mongo]) {
        self[_mongo] = new Mongo(self[_config].database);
        return self[_mongo].connect();
      }
      return new Promise(function(resolve) {
        resolve(self[_mongo]);
      });
    }

    models() {
      const self = this;
      return Promise.all([
        // @todo: Dynamically register Models
        self.model(SampleModel)
      ]);
    }

    attribute(attribute) {
      return this._registry(_attributes, attribute, Attribute);
    }

    model(model) {
      return this._registry(_models, model, Model);
    }

    _registry(symbol, object, type) {
      // @todo: Add possibility to name an object
      const self = this;
      return new Promise(function(resolve, reject) {
        if (!self[symbol]) {
          self[symbol] = {};
        }
        const registry = self[symbol];
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
            registry[name] = object;
            break;
          default:
            return reject(util.format('invalid object type.'));
        }
        return resolve(registry[name]);
      });
    }

    handleError(error) {
      // @todo
      util.log('An error occured');
      util.log(error);
    }
  }

  return Shroud;
}());