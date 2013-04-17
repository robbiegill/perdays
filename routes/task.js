var Task = require('../models/task').Model
  , TaskEvent = require('../models/taskEvent').Model;

/* 
 * it should create a task 
 * POST: /api/task
 */
var createTask = function(req, res, next) {

  var owner = req.user.username;
  var name = req.body.name;
  var notes = req.body.notes;
  Task.createOne(owner, name, notes, 
    function(err, task) {
      if (err) { return next(err); }

      res.json(201, task);
    }
  );
};

/* 
 * it should return a list of tasks 
 * GET: /api/task
 */
var listTasks = function(req, res, next) {

  var username = req.user.username;
  Task.updateStatusThenList(username, function(err, tasks) {
    if (err) { return next(err); }
    //console.log(JSON.stringify(req.user, null, 2));
    res.json(tasks);
  });
};

/* 
 * it should get the task with id <- :id 
 * GET: /api/task/:id
 */
var getTask = function(req, res, next) {

  var taskId = req.params.id;
  var username = req.user.username;
  Task.findOne({ owner: username, _id: taskId }, function(err, task) {
    if (err) { return next(err); }

    if (!!task) {
      return res.json(task);
    }
    res.send(404);
  });
};

/* 
 * it should delete task with id <- :id 
 * DEL: /api/task/:id
 */
var deleteTask = function(req, res, next) {

  var taskId = req.params.id;
  var username = req.user.username;
  Task.findOne({ owner: username, _id: taskId }, function(err, task) {
    if (err) { return next(err); }

    if (!!task) {
      task.remove(function(err) {
        if (err) { return next(err); }
      });
    }
    res.json({'success': 'true'});
  });
};

/* 
 * it should update task with id <- :id 
 * PUT: /api/task/:id
 */
var updateTask = function(req, res, next) {

  var id = req.params.id;
  var updates = req.body;
  Task.findById(id, function(err, task) {
    if (err) { return next(err); }

    task.set(updates);
    task.save(function(err, updated) {
      if (err) { return next(err); }

      res.json({'success': 'true'});
    });
  });
};

/* 
 * it should add a taskEvent to the task:taskId 
 * POST: /api/task/:taskId/events
 * body <- {value: v}
 */
var createTaskEvent = function(req, res, next) {

  var taskId = req.params.taskId;
  var val = req.body.value;
  Task.findById(taskId, function(err, task) {
    if (err) { return next(err); }

    task.addEvent(val, function(err, te) {
      if (err) { return next(err); }
      res.json(te);
    });
  });
};

/* 
 * it should list all taskEvent for task:taskId 
 * GET: /api/task/:taskId/events
 */
var listTaskEvents = function(req, res, next) {

  var taskId = req.params.taskId;
  TaskEvent.find({task_id: taskId}, function(err, taskEvents) {
    if (err) {return next(err); }

    res.json(taskEvents);
  });

};

/* 
 * it should delete a taskEvent:id from task:taskId 
 * DELETE: /api/task/:taskId/events/:id
 * body <- {value: v}
 */
var deleteTaskEvent = function(req, res, next) {

  var taskId = req.params.taskId;
  var id = req.params.id;
  TaskEvent.findById(id, function(err, te) {
    if (err) { return next(err); }

    te.remove(function(err) {
      if (err) {return next(err); }

      res.json({'success' : 'true'});
    });
  });
};


module.exports = {};
module.exports.createTask = createTask;
module.exports.listTasks = listTasks;
module.exports.getTask = getTask;
module.exports.deleteTask = deleteTask;
module.exports.updateTask = updateTask;
module.exports.createTaskEvent = createTaskEvent;
module.exports.listTaskEvents = listTaskEvents;
module.exports.deleteTaskEvent = deleteTaskEvent;
