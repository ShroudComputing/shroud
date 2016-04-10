'use strict';

const _config = Symbol('config');
const _factory = Symbol('factory');

module.exports = class App {

  constructor(config, factory) {
    const self = this;
    self.rootDir = __dirname;

    this[_config] = config;
    this[_factory] = factory;
  }

  start() {
    this[_factory].getComponent('shroud:server');
  }

};

module.exports['@name'] = 'shroud:app';
module.exports['@require'] = ['shroud:config', 'factory'];