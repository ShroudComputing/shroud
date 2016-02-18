'use strict';

var program = require('commander');

var pkg = require('../package.json');

program
  .version(pkg.version)
  .option('-v, --verbose', 'enables verbose mode');

program
  .command('install [name]')
  .description('install shroud module')
  .action(function(name) {

  });

exports = module.exports = function() {
  program.parse(process.argv);
};