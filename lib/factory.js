'use strict';
const util = require('util');

class Factory {

  constructor() {
    this.components = {};
    this.registerInstance(module.exports['@name'], this);
  }

  registerFunction(name, dependencies, constructor) {
    const component = {};

    component.name = name;
    if (!component.name) {
      throw new Error('The registered Component must have a name.');
    }
    if (component.name in this.components) {
      throw new Error(util.format('Component %s is already registered.', component.name));
    }

    component.constructor = constructor;
    if (!util.isFunction(component.constructor)) {
      throw new Error(util.format('Component %s must have a constructor.', component.name));
    }

    component.dependencies = dependencies;
    if (util.isString(component.dependencies)) {
      component.dependencies = [component.dependencies];
    }

    if (component.constructor.length !== component.dependencies.length) {
      throw new Error(util.format(
        'Component %s constructor doesn\'t match the passed dependencies (%s !== %s).',
        component.name,
        component.constructor.length,
        component.dependencies.length
      ));
    }

    this.components[component.name] = component;
  }

  registerComponent(componentInjector) {
    const constructor = typeof componentInjector === 'function' ? componentInjector : componentInjector['@constructor'];
    const name = constructor['@name'] || constructor.name;
    const dependencies = constructor['@require'] || [];
    this.registerFunction(name, dependencies, constructor);
  }

  registerInstance(name, componentInstance) {
    if (!name) {
      throw new Error('The registered Component must have a name.');
    }
    if (!componentInstance) {
      throw new Error('The registered Component instance is not defined.');
    }
    this.components[name] = {
      name: name,
      instance: componentInstance
    };
  }

  getComponent(name) {
    if (!(name in this.components)) {
      throw new Error(util.format('Component %s not found.', name));
    }
    const component = this.components[name];
    if (!component.instance) {
      const constructor = component.constructor;
      const dependencies = this.getDependencies(component);

      if (/^class\s/.test(constructor.toString())) {
        dependencies.unshift(null);
        component.instance = new (Function.prototype.bind.apply(component.constructor, dependencies));
        component.instance.prototype = component.constructor.prototype;
      } else {
        component.instance = component.constructor.apply(null, dependencies);
      }

      if (!component.instance) {
        throw new Error(util.format('Component %s has no return value.', name));
      }
    }

    return component.instance;
  }

  getDependencies(component) {
    const self = this;
    const components = [];
    component.dependencies.forEach(function(dependency) {
      if (dependency === component.name) {
        throw new Error(util.format('Component %s can\'t depend on itself.', dependency));
      }
      components.push(self.getComponent(dependency));
    });
    return components;
  }

  listComponents() {
    return Object.keys(this.components);
  }

}

module.exports = Factory;
module.exports['@name'] = 'factory';