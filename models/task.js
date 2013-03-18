var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , taskEventSchema = require('./taskEvent').Schema
  , TaskEvent = require('./taskEvent').Model
  , ts_created = require('./plugins/ts_created')
  , ts_modified = require('./plugins/ts_modified');

var taskSchema = new Schema({
    name: { type: String, required: true }
  , owner: { type: String, required: true }
  , taskType: { type: String, 'default': 'max' }
  , goal: {
      value: { type: Number, 'default': 5 }
    , interval: { type: String, 'default': 'day' }
  }
  , notes: String
});

taskSchema.plugin(ts_created);
taskSchema.plugin(ts_modified);

taskSchema.methods.addEvent = function(value, cb) {

  var te = new TaskEvent({
      task_id: this._id.toString()
    , value: value
  });
  te.save(function(err, created) {
    cb(err, created);
  });
};


module.exports =  {};
module.exports.Schema =  taskSchema;
module.exports.Model =  mongoose.model('task', taskSchema);