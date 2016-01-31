const internals = {};

internals.Registry = function () {
  this.clear();
};

internals.Registry.prototype.add = function(name, dependencies, reference) {
  if (this.components[name] !== undefined) {
    throw new Error('Component ' + name + ' is already registered. Use swap() instead.');
  }
  var component = {
    name: name,
    depends: dependencies,
    instance: null
  };
  if (typeof component === 'function') {
    if (reference.length !== dependencies.length) {
      throw new Error('Component ' + name + ' factory function arguments don\'t match the passed dependencies');
    }
    component.factory = reference;
  } else {
    if (dependencies.length > 0) {
      throw new Error('Component ' + name + ' registered with dependencies without factory')
    }
    component.instance = reference;
  }
  this.components[name] = component;
};

internals.Registry.prototype.get = function(componentName) {
  var component = this.components[componentName];
  if (typeof component === 'undefined') {
    throw new Error('Component ' + componentName + ' not found');
  }
  if (!component.instance) {
    var dependencies = this.getDependencies(component);
    component.instance = component.factory.apply(null, dependencies)
  }
  return component.instance;
};

internals.Registry.prototype.remove = function(name) {
  var component = this.components[name];
  if (typeof component === 'undefined') {
    return;
  }
  if (component.instance) {
    throw new Error('Component ' + name + ' was already instantiated');
  }
  delete this.components[name];
};

internals.Registry.prototype.swap = function(componentName, dependencies, reference) {
  this.remove(componentName);
  this.add(componentName, dependencies, reference);
};

internals.Registry.prototype.clear = function() {
  this.components = {};
};

internals.Registry.prototype.getDependencies = function(component) {
  var self = this;
  var res = [];
  component.depends.forEach(function(dependency) {
    if (dependency === component.name) {
      throw new Error('Component ' + dependency + ' can\'t depend on itself');
    }
    res.push(self.get(dependency));
  });
};

module.exports = exports = internals.Registry;