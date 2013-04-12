'use strict';

/* global angular */
var pdControllers = angular.module('pd.controllers', []);

pdControllers.controller('UserPanelCtrl', [
  '$scope', function ($scope) {
    /*var ctx = document.getElementById("statusCanvas").getContext("2d");
    var data = [
          {value:40,color:'#468847'},
          {value:20,color:'#f89406'},
          {value:10,color:'#b94a48'}
        ];
    var myNewChart = new Chart(ctx).Doughnut(data);*/

  }
]);

pdControllers.controller('TaskCtrl', [
  '$scope',
  '$http',
  '$routeParams',
  'Task',
  'TaskEvent', function ($scope, $http, $routeParams, Task, TaskEvent) {

    $scope.tasks = Task.query({}, function (data) {
      console.debug(data);
    });

    $scope.deleteTask = function(t) {
      t.$remove(function(s) {
        if (s.success) {
          var index = $scope.tasks.indexOf(t);
          if (index > -1) {
            $scope.tasks.splice(index, 1);
          }
        }
      });
    };

    $scope.createTask = function() {
      var t = new Task({
        name: $scope.name,
        owner: $scope.owner,
        notes: $scope.notes
      });
      t.$save(function(data) {
        $scope.name = '';
        $scope.owner = '';
        $scope.notes = '';
        $scope.tasks.push(data);
      });
    };

    $scope.createTaskEvent = function(t) {
      var te = new TaskEvent({
        task_id: t._id,
        value: '1'
      }).$save(function(created_te) {
        t.status = 'pass';
        t.last_event = created_te.ts_created;
      });
    };

    $scope.taskStatusComparator = function(t) {
      var status = t.status;
      switch (status) {
        case 'fail':
          return 0;
        case 'warn':
          return 1;
        case 'pass':
          return 2;
        default:
          return 10;
      }
    };

    $scope.taskTimeComparator = function(t) {
      /* global moment */
      return moment(t.last_event).valueOf();
    };

    $scope.taskOrder = [$scope.taskStatusComparator, $scope.taskTimeComparator];

  }
]);

pdControllers.controller('CreateTaskCtrl', [
  '$scope',
  '$location',
  'Task',
  'MessageService', function ($scope, $location, Task, MessageService) {


    $scope.createTask = function(redirect) {
      var name = $scope.taskName;
      var notes = $scope.taskNotes;

      if ( !name ) {
        MessageService.add('give it a name');
        return;
      } else if (!notes) {
        MessageService.add('give it an action');
        return;
      }

      var t = new Task({
        name: name,
        notes: notes,
        owner: 'username'
      }).$save({},
        function(data, status, headers, config) {
          if (redirect) {
            $location.path('/tasks');
          }
        }, function(data, status, headers, config) {
          MessageService.add('Something went wrong');
        }
      );
    };
  }
]);


pdControllers.controller('TaskDetailCtrl', [
  '$scope',
  '$routeParams',
  'Task',
  'TaskEvent', function ($scope, $routeParams, Task, TaskEvent) {

    $scope.t = Task.get({ taskId:$routeParams.id }, function(data, getResponseHeaders) {
      console.debug(data);
    });

    $scope.tes = TaskEvent.query({ taskId:$routeParams.id }, function(data) {
      console.debug(data);
    });

  }
]);

pdControllers.controller('NotificationCtrl', [
  '$scope',
  'MessageService', function ($scope, MessageService) {

    $scope.messages = MessageService.allMessages;

    $scope.remove = MessageService.remove;

    //TODO: Move to directive
    $scope.classMap = {
      error:'alert-error',
      info:'',
      success: 'alert-success'
    };

  }
]);

pdControllers.controller('SignUpCtrl', ['$scope', function ($scope) {}]);

pdControllers.controller('NavCtrl', ['$scope', function ($scope) {

    $scope.logout = function() {
      window.location = '/api/user/logout';
    };

  }
]);

pdControllers.controller('LoginCtrl', [
  '$scope',
  '$http',
  '$location',
  '$routeParams', function ($scope, $http, $location, $routeParams) {

    /*
    * $scope.username
    * $scope.password
    *
    * */

    $scope.login = function() {
      alert('not yet');
    };


    $scope.register = function() {
      $location.path('/signup');
    };


    $scope.loginWithGoogle = function () {
      window.location = '/api/auth/google';
      /*$http.get('/api/auth/google').
        success(function (data, status, headers, config) {
          console.log(data);
        });*/
    };

  }
]);