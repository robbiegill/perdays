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
        templateUrl: '/partials/tasks',
        controller: 'TaskCtrl'
      }).
      when('/tasks/:id', {
        templateUrl: '/partials/taskDetail',
        controller: 'TaskDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);