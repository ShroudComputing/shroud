var path = require('path');

global.__shroud = path.join(__dirname, 'bin') + path.sep;

var Registry = require(__shroud + 'registry.js');

var internals = {};

internals.App = function() {

  this.components = new Registry();
};

internals.App.prototype.init = function() {

};

module.exports = exports = new internals.App();