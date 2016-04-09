'use strict';

const path = require('path');

const nconf = require('nconf');
nconf
  .argv()
  .env()
  .file({
    file: 'config.json'
  });

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
      // @todo: Array component paths
      factory.registerComponent(require(path.join(self.rootDir, component)));
    });

    factory.getComponent('shroud:app').start();
  }
};