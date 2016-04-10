'use strict';

const server = require('gulp-develop-server');

module.exports = function() {
  server.restart();
};