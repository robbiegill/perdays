/*describe('taskEvents', function() {
  var mongoose = require('mongoose')
    , TaskEvent = require('../../models/taskEvent').Model
  
  var t;

  beforeEach(function() {
    if(!mongoose.connection.db) {
      mongoose.connect('mongodb://localhost/specs');
    }

    t = new TaskEvent({
      value: 10
    });
  });

  afterEach(function() {
    t.remove();
  });

  it('should have a value', function() {
    expect(t.value).not.toBeUndefined();
  });

  it('should have a ts_created', function() {
    expect(t.ts_created).not.toBeUndefined();
  });

});*/