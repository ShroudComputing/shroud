#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

const internals = {};

internals.root = path.dirname(__dirname);

// @todo: symlink all directories from ~/lib/ and ~/opt/ to ~/node_modules/

internals.symlinkDir = function(directory) {
  fs.readdir(directory, function(err, files) {
    if (err) {
      throw err;
    }
    internals.checkFiles(directory, files);
  });
};

internals.checkFiles = function(directory, files) {
  files.forEach(function(file) {
    internals.checkFile(path.join(directory, file));
  });
};

internals.checkFile = function(file) {
  fs.stat(file, function(err, stats) {
    if (err) {
      throw err;
    }
    if (stats.isDirectory()) {
      internals.createSymlink(file);
    }
  });
};

internals.createSymlink = function(file) {
  console.log(path.basename(file));
  fs.symlink(
    path.join(file),
    path.join(internals.root, 'etc', path.basename(file)),
    'dir',
    function(err) {
      if (err) {
        throw err;
      }
    }
  );
};

internals.symlinkDir(path.join(internals.root, 'lib'));