const path = require('path');
const winston = require('winston');

const internals = {};

internals.logDir = path.join(__shroud.path.base, 'var', 'log');

internals.config = {};
internals.config.levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  trace: 5
};

internals.config.colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  verbose: 'blue',
  debug: 'magenta', // @todo: Unable to colorize debug?
  trace: 'gray'
};
winston.config.shroud = internals.config;

internals.console = new winston.transports.Console({
  name: 'console',
  level: 'trace', // @todo: Configurable
  handleExceptions: true,
  colorize: true,
  colors: internals.config.colors,
  timestamp: function() {
    return new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
  },
  formatter: function(options) {
    var prefix =  '[' + options.level.toUpperCase() + ' ' + options.timestamp() + '] ';
    var message = (undefined !== options.message ? options.message : '');
    var meta = (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
    var output = prefix + message + meta;
    if (!options.json && options.colorize) {
      output = winston.config.colorize(options.level, output);
    }
    return output;
  }
});

internals.logger = new winston.Logger({
  levels : internals.config.levels,
  colors: internals.config.colors,
  transports: [
    internals.console
  ]
});

internals.logger.add(winston.transports.File, {
  name: 'file/error',
  level: 'error',
  filename: path.join(internals.logDir, 'error.log'),
  handleExceptions: true
});

internals.logger.add(winston.transports.File, {
  name: 'file/system',
  level: 'info',
  filename: path.join(internals.logDir, 'system.log')
});

module.exports = exports = internals.logger;