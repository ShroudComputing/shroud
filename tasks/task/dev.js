'use strict';

const util = require('util');

const gulp = require('gulp');

const server = require('gulp-develop-server');

module.exports = function(task) {
  if (!task.src) {
    throw new Error(util.format('Task %s doesn\'t have required property %s.', task.name, 'src'));
  }
  server.listen({
    file: task.options.file
  });
  gulp.watch(task.src, ['shroud:restart']);
};