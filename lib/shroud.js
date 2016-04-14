'use strict';

const util = require('util');

const Attribute = require('./classes/attribute.js');
const Model = require('./classes/model.js');

const Mongo = require('./classes/mongo.js');

const Registry = require('./classes/registry.js');

exports = module.exports = (function () {
  const _config = Symbol('config');
  const _mongo = Symbol('mongo');
  const _attributes = Symbol('attributes');
  const _models = Symbol('model');
  const _registry = Symbol('registry');

  class Shroud {
    constructor(config) {
      this[_config] = config || {};
      this[_registry] = new Registry();
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
      return Promise.all([
        // @todo: Dynamically register Models
      ]);
    }

    attribute(attribute) {
      return this._registry(_attributes, attribute, Attribute);
    }

    model(model) {
      return this._registry(_models, model, Model);
    }

    _registry(identifier, object, type) {
      return this[_registry].addOrGet(identifier, object, type);
    }

    handleError(error) {
      // @todo
      util.log('An error occured');
      util.log(error);
    }
  }

  return Shroud;
}());