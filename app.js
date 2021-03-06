/**
 * Module dependencies.
 */

var config = require('./config.json')
  , express = require('express')
  , mongoose = require('mongoose')
  , mongoUtil = require('./models/util/mongoUtil')
  , MongoStore = require('connect-mongo')(express)
  , routes = require('./routes')
  , partials = require('./routes/partials')
  , directives = require('./routes/directives')
  , http = require('http')
  , https = require('https')
  , fs = require('fs')
  , path = require('path')
  , authMethods = require('./auth-methods')
  , Task = require('./models/task').Model
  , taskEvent = require('./models/taskEvent').Model
  , routeHolder = require('./routes/holder')
  , taskRoutes = require('./routes/task')
  , userRoutes = require('./routes/users')
  , redirectTo = require('./routes/redirectTo');

var app = express();

var mongoCon = mongoUtil.buildConnection();
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
    res.send(500, { err: 'something blew up' });
  });

});

app.configure('development', function () {
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/partials/:name', partials.byName);
app.get('/directives/:name', directives.byName);


/* api routes */

app.post('/api/register', userRoutes.register);
app.post('/api/user/login', userRoutes.login);
app.get('/api/user/logout', userRoutes.logout);
app.get('/api/auth/google', authMethods.googleAuth);
app.get('/api/auth/google/return', authMethods.googleCallback,
  redirectTo('/tasks')
);
app.get('/api/auth/github', authMethods.githubAuth );
app.get('/api/auth/github/callback', authMethods.githubCallback,
  redirectTo('/tasks')
);
app.get('/api/auth/twitter', authMethods.twitterAuth);
app.get('/api/auth/twitter/callback', authMethods.twitterCallback,
  redirectTo('/tasks')
);

/* start authentication required api calls */
app.all('/api/*', authMethods.apiAuthentication);
app.get('/api/task', taskRoutes.listTasks);
app.post('/api/task', taskRoutes.createTask);
app.get('/api/task/:id', taskRoutes.getTask);
app.put('/api/task/:id', taskRoutes.updateTask);
app.del('/api/task/:id', taskRoutes.deleteTask);
app.get('/api/task/:taskId/events', taskRoutes.listTaskEvents);
app.post('/api/task/:taskId/events', taskRoutes.createTaskEvent);
app.del('/api/task/:taskId/events/:id', taskRoutes.deleteTaskEvent);
/* end authentication required api calls */

/* catch all non-api calls */
app.get(/^(?!\/api\/).*/, routes.index);


if (config.useHTTPS) {
  var httpsOptions = {
    key: fs.readFileSync('config/key.pem'),
    cert: fs.readFileSync('config/cert.pem')
  };
  https.createServer(httpsOptions, app).listen(app.set('port'));
} else {
  http.createServer(app).listen(app.set('port'));
}

module.exports = app;