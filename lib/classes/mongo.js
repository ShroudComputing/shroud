'use strict';

const mongoose = require('mongoose');
const util = require('util');

//const Model = require('./model.js');

exports = module.exports = (function () {
  const _host = Symbol('host');
  const _port = Symbol('port');
  const _database = Symbol('database');
  const _options = Symbol('options');

  class Mongo {
    constructor(config) {
      // @todo: validate
      config = config || {};
      this[_host] = config.host || 'localhost';
      this[_port] = config.port || false;
      this[_database] = config.database || '';
      this[_options] = config.options || {};
    }

    connect(callback) {
      let port = this[_port] ? ':' + this[_port] : '';
      const uri = 'mongodb://' + this[_host] + port + '/' + this[_database];
      util.log('connecting to %s', uri);
      callback
        ? mongoose.createConnection(uri, this[_options], callback)
        : mongoose.createConnection(uri, this[_options]);
      return this;
    }
  }

  return Mongo;
}());