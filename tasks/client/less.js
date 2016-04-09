'use strict';

const path = require('path');

const filter = require('gulp-filter');
const less = require('gulp-less');
const rename = require('gulp-rename');

// @todo: gulp-autoprefixer

const ignoreEmpty = function() {
  return filter(function (file) {
    return file.stat && file.contents.length;
  });
};

module.exports = function(src) {
  return src
    .pipe(less())
    .pipe(ignoreEmpty())
    .pipe(rename(function (file) {
      file.dirname = path.join(path.dirname(file.dirname), 'css');
    }));
};