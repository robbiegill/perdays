/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , MongoStore = require('connect-mongo')(express)
  , routes = require('./routes')
  , partials = require('./routes/partials')
  , http = require('http')
  , path = require('path')
  , authMethods = require('./auth-methods')
  , Task = require('./models/task').Model
  , taskEvent = require('./models/taskEvent').Model
  , routeHolder = require('./routes/holder')
  , taskRoutes = require('./routes/task');

var app = express();


var mongoCon = 'mongodb://localhost/test';
mongoose.connect(mongoCon, function(err) {
  if (err) {throw err;}
  /*var newTask = new Task({
      name: 'startup task'
    , owner: 'robbie'
    , taskType: 'max'
    , goal: {
      value: 5
    }
  });
  var newEvent = new taskEvent({
    value: 5
  });
  newTask.history.push(newEvent);

  newTask.save();*/

});

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({
      secret: 'hbs',
      maxAge: new Date(Date.now() + 3600000),
      store: new MongoStore({url: mongoCon},function(err) {})
    }
  ));
  app.use(express.methodOverride());
  app.use(authMethods.passport.initialize());
  app.use(authMethods.passport.session());
  app.use(app.router);
  app.use(function(err, req, res, next) {
    //error handling middleware has sig.length 4
    console.error('ERROR: ' + err);
    res.send(500);
  });

});

app.configure('development', function () {
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/partials/:name', partials.byName);

/* api routes */
app.get('/api/task', taskRoutes.listTasks);
app.post('/api/task', taskRoutes.createTask);

app.get('/api/task/:id', taskRoutes.getTask);
app.put('/api/task/:id', taskRoutes.updateTask);
app.del('/api/task/:id', taskRoutes.deleteTask);

app.get('/api/task/:taskId/event', routeHolder);
app.post('/api/task/:taskId/event', taskRoutes.createTaskEvent);

app.del('/api/task/:taskId/event/:id', taskRoutes.deleteTaskEvent);

/* catch all */
app.get('*', routes.index);


app.listen(app.get('port'), function () {
  //open('http://localhost:' + app.get('port') + '/');
  //console.log(app.routes);
});

module.exports = app;
