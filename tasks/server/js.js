'use strict';

const gutil = require('gulp-util');

const babel = require('gulp-babel');

module.exports = function(src, options) {
  console.log('server/js');
  return src
  .pipe(options.transpile
    ? babel({
      presets: ['es2015']
    })
    : gutil.noop()
  );
};