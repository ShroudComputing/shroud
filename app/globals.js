const path = require('path');

const internals = {};

internals.path = {};
internals.path.base = __dirname;
internals.path.resolve = function(dir) {
  return path.join(internals.path.base, dir);
};
internals.path.bin = internals.path.resolve('bin');

internals.require = function(requirePath) {
  return path.join(internals.path.bin, requirePath);
};

module.exports = exports = internals;