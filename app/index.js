const path = require('path');
const util = require('util');

const EventEmitter = require('events').EventEmitter;

global.__shroud = path.join(__dirname, 'bin') + path.sep;

const ComponentRegistry = require(__shroud + 'component/registry.js');

const internals = {};

internals.App = function() {
  EventEmitter.call(this);
  ComponentRegistry.call(this);
};

util.inherits(internals.App, EventEmitter);
util.inherits(internals.App, ComponentRegistry);

internals.App.prototype.init = function() {

};

module.exports = exports = new internals.App();