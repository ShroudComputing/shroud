const internals = {};

internals.Registry = function () {
  this.clear();
};

internals.Registry.prototype.add = function(name, dependencies, reference, aliases) {
  if (this.components[name] !== undefined) {
    throw new Error('Component ' + name + ' is already registered. Use swap() instead.');
  }
  if (this.aliases[name] !== undefined) {
    throw new Error('Alias ' + name + ' is already registered.');
  }
  var component = {
    name: name,
    depends: dependencies,
    instance: null,
    aliases: aliases
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
  if (typeof aliases !== 'undefined') {
    this.alias(name, aliases);
  }
};

internals.Registry.prototype.get = function(name) {
  if (this.aliases[name]) {
    name = this.aliases[name];
  }
  var component = this.components[name];
  if (typeof component === 'undefined') {
    throw new Error('Component ' + name + ' not found');
  }
  if (!component.instance) {
    var dependencies = this.getDependencies(component);
    component.instance = component.factory.apply(null, dependencies)
  }
  return component.instance;
};

internals.Registry.prototype.remove = function(name) {
  var self = this;
  if (this.aliases[name]) {
    name = this.aliases[name];
  }
  var component = this.components[name];
  if (typeof component === 'undefined') {
    return;
  }
  if (component.instance) {
    throw new Error('Component ' + name + ' was already instantiated');
  }
  delete this.components[name];
  component.aliases.forEach(function(alias) {
    delete self.aliases[alias];
  });
};

internals.Registry.prototype.swap = function(name, dependencies, reference) {
  this.remove(name);
  this.add(name, dependencies, reference);
};

internals.Registry.prototype.clear = function() {
  this.components = {};
  this.aliases = {};
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

internals.Registry.prototype.alias = function(name, aliases) {
  var self = this;
  if (typeof aliases === 'string') {
    aliases = [aliases];
  }
  aliases.forEach(function(alias) {
    if (self.components[alias] !== undefined) {
      throw new Error('Component ' + alias + ' is already registered. can\'t create alias for this name.');
    }
    self.aliases[alias] = name;
  });
};

module.exports = exports = internals.Registry;