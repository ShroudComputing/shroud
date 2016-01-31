const path = require('path');
const util = require('util');

const EventEmitter = require('events').EventEmitter;

global.__shroud = path.join(__dirname, 'bin') + path.sep;

const Registry = require(__shroud + 'registry.js');

const internals = {};

internals.App = function() {
  EventEmitter.call(this);
  this.components = new Registry();
};

util.inherits(internals.App, EventEmitter);

internals.App.prototype.init = function() {

};

module.exports = exports = new internals.App();