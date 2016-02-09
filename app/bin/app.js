const util = require('util');

const EventEmitter = require('events').EventEmitter;

const Container = require(__shroud.require('util/container.js'));

const internals = {};

internals.App = function() {
  EventEmitter.call(this);
  Container.call(this);
};

util.inherits(internals.App, EventEmitter);
util.inherits(internals.App, Container);

module.exports = exports = internals.App;