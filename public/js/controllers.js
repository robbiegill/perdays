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
  'Task', function ($scope, $http, $routeParams, Task) {

    $scope.tasks = Task.query({}, function (data) {
      console.debug(data);
    });

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