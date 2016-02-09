const util = require('util');

global.__shroud = require('./globals.js');

const App = require(__shroud.require('app.js'));
const Container = require(__shroud.require('util/container.js'));

const internals = {};

internals.Shroud = function() {
  Container.call(this);
};

util.inherits(internals.Shroud, Container);

internals.Shroud.prototype.init = function() {
  this.app();
};

internals.Shroud.prototype.app = function() {
  if (!this.hasData('app')) {
    this.setData('app', new App());
  }
  return this.getData('app');
};

module.exports = exports = new internals.Shroud();