describe('routes -> ', function() {
  var config = require('../../config.json')
    , superagent = require('superagent');


  var agent;
  var u = config.app.host + ':' + config.app.port;
  var url;

  beforeEach(function() {
     agent = superagent.agent();
   });

  describe('/api/task ->', function() {

    beforeEach(function() {
      url = u + '/api/task';
    });

    it('GET should respond', function(done) {
      agent.
        get(url).
        end(function(err, res) {
          expect(res.status).toBe(200);
          done();
        });
    });

    it('POST should create a task', function(done) {
      agent.
        post(url).
        send({name: 'test task', owner: 'rob'}).
        end(function(err, res) {
          expect(res.status).toBe(200);
          expect(res.body._id).not.toBeUndefined();
          expect(res.body.name).toBe('test task');
          done();
        });
    });

    it('DEL should 404', function(done) {
      agent.
        del(url).
        end(function(err, res) {
          expect(res.status).toBe(404);
          done();
        });
    });

    it('PUT should 404', function(done) {
      agent.
        put(url).
        end(function(err, res) {
          expect(res.status).toBe(404);
          done();
        });
    });
  });

  describe('/api/task/:id -> ', function() {

    beforeEach(function() {
      url = u + '/api/task/123';
    });

    it('GET should return the task', function(done) {
      agent.
        get(url).
        end(function(err, res) {
          expect(res.status).toBe(500);
          done();
        });
    });

    it('DEL should delete the task', function(done) {
      agent.
        del(url).
        end(function(err, res) {
          expect(res.status).toBe(500);
          done();
        });
    });

    it('PUT should update the task', function(done) {
      agent.
        put(url).
        send({name: 'new name'}).
        end(function(err, res) {
          expect(res.status).toBe(500);
          done();
        });
    });

    it('POST should 404', function(done) {
      agent.
        post(url).
        end(function(err, res) {
          expect(res.status).toBe(404);
          done();
        });
    });
  });

  describe('/api/task/:taskId/event -> ', function() {

    beforeEach(function(){
      url = u + '/api/task/abc/events';
    });

    it('GET should respond', function(done) {
      agent.
        get(url).
        end(function(err, res) {
          expect(res.status).toBe(200);
          done();
        });
    });

    it('POST create a taskEvent', function(done) {
      agent.
        post(url).
        end(function(err, res) {
          expect(res.status).toBe(500);
          done();
        });
    });

    it('PUT should 404', function(done) {
      agent.
        put(url).
        end(function(err, res) {
          expect(res.status).toBe(404);
          done();
        });
    });

    it('DEL should 404', function(done) {
      agent.
        del(url).
        end(function(err, res) {
          expect(res.status).toBe(404);
          done();
        });
    });

  });

  describe('/api/task/:taskId/events/:id', function() {

    beforeEach(function() {
      url = u + '/api/task/abc/events/def';
    });

    it('GET should 404', function(done) {
      agent.
        get(url).
        end(function(err, res) {
          expect(res.status).toBe(404);
          done();
        });
    });

    it('POST should 404', function(done) {
      agent.
        post(url).
        end(function(err, res) {
          expect(res.status).toBe(404);
          done();
        });
    });

    it('PUT should 404', function(done) {
      agent.
        put(url).
        end(function(err, res) {
          expect(res.status).toBe(404);
          done();
        });
    });

    it('DEL should delete the task', function(done) {
      agent.
        del(url).
        end(function(err, res) {
          expect(res.status).toBe(500);
          done();
        });
    });
  });

});