'use strict';

const util = require('util');

const camo = require('camo');

//const Model = require('./model.js');

exports = module.exports = (function () {
  const _host = Symbol('host');
  const _port = Symbol('port');
  const _database = Symbol('database');
  const _user = Symbol('user');
  const _password = Symbol('password');

  class Mongo {
    constructor(config) {
      // @todo: validate
      config = config || {};
      this[_host] = config.host || 'localhost';
      this[_port] = config.port || 27017;
      this[_database] = config.database || '';
      this[_user] = config.user || false;
      this[_password] = config.password || false;
    }

    connect() {
      let auth = '';
      if (this[_user] && this[_password]) {
        auth = this[_user] + ':' + this[_password] + '@';
      }
      const uri = 'mongodb://' + auth + this[_host] + ':' + this[_port] + '/' + this[_database];
      util.log('connecting to %s', uri);
      return camo.connect(uri);
    }
  }

  return Mongo;
}());