'use strict';

const gutil = require('gulp-util');

const babel = require('gulp-babel');

// @todo: Need to fix output paths

module.exports = function(src, options) {
  return src
  .pipe(options.transpile
    ? babel({
      presets: ['es2015']
    })
    : gutil.noop()
  );
};