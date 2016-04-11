'use strict';

const BaseRenderer = require('./base.js');

exports = module.exports = (function() {
  class DocumentRenderer extends BaseRenderer {
    constructor() {
      super();
    }
  }

  return DocumentRenderer;
} ());