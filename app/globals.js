const path = require('path');

const internals = {};

internals.path = {};
internals.path.base = __dirname;
internals.path.bin = path.join(internals.path.base, 'bin');

internals.require = function(requirePath) {
  return path.join(internals.path.bin, requirePath);
};

module.exports = exports = internals;