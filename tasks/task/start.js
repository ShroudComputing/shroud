'use strict';

const server = require('gulp-develop-server');

module.exports = function(task) {
  server.listen({
    path: task.options.file
  });
};