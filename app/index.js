const path = require('path');
const util = require('util');

global.__shroud = path.join(__dirname, 'bin') + path.sep;

const App = require(path.join(__shroud, 'app.js'));
const Container = require(__shroud + 'util/container.js');

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
    // @todo: remove return
    return this.setData('app', new App());
  }
  return this.getData('app');
};

module.exports = exports = new internals.Shroud();