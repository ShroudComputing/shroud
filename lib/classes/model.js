'use strict';

const Document = require('camo').Document;

const Attribute = require.main.require('./classes/attribute.js');

exports = module.exports = (function () {
  const attributes = {};

  class Model extends Document {
    constructor() {
      super();
      if (this.constructor === Model) {
        throw new Error('Can\'t instantiate Model directly');
      }
      const self = this;
      const name = this.constructor.name;
      Object.keys(attributes[name]).forEach(function(key) {
        self[key] = attributes[name][key];
      });
    }

    static attribute(name, attribute) {
      // @todo: Optimize the mapping of attributes?
      if (!attributes[this.name]) {
        attributes[this.name] = {};
      }
      if (attribute.prototype instanceof Attribute) {
        attribute = [attribute];
      }
      attributes[this.name][name] = attribute;
      return this;
    }
  }

  return Model;
}());