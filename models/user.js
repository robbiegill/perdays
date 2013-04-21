var mongoose = require('mongoose')
  , users = require('passport-users')
  , userSchema = users.userSchema
  , twitter_plugin = users.twitter_oauth1a_plugin
  , google_plugin = users.google_oauth2_plugin
  , github_plugin = users.github_oauth2_plugin
  , sessions_plugin = users.persistent_sessions_plugin;

userSchema.plugin(twitter_plugin);
userSchema.plugin(github_plugin);
userSchema.plugin(google_plugin);
userSchema.plugin(sessions_plugin);

module.exports = User = mongoose.model('User', userSchema);