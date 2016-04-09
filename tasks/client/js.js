'use strict';

const gutil = require('gulp-util');
const jsmin = require('gulp-jsmin');
const rename = require('gulp-rename');

//const babel = require('gulp-babel');

module.exports = function(src, options) {
  return src
  //.pipe(babel({
  //  presets: ['es2015']
  //}))
    .pipe(options.minify ? jsmin() : gutil.noop())
    .pipe(options.minify ? rename({suffix: '.min'}) : gutil.noop());
};