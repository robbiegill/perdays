/*describe('tasks', function() {
  var mongoose = require('mongoose')
    , Task = require('../../models/task').Model;

  var t;

  beforeEach(function() {
    if(!mongoose.connection.db) {
      mongoose.connect('mongodb://localhost/specs');
    }

    t = new Task({
      name: 'test task'
      , owner: 'test owner'
      , taskType: 'max'
      , goal: { value: 10 }
      , notes: 'test note'
    });
  });

  afterEach(function() {
    t.remove();
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

  it('should have an empty history', function() {
    expect(t.history).not.toBeUndefined();
    expect(t.history.length).toEqual(0);
  });

  it('should add a taskEvent', function() {
    t.addEvent(51);
    expect(t.history.length).toEqual(1);
    expect(t.history[0].value).toEqual(51);
  });

});*/