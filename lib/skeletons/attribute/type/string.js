'use strict';

const AttributeType = require('../type.js');

exports = module.exports = (function () {
  class StringAttributeType extends AttributeType {
    constructor() {
      super();
    }

    getSchemaType() {
      return String;
    }
  }

  return StringAttributeType;
}());