'use strict';

const gulp = require('gulp');

module.exports = function(task, exec) {
  gulp.task(task.name, task.depends, function() {
    return exec(task);
  });
};