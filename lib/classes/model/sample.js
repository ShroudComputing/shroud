'use strict';

const Model = require('../model.js');

exports = module.exports = (function () {
  class SampleModel extends Model {
    constructor() {
      super();
    }
    static getIdentifier() {
      return 'sample model';
    }
  }

  return SampleModel;
}());