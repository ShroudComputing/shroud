'use strict';

module.exports = class App {

  constructor(Service) {
    const self = this;
    self.rootDir = __dirname;

    self.service = new Service();
  }

  start() {
    this[_factory].getComponent('shroud:server');
  }

};

module.exports['@name'] = 'shroud:app';
module.exports['@require'] = ['shroud:class:service'];