var passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , GitHubStrategy = require('passport-github').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy
  , User = require('./models/user').Model
  , config = require('./config.json');

module.exports = {};

passport.serializeUser(function (user, done) {
  var createSessionKey = function () {
    var token = user.createToken();
    User.findOne({session_key: token}, function(err, existingUser) {
      if (err) {return done(err);}
      if (existingUser) {
        createSessionKey();
      } else {
        user.set( 'session_key', token );
        user.save(function(err){
          if (err) {return done(err);}
          return done(null, user.get('session_key'));
        });
      }
    });
  };
  if ( user.username ) {
    createSessionKey();
  }
  //done(null, user);
});

passport.deserializeUser(function (obj, done) {
  User.findOne({session_key: obj}, function(err, user){
    if (err) {return done(err);}
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: config.authGoogle.ID,
    clientSecret: config.authGoogle.SECRET,
    callbackURL: config.authGoogle.callbackURL
  },
  function (token, tokenSecret, profile, done) {

    User.findOne({ 'auth_type_google.uid': profile.id }, function(err, user){
      if (err) {
        return done(err);
      }

      if (user) {
        console.log('do stuff with user');
        return done(null, user);
      } else {
        var j = profile._json;
        var userObj = {
          provider: 'google',
          username: '_google_' + j.id,
          email: j.email,
          display_name: j.given_name,
          family_name: j.family_name,
          auth_type_google: {
            uid: j.id,
            username: j.email,
            link: j.link,
            picture: j.picture
          }
        };
        var gUser = new User(userObj);
        gUser.save(function(err, user){
          if (err) {return done(err);}
          return done(null, user);
        });

      }


    });

  }
));

passport.use(new GitHubStrategy({
    clientID: config.authGitHub.ID,
    clientSecret: config.authGitHub.SECRET,
    callbackURL: config.authGitHub.callbackURL
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOne({ 'auth_type_github.uid': profile.id }, function (err, user) {
      if (err) {return done(err);}

      if (user) {
        return done(null, user);
      } else {
        var j = profile._json;
        var userObj = {
          provider: 'github',
          username: '_github_' + j.id,
          email: j.email,
          display_name: j.name,
          auth_type_github: {
            uid: j.id,
            username: j.login,
            link: j.html_url,
            picture: j.avatar_url
          }
        };

        var githubUser = new User(userObj);
        githubUser.save(function(err, user) {
          if (err) {return done(err);}
          return done(null, user);
        });
      }

    });
  }
));

passport.use(new TwitterStrategy({
    consumerKey: config.authTwitter.ID,
    consumerSecret: config.authTwitter.SECRET,
    callbackURL: config.authTwitter.callbackURL
  },
  function (token, tokenSecret, profile, done) {
    User.findOne({ 'auth_type_twitter.uid': profile.id }, function (err, user) {
      if (err) {return done(err);}

      if (user) {
        return done(null, user);
      } else {
        var j = profile._json;
        console.log(JSON.stringify(j, null, 2));
        var userObj = {
          provider: 'twitter',
          username: '_twitter_' + j.id_str,
          email: null,
          display_name: j.name,
          auth_type_twitter: {
            uid: j.id_str,
            username: j.screen_name,
            link: 'http://twitter.com/' + j.screen_name,
            picture: j.profile_image_url
          }
        };

        var twitterUser = new User(userObj);
        twitterUser.save(function(err, user) {
          if (err) {return done(err);}
          return done(null, user);
        });
      }

    });
  }
));

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
