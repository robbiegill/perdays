var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ts_created = require('goose-plugins').ts_created;

var taskEventSchema = new Schema({
    task_id: { type: String, required: true }
  , value: { type: Number, required: true }
});

taskEventSchema.plugin(ts_created);

taskEventSchema.statics.removeEvent = function(id, cb) {
  this.remove({_id: id}, function(err) {
    if (err) { return next(err); }

    te.remove(function(err) {
      cb(err, true);
    });
  });
};


module.exports =  {};
module.exports.Schema =  taskEventSchema;
module.exports.Model =  mongoose.model('taskEvent', taskEventSchema);