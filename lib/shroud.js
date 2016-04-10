'use strict';

const path = require('path');
const util = require('util');

const Factory = require('./factory.js');

const registry = [
  'app.js',
  'config.js',
  'router.js',
  'server.js'
];

module.exports = class Shroud {
  constructor() {
    const self = this;

    const factory = new Factory();
    self.rootDir = __dirname;

    registry.forEach(function(component) {
      if (util.isArray(component)) {
        component = path.join.apply(path, component);
      }
      factory.registerComponent(require(path.join(self.rootDir, component)));
    });

    factory.getComponent('shroud:app').start();
  }
};