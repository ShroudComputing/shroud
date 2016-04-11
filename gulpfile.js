'use strict';

const url = require('url');
const util = require('util');

const pkg = require('./package.json');

const gulp = require('gulp');

const eslint = require('gulp-eslint');
const server = require('gulp-develop-server');
const todo = require('gulp-todo');

const source = ['**/*.js','!node_modules/**'];

gulp.task('dev', ['lint', 'doc', 'server:start'], function() {
  gulp.watch(source, ['lint', 'doc', 'server:restart']);
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
    .pipe(todo({
      transformComment: function(file, line, text) {
        let columns = [];
        const urlpath = url.resolve(pkg.homepage, file).toString();
        const filepath = urlpath.substring(pkg.homepage.length);

        columns.push(null);
        columns.push(util.format('[%s](%s)', filepath, urlpath));
        columns.push(util.format('[%s](%s#%s)', line, urlpath, line));
        if (text) {
          columns.push(text);
        }
        return columns.join('|');
      }
    }))
    .pipe(gulp.dest('./doc'));
});

gulp.task('doc', ['todo']);