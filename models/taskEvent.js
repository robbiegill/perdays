var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ts_created = require('./plugins/ts_created');

var taskEventSchema = new Schema({
    value: { type: Number, required: true }
});

taskEventSchema.plugin(ts_created);


module.exports =  {};
module.exports.Schema =  taskEventSchema;
module.exports.Model =  mongoose.model('taskEvent', taskEventSchema);