'use strict';

/* global angular */
angular.module('pd', [
  'pd.controllers',
  'pd.filters',
  'pd.services',
  'pd.directives'
]).config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/login',
        controller: 'LoginCtrl'
      }).
      when('/tasks', {
        templateUrl: '/partials/taskPanel',
        controller: 'TaskCtrl'
      }).
      when('/tasks/:id', {
        templateUrl: '/partials/taskDetailPanel',
        controller: 'TaskDetailCtrl'
      }).
      when('/createTask', {
        templateUrl: '/partials/createTaskPanel',
        controller: 'CreateTaskCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);