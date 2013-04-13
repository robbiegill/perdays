var passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , User = require('./models/user').Model
  , config = require('./config.json');

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
    clientID: config.authGoogle.ID,
    clientSecret: config.authGoogle.SECRET,
    callbackURL: config.authGoogle.callbackURL
  },
  function (token, tokenSecret, profile, done) {

    User.findOne({auth_type_google: profile.id}, function(err, user){
      if (err) {
        return done(err);
      }

      if (user) {
        console.log('do stuff with user');
        return done(null, user);
      } else {
        console.log(JSON.stringify(profile, null, 2));
        var userObj = {
          username: profile.id,
          email: profile._json.email,
          given_name: profile._json.given_name,
          family_name: profile._json.family_name,
          auth_type_google: {
            uid: profile.id,
            link: profile._json.link,
            picture: profile._json.picture
          }
        };
        var gUser = new User(userObj);
        gUser.save(function(err, user){
          if (err) {return done(err);}
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
  console.log('unauthenticated request');
  res.redirect('/');
}

exports.passport = passport;
exports.ensureAuthenticated = ensureAuthenticated;