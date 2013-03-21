//'use strict';

describe('Controller Tests', function () {

  beforeEach(module('pd'));

  describe('TaskCtrl', function() {

    var scope, ctrl, $httpBackend;

    beforeEach(
      inject(
        function (_$httpBackend_, $rootScope, $controller) {
          $httpBackend = _$httpBackend_;
          $httpBackend.expectGET('/api/task').
            respond([
              {a:"a"},
              {a:"a"},
              {a:"a"}
            ]);
            scope = $rootScope.$new();
            ctrl = $controller('TaskCtrl', {$scope: scope});
        }
      )
    );

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should bind the data to tasks', function() {
      expect(scope.tasks.length).toEqual(0);
      $httpBackend.flush();
      expect(scope.tasks.length).toBeGreaterThan(0);
    });

    it('should create a new task', function() {
      $httpBackend.flush(); // initial GET
      var howMany = scope.tasks.length;
      $httpBackend.expectPOST('/api/task').
        respond({name: 'task name', owner: 'task owner', notes: 'task notes'});
      scope.createTask();
      $httpBackend.flush();
      expect(scope.tasks.length).toEqual(howMany + 1);
    });

    it('should reset the data binding when a new task is created', function() {
      $httpBackend.flush(); // initial GET
      scope.name = 'name';
      scope.owner = 'owner';
      scope.notes = 'notes';
      $httpBackend.expectPOST('/api/task').
        respond({name: 'task name', owner: 'task owner', notes: 'task notes'});
      scope.createTask();
      $httpBackend.flush();
      expect(scope.name).toBe('');
      expect(scope.owner).toBe('');
      expect(scope.notes).toBe('');
    });

  });

  describe('TaskCtrl', function() {

    var scope, ctrl, $httpBackend;

    beforeEach(
      inject(
        function (_$httpBackend_, $rootScope, $controller) {
          $httpBackend = _$httpBackend_;
          $httpBackend.expectGET('/api/task/abc').
            respond({a:'a'});
          $httpBackend.expectGET('/api/task/abc/events').
            respond([{a:'a'}]);
          routeParams = { id: 'abc' };
          scope = $rootScope.$new();
          ctrl = $controller('TaskDetailCtrl', {$scope: scope, $routeParams:routeParams});
        }
      )
    );

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should GET the task for the route parameter :id and bind to t', function() {
      $httpBackend.flush(1);
      expect(scope.t.a).toBe('a');
      $httpBackend.flush(1);
    });

    it('should GET the taskEvents for the route parameter :id and bind to tes', function() {
      $httpBackend.flush();
      expect(scope.tes[0].a).toBe('a');
    });

  });

});