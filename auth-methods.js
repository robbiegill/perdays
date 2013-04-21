var passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , GitHubStrategy = require('passport-github').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy
  , User = require('./models/user')
  , config = require('./config.json');

module.exports = {};

passport.serializeUser(function (user, done) {
  User.serializeUser(user, done);
});

passport.deserializeUser(function (obj, done) {
  User.deserializeUser(obj, done);
});

passport.use(new GoogleStrategy({
    clientID: config.authGoogle.ID,
    clientSecret: config.authGoogle.SECRET,
    callbackURL: getCallbackURLWithProtocol(config.authGoogle.callbackURL)
  },
  function (token, tokenSecret, profile, done) {
    User.findOrCreateGoogleUser(token, tokenSecret, profile, done);
  }
));

passport.use(new GitHubStrategy({
    clientID: config.authGitHub.ID,
    clientSecret: config.authGitHub.SECRET,
    callbackURL: getCallbackURLWithProtocol(config.authGitHub.callbackURL)
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreateGitHubUser(accessToken, refreshToken, profile, done);
  }
));

passport.use(new TwitterStrategy({
    consumerKey: config.authTwitter.ID,
    consumerSecret: config.authTwitter.SECRET,
    callbackURL: getCallbackURLWithProtocol(config.authTwitter.callbackURL)
  },
  function (token, tokenSecret, profile, done) {
    User.findOrCreateTwitterUser(token, tokenSecret, profile, done);
  }
));

function getCallbackURLWithProtocol(url) {
  return (config.useHTTPS ? 'https://' : 'http://') + url;
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

function apiAuthentication(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  return res.json(401, { 'err': 'Authentication failed. Please log in.'});
}

module.exports.googleAuth = passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile'
      , 'https://www.googleapis.com/auth/userinfo.email'
      /*, 'https://www.googleapis.com/auth/plus.login'*/]
    });
module.exports.googleCallback = passport.authenticate('google', { failureRedirect: '/' });

module.exports.githubAuth = passport.authenticate('github', { scope: ['user:email'] });
module.exports.githubCallback = passport.authenticate('github', { failureRedirect: '/'});

module.exports.twitterAuth = passport.authenticate('twitter');
module.exports.twitterCallback = passport.authenticate('twitter', { failureRedirect: '/'});


module.exports.passport = passport;
module.exports.ensureAuthenticated = ensureAuthenticated;
module.exports.apiAuthentication = apiAuthentication;