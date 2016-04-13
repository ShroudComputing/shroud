'use strict';

const EmbeddedDocument = require('camo').EmbeddedDocument;

exports = module.exports = (function () {
  class Attribute extends EmbeddedDocument {
    constructor() {
      super();
      // @todo
    }
  }

  return Attribute;
}());