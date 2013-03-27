'use strict';

/* global angular */
var pdControllers = angular.module('pd.controllers', []);

pdControllers.controller('UserPanelCtrl', [
  '$scope', function ($scope) {
    var ctx = document.getElementById("statusCanvas").getContext("2d");
    var data = [
          {value:40,color:'#468847'},
          {value:20,color:'#f89406'},
          {value:10,color:'#b94a48'}
        ];
    /* global Chart */
    var myNewChart = new Chart(ctx).Doughnut(data);

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

pdControllers.controller('LoginCtrl', [
  '$scope',
  '$http',
  '$routeParams',
  'Card', function ($scope, $http, $routeParams) {

    /*
    * $scope.username
    * $scope.password
    *
    * */

    $scope.loginPost = function() {    };

    $scope.loginWithGoogle = function () {
      $http.get('/api/auth/google').
        success(function (data, status, headers, config) {
          console.log(data);
        });
    };

  }
]);