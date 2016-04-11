'use strict';

const gulp = require('gulp');

const eslint = require('gulp-eslint');
const server = require('gulp-develop-server');

const source = ['**/*.js','!node_modules/**'];

gulp.task('dev', ['lint', 'server:start'], function() {
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