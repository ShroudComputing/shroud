const internals = {};

internals.ComponentManager = function() {

};

internals.ComponentManager.prototype.load = function() {

  return this;
};

internals.ComponentManager.prototype.loadDir = function(dir) {

  return this; // return component
};

internals.ComponentManager.prototype.add = function(component) {
  return this;
};

module.exports = exports = internals.ComponentManager;