var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10
  , uuid = require('node-uuid');

var userSchema = new Schema({
  username: {type: String, required: true, index: { unique: true }},
  email: {type: String},
  given_name: {type: String, required: true},
  family_name: {type: String},
  password: {type: String},
  session_key: {type: String, unique: true},
  auth_type_google: {
    uid: {type: String, unique: true},
    link: {type: String, unique: true},
    picture: {type: String}
  },
  auth_type_github: {
    uid: {type: String, unique: true},
    username: {type: String, unique: true},
    link: {type: String, unique: true},
    picture: {type: String}
  },
  auth_type_twitter: {
    uid: {type: String, unique: true},
    username: {type: String, unique: true},
    link: {type: String, unique: true},
    picture: {type: String}
  },
  created_at: {type: Date, 'default': Date.now}
});

userSchema.pre('save', function(next) {
  var user = this;

  // hash if password is modified or new
  if (!user.isModified('password')) {return next();}

  // get salty
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {return next(err);}

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {return next(err);}

      // store the hashed pw
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(testPassword, cb) {
  bcrypt.compare(testPassword, this.password, function(err, isMatch) {
    if (err) {return next(err);}
    cb(null, isMatch);
  });
};


var codes = userSchema.statics.failedAuth = {
  NOT_FOUND: 0,
  PASSWORD_FAILURE: 1
};

userSchema.statics.getAuthenticated = function(username, password, cb) {
  this.findOne({username: username}, function(err, user) {
    if (err) {return next(err);}

    // user not found
    if (!user) {
      return cb(null, null, codes.NOT_FOUND);
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {return next(err);}

      if (isMatch) {
        return cb(null, user);
      } else {
        return cb(null, null, codes.PASSWORD_FAILURE);
      }
    });


  });
};

userSchema.methods.createToken = function() {
  return uuid.v4();
};

module.exports = {};
module.exports.Model = mongoose.model('User', userSchema);
