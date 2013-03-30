describe('mongoUtil -> ', function() {
  var config = require('../../config.json')
    , mongoUtil = require('../../models/util/mongoUtil');

  var mongoPrefix = 'mongodb://';

  it('should build the mongo connection string for the config mode', function() {

    var dbc = config.db[config.mode];
    var conn = mongoPrefix;
    if (dbc.user) { conn += dbc.user + ':' + dbc.pw + '@'; }
    conn += dbc.host;
    if (dbc.port) { conn += ':' + dbc.port; }
    conn += '/' + dbc.name;

    expect(mongoUtil.buildConnection()).toBe(conn);

  });

  it('should build the mongo connection string for the passed mode', function() {

    var dbc = config.db['test'];
    var conn = mongoPrefix;
    if (dbc.user) { conn += dbc.user + ':' + dbc.pw + '@'; }
    conn += dbc.host;
    if (dbc.port) { conn += ':' + dbc.port; }
    conn += '/' + dbc.name;

    expect(mongoUtil.buildConnection('test')).toBe(conn);

  });

});