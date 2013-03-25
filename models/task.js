var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , taskEventSchema = require('./taskEvent').Schema
  , TaskEvent = require('./taskEvent').Model
  , ts_created = require('./plugins/ts_created')
  , ts_modified = require('./plugins/ts_modified')
  , moment = require('moment');

var taskSchema = new Schema({
    name: { type: String, required: true }
  , owner: { type: String, required: true }
  , taskType: { type: String, 'default': 'max' }
  , goal: {
      value: { type: Number, 'default': 5 }
    , interval: { type: String, 'default': 'day' }
  }
  , status: { type: String, 'default': 'warn', enum: ['pass', 'warn', 'fail'] }
  , last_event: { type: Date, 'default': new Date() }
  , notes: String
});

taskSchema.plugin(ts_created);
taskSchema.plugin(ts_modified);

taskSchema.methods.addEvent = function(value, cb) {
  var task = this;
  var te = new TaskEvent({
      task_id: task._id.toString()
    , value: value
  });
  te.save(function(err, created) {
    if (err) { return cb(err, created); }
    task.set({
        status: 'pass'
      , last_event: new Date()
    });
    task.save(function(err) {
      cb(err, created);
    });
  });
};

taskSchema.static('updateStatusThenList', function(cb) {
  this.find({}, function(err, tasks) {
    if (err) { return cb(err, tasks); }
    tasks.forEach(function(t) {
      t.updateStatus();
    });
    return cb(err, tasks);
  });
});

taskSchema.methods.updateStatus = function() {
  var aDayAgo = moment().subtract('days', 1);
  var threeDaysAgo = moment().subtract('days', 3);
  var le = moment(this.get('last_event'));
  if (le.isBefore(threeDaysAgo)) {
    //not within 3 days
    this.set('status', 'fail');
  } else if (le.isBefore(aDayAgo)) {
    //not within a day, warn
    this.set('status', 'warn');
  } else {
    this.set('status', 'pass');
  }
};


module.exports =  {};
module.exports.Schema =  taskSchema;
module.exports.Model =  mongoose.model('task', taskSchema);