const Registry = require(__shroud + 'util/registry.js');

var internals = {};

internals.ComponentRegistry = function () {
  this.components = new Registry();
};

internals.ComponentRegistry.prototype.getComponent = function () {

};

internals.ComponentRegistry.prototype.getModule = function() {

};

module.exports = exports = internals.ComponentRegistry;