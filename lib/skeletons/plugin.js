'use strict';

const EventEmitter = require('events').EventEmitter;

exports = module.exports = (function () {
  class Plugin {
    constructor() {
      this._events = new EventEmitter();
      // @todo: move this to plugin loader
      this._events.emit('init');
      this.init();
      this._events.emit('post-init');

      this._events.emit('enable');
      this._events.emit('post-enable');
    }
    init() {
      // Empty
    }
  }

  return Plugin;
}());