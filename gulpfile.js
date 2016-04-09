'use strict';

const util = require('util');

const gulp = require('gulp');

const plumber = require('gulp-plumber');

const tasks = require('./tasks.json');
const watchTasks = [];
const keys = ['dest', 'src', 'require'];

Object.keys(tasks).forEach(function(name) {
  const task = tasks[name];
  keys.forEach(function(key) {
    if (!(key in task)) {
      throw new Error(util.format('Task %s doesn\'t have required property %s.', name, key));
    }
  });
  if (task.disable) {
    return;
  }
  task.depends = task.depends || [];
  task.options = task.options || {};
  const exec = require(task.require);

  gulp.task(name, task.depends, function() {
    const src = gulp.src(task.src)
      .pipe(plumber());
    return exec(src, task.options)
      .pipe(gulp.dest(task.dest));
  });
  if (task.options.watch) {
    watchTasks.push({
      name: name,
      src: task.src
    });
  }
});

gulp.task(
  'watch',
  watchTasks.map(function(task) {
    return task.name;
  }),
  function() {
    watchTasks.forEach(function(task) {
      gulp.watch(task.src, [task.name]);
    });
  }
);