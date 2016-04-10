'use strict';

module.exports = function (Controller) {
  return class Service extends Controller {
    constructor() {
      super();
    }
  };
};

module.exports['@name'] = 'shroud:class:service';
module.exports['@require'] = ['shroud:class:controller'];