'use strict';

const util = require('util');

exports = module.exports = (function () {

  class Registry {
    // @todo: Better naming
    addOrGet(identifier, object, type) {
      // @todo: Add possibility to name an object
      const self = this;
      return new Promise(function(resolve, reject) {
        if (!self[identifier]) {
          self[identifier] = {};
        }
        const registry = self[identifier];
        let name;
        // @todo: Improve reject reasons
        switch (typeof object) {
          case 'string':
            name = object;
            if (!registry[name]) {
              return reject(util.format('No object found for %s in registry for %s', name, identifier));
            }
            break;
          case 'function':
            if (!object.name) {
              return reject(util.format('object has to be a named function'));
            }
            name = object.name;
            if (registry[name]) {
              return reject(util.format('object %s is already registered in registry for %s', name, identifier));
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
  }

  return Registry;
}());