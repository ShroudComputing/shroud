'use strict';

const gulp = require('gulp');

const plumber = require('gulp-plumber');

module.exports = function(task, exec) {
  gulp.task(task.name, task.depends, function() {
    const src = gulp.src(task.src)
      .pipe(plumber());
    return exec(src, task.options)
      .pipe(gulp.dest(task.dest));
  });
};