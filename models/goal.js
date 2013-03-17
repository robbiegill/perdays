var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var goalSchema = new Schema({
    value: { type: Number, required: true }
  , interval: { type: String, 'default': 'day' }
});

module.exports =  {};
module.exports.Schema =  goalSchema;
module.exports.Model =  mongoose.model('goal', goalSchema);