#! /usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');

var util = require('util');
var childProcess = require('child_process');

var internals = {};

internals.root = path.dirname(__dirname);

internals.installModules = function(directory) {
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
      internals.installModule(file);
    }
  });
};

internals.installModule = function(file) {
  childProcess.exec('npm install ' + file, function(err, stdout, stderr) {
    if (err) {
      throw err;
    }
  });
};

internals.installModules(path.join(internals.root, 'lib'));
internals.installModules(path.join(internals.root, 'opt'));