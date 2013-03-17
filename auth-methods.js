var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy
  , User = require('./models/user').Model;

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
  if ( user.email ) {
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
    returnURL: 'http://localhost:3000/api/auth/google/return',
    realm: 'http://localhost:3000/'
  },
  function (identifier, profile, done) {

    User.findOne({auth_type_google: identifier}, function(err, user){
      if (err) {
        return next(err);
      }

      profile.identifier = identifier;

      if (user) {
        console.log('do stuff with user');
        return done(null, user);
      } else {
        var userObj = {
          username: profile.identifier,
          email: profile.emails[0].value,
          name: profile.name.givenName,
          auth_type_google: profile.identifier
        };
        var gUser = new User(userObj);
        gUser.save(function(err, user){
          if (err) {return next(err);}
          console.log('return user');
          return done(null, user);
        });

      }


    });


    /*console.log('id: ' + identifier);
    console.log('profile: ' + profile);
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });*/
  }
));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

exports.passport = passport;
exports.ensureAuthenticated = ensureAuthenticated;