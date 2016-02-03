const util = require('util');

const EventEmitter = require('events').EventEmitter;

const internals = {};

internals.App = function() {
  EventEmitter.call(this);
};

util.inherits(internals.App, EventEmitter);

module.exports = exports = internals.App;