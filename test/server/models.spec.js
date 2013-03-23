describe('models -> ', function() {
  var config = require('../../config.json')
    , mongoose = require('mongoose')
    , Task = require('../../models/task').Model
    , TaskEvent = require('../../models/taskEvent').Model;

  var t;

  if(mongoose.connection.db) {
    mongoose.disconnect();
  }
  var con = config.db.host +
      (config.db.port ? ':' + config.db.port : '') +
      '/' + config.db['test'];
  mongoose.connect(con);


  beforeEach(function() {});

  afterEach(function() {
    t.remove();
  });

  describe('tasks', function() {

    beforeEach(function() {
      t = new Task({
          name: 'test task'
        , owner: 'test owner'
        , taskType: 'max'
        , goal: { value: 10 }
        , notes: 'test note'
        , status: 'pass'
      });
    });

    it('should have a name', function() {
      expect(t.name).toBe('test task');
    });

    it('should have an owner', function() {
      expect(t.owner).toBe('test owner');
    });

    it('should have a task type', function() {
      expect(t.taskType).toBe('max');
    });

    it('should have goal', function() {
      expect(t.goal).not.toBeNull();
    });

    it('should have a goal.value', function() {
      expect(t.goal.value).toEqual(10);
    });

    it('should have a goal.value', function() {
      expect(t.goal.interval).toBe('day');
    });

    it('should have a note', function() {
      expect(t.notes).toEqual('test note');
    });

    it('should have a ts_created', function() {
      expect(t.ts_created).not.toBeUndefined();
    });

    it('should have a ts_modified when saved', function(done) {
      expect(t.ts_modified).toBeUndefined();
      t.save(function(err, t) {
        expect(t.ts_modified).not.toBeUndefined();
        done();
      });
    });

    it('should not update ts_created when saved', function(done) {
      var ts = t.ts_created;
      t.save(function(err, t) {
        expect(t.ts_created).toBe(ts);
        done();
      });
    });

    it('should add a taskEvent', function(done) {
      t.addEvent(23, function(err, te) {
        expect(err).toBeNull();
        expect(te.task_id).toBe(t._id.toString());
        expect(te.value).toBe(23);
        te.remove();
        done();
      });
    });

    it('should have a status', function() {
      expect(t.status).toEqual('pass');
    });

    it('should pass validation with status pass', function(done) {
      t.status = 'pass';
      t.save(function(err, t) {
        expect(err).toBeNull();
        done();
      });
    });

    it('should pass validation with status warn', function(done) {
      t.status = 'warn';
      t.save(function(err, t) {
        expect(err).toBeNull();
        done();
      });
    });

    it('should pass validation with status fail', function(done) {
      t.status = 'fail';
      t.save(function(err, t) {
        expect(err).toBeNull();
        done();
      });
    });

    it('can only have a status of pass, warn, or fail', function(done) {
      t.status = 'nope';
      t.save(function(err, t) {
        expect(err).not.toBeNull();
        done();
      });
    });

  });

  describe('taskEvents', function() {

    beforeEach(function() {
      t = new TaskEvent({
          task_id: '123'
        , value: 10
      });
    });

    it('should have a value', function() {
     expect(t.value).not.toBeUndefined();
    });

    it('should have a task_id', function() {
      expect(t.task_id).not.toBeUndefined();
    });

    it('should have a ts_created', function() {
     expect(t.ts_created).not.toBeUndefined();
    });

    it('should fail save:validation without a task_id', function(done) {
      t = new TaskEvent({value: 10});
      t.save(function(err, te) {
        expect(err.name).toBe('ValidationError');
        done();
      });
    });

    it('should fail save:validation without a value', function(done) {
      t = new TaskEvent({task_id: 'abc'});
      t.save(function(err, te) {
        expect(err.name).toBe('ValidationError');
        done();
      });
    });

  });
});