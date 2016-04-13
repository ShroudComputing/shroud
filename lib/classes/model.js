'use strict';

const util = require('util');

const Document = require('camo').Document;

const Attribute = require('./attribute.js');

exports = module.exports = (function () {
  const attributes = {};

  class Model extends Document {
    constructor() {
      super();
      if (this.constructor === Model) {
        util.log('Can\'t instantiate Model directly');
        throw new Error('Can\'t instantiate Model directly');
      }
      const self = this;
      const name = this.constructor.name;
      Object.keys(attributes[name]).forEach(function(key) {
        self[key] = attributes[name][key];
      });
    }

    static attribute(name, attribute) {
      if (!attributes[this.name]) {
        attributes[this.name] = {};
      }
      if (attribute.prototype instanceof Attribute) {
        util.log('instanceof Attribute');
        attribute = [attribute];
      }
      attributes[this.name][name] = attribute;
      return this;
    }
  }

  return Model;
}());