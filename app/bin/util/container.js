const internals = {};

internals.Container = function(data) {
  this._data = {};
  if (typeof data === 'object') {
    this.setData(data);
  }
};

internals.Container.prototype.setData = function(key, data) {
  switch (typeof key) {
  case 'object':
    data = key;
    for (key in data) {
      if (!data.hasOwnProperty(key)) {
        continue;
      }
      this._data[key] = data;
    }
    return this;
  case 'string':
    this._data[key] = data;
    return this;
  default:
    throw new Error('Invalid key type. Must be of type object or string');
  }
};

internals.Container.prototype.unsetData = function(key) {
  switch (typeof key) {
  case 'array':
    for (var i = 0; i < key.length; i++) {
      delete this._data[key[i]];
    }
    return this;
  case 'string':
    delete this._data[key];
    return this;
  case 'undefined':
    this._data = {};
    return this;
  default:
    throw new Error('Invalid key type. Must be of type array, string or undefined');
  }
};

internals.Container.prototype.getData = function(key, defaultData) {
  switch (typeof key) {
  case 'array':
    var data = [];
    for (var i = 0; i < key.length; i++) {
      data.push(this.hasData(key) ? this._data(key) : defaultData);
    }
    return data;
  case 'string':
    return this.hasData(key) ? this._data[key] : defaultData;
  case 'undefined':
    return this._data;
  default:
    throw new Error('Invalid key type. Must be of type array, string or undefined');
  }
};

internals.Container.prototype.hasData = function(key) {
  return this._data.hasOwnProperty(key);
};

module.exports = exports = internals.Container;