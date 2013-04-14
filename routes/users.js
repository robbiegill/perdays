var User = require('../models/user').Model;

var registerUser = function(req, res) {
  res.json({ 'status': 'not implemented' });
};

var loginUser = function(req, res) {
  res.json({ 'status': 'not implemented' });
};

var logoutUser = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = {};
module.exports.register = registerUser;
module.exports.login = loginUser;
module.exports.logout = logoutUser;