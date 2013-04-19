module.exports = exports = function twitter_oauth1a_user_plugin (schema, options) {

  schema.add({
    auth_type_twitter: {
      uid: {type: String},
      username: {type: String},
      link: {type: String},
      picture: {type: String}
    }
  });

  schema.methods.setTwitterAttr = function(_json) {
    this.set({
      'provider': 'twitter',
      'username': '_twitter_' + _json.id_str,
      'email': null,
      'display_name': _json.name,
      'auth_type_twitter.uid': _json.id_str,
      'auth_type_twitter.username': _json.screen_name,
      'auth_type_twitter.link': 'http://twitter.com/' + _json.screen_name,
      'auth_type_twitter.picture': _json.profile_image_url
    });

  };

};