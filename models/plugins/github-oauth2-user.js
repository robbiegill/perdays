module.exports = exports = function github_oauth2_user_plugin (schema, options) {

  schema.add({
    auth_type_github: {
      uid: {type: String},
      username: {type: String},
      link: {type: String},
      picture: {type: String}
    }
  });

  schema.methods.setGitHubAttr = function(_json) {
    this.set({
      'provider': 'github',
      'username': '_github_' + _json.id,
      'email': _json.email,
      'display_name': _json.name,
      'auth_type_github.uid': _json.id,
      'auth_type_github.username': _json.login,
      'auth_type_github.link': _json.html_url,
      'auth_type_github.picture': _json.avatar_url
    });
  };

};