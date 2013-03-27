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
      value: { type: Number, 'default': 1 }
    , interval: {
        type: String,
        'default': 'day',
        enum: ['year', 'month', 'week', 'day', 'hour', 'minute', 'second']
      }
  }
  , status: { type: String, 'default': 'warn', enum: ['pass', 'warn', 'fail'] }
  , last_event: { type: Date, 'default': Date.now }
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
  var intervals = this.get('goal.interval') + 's';
  var warnThreshold = moment().subtract(1, intervals);
  var failThreshold = moment().subtract(2, intervals);
  var le = moment(this.get('last_event'));
  if (le.isBefore(failThreshold)) {
    //not within 2 intervals, fail
    this.set('status', 'fail');
  } else if (le.isBefore(warnThreshold)) {
    //not within 1 interval, warn
    this.set('status', 'warn');
  } else {
    this.set('status', 'pass');
  }
};


module.exports =  {};
module.exports.Schema =  taskSchema;
module.exports.Model =  mongoose.model('task', taskSchema);