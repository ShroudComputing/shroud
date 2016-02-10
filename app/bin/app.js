const assert = require('assert');
const nconf = require('nconf');
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

internals.App.prototype.init = function() {
  this.setupConfig().validateConfig();
};

internals.App.prototype.setupConfig = function() {
  nconf
    .argv()
    .env()
    .file(__shroud.path.resolve('etc/config.json'));
  return this;
};

internals.App.prototype.validateConfig = function() {
  // @todo: Validate needed config values using assert
  return this;
};

module.exports = exports = internals.App;