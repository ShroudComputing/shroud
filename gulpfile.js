'use strict';

const util = require('util');

const gulp = require('gulp');

const server = require('gulp-develop-server');

const tasks = require('./tasks.json');
const watchTasks = [];
const keys = ['type', 'require'];

const types = {
  stream: {
    require: require('./tasks/stream.js'),
    keys: ['dest', 'src', 'require']
  },
  task: {
    require: require('./tasks/task.js'),
    keys: ['require']
  }
};

Object.keys(tasks).forEach(function(name) {
  const task = tasks[name];
  if (task.disable) {
    return;
  }
  task.name = name;

  const type = types[task.type];

  type.keys.forEach(function(key) {
    if (!(key in task)) {
      throw new Error(util.format('Task %s doesn\'t have required property %s.', name, key));
    }
  });

  const exec = require(task.require);
  const watch = type.require(task, exec);
  if (watch) {
    watch.forEach(function (watchTask) {
      watchTasks.push(watchTask);
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