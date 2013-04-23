var mongoose = require('mongoose')
  , users = require('passport-glue')
  , userSchema = users.userSchema
  , twitter_plugin = users.twitter_oauth1a_plugin
  , google_plugin = users.google_oauth2_plugin
  , github_plugin = users.github_oauth2_plugin
  , sessions_plugin = users.persistent_sessions_plugin
  , ts_created = require('goose-plugins').ts_created
  , ts_modified = require('goose-plugins').ts_modified;

userSchema.plugin(twitter_plugin);
userSchema.plugin(github_plugin);
userSchema.plugin(google_plugin);
userSchema.plugin(sessions_plugin);
userSchema.plugin(ts_created);
userSchema.plugin(ts_modified);

module.exports = User = mongoose.model('User', userSchema);