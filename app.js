/**
 * Module dependencies.
 */

var config = require('./config.json')
  , express = require('express')
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


var mongoCon = 'mongodb://localhost/' + config.db[config.mode];
mongoose.connect(mongoCon, function(err) {
  if (err) {throw err;}
});

app.configure(function () {
  app.set('port', process.env.PORT || config.app.port || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.compress());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({
      secret: config.app.session_secret || 'perdays',
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

app.get('/api/task/:taskId/events', taskRoutes.listTaskEvents);
app.post('/api/task/:taskId/events', taskRoutes.createTaskEvent);

app.del('/api/task/:taskId/events/:id', taskRoutes.deleteTaskEvent);

/* catch all non-api calls */
app.get(/^(?!\/api\/).*/, routes.index);


app.listen(app.get('port'), function () {
  //open('http://localhost:' + app.get('port') + '/');
});

module.exports = app;
