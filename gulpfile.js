'use strict';

const gulp = require('gulp');

const eslint = require('gulp-eslint');
const server = require('gulp-develop-server');
const todo = require('gulp-todo');

const source = ['**/*.js','!node_modules/**'];

gulp.task('dev', ['lint', 'doc', 'server:start'], function() {
  gulp.watch(source, ['lint', 'server:restart']);
});

gulp.task('server:start', function() {
  server.listen({
    path: 'index.js'
  });
});

gulp.task('server:restart', function() {
  server.restart();
});

gulp.task('lint', function () {
  return gulp.src(source)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('todo', function() {
  gulp.src(source)
    .pipe(todo())
    .pipe(gulp.dest('./doc'));
});

gulp.task('doc', ['todo']);