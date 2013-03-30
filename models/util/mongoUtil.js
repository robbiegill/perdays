
var config = require('../../config.json');

var buildConnection = function(mode) {
  var dbc;

  if (mode) {
    dbc = config.db[mode];
  } else {
    dbc = config.db[config.mode];
  }

  var conn = 'mongodb://';

  if (dbc.user) {
    conn += dbc.user + ':' + dbc.pw + '@';
  }

  conn += dbc.host;

  if (dbc.port) {
    conn += ':' + dbc.port;
  }

  conn += '/' + dbc.name;

  return conn;
};

module.exports = {};
module.exports.buildConnection = buildConnection;