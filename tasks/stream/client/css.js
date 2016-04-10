'use strict';

const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const gutil = require('gulp-util');

module.exports = function(src, options) {
  return src
    .pipe(options.minify ? cssmin() : gutil.noop())
    .pipe(options.minify ? rename({suffix: '.min'}) : gutil.noop());
};