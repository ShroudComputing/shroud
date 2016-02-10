const util = require('util');

global.__shroud = require('./globals.js');

const App = require(__shroud.require('app.js'));

module.exports = exports = new App();