module.exports = exports = function ts_created_plugin (schema, options) {

	schema.add({
    ts_created: {type: Date, 'default': new Date() }
  });

/*	schema.pre('save', function(next) {
		this.ts_created = new Date();
		next();
	});*/

};