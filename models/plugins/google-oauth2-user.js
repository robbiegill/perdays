module.exports = exports = function google_oauth2_user_plugin (schema, options) {

  schema.add({
    auth_type_google: {
      uid: {type: String},
      username: {type: String},
      link: {type: String},
      picture: {type: String}
    }
  });

  schema.methods.setGoogleAttr = function(_json) {
    this.set({
      'provider': 'google',
      'username': '_google_' + _json.id,
      'email': _json.email,
      'display_name': _json.given_name,
      'auth_type_google.uid': _json.id,
      'auth_type_google.username': _json.email,
      'auth_type_google.link': _json.link,
      'auth_type_google.picture': _json.picture
    });
  };

};