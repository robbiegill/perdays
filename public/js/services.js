'use strict';

/* global angular */
var pdServices = angular.module('pd.services', ['ngResource']);

pdServices.
  value('version', '0.0.1');

pdServices.
  factory('Card', ['$resource', function( $resource) {
    return $resource('/api/c3p0');
  }]);

pdServices.
  factory('Task', ['$resource', function ($resource) {
    return $resource('/api/task/:taskId', {taskId:'@_id'});
  }]);

pdServices.
  factory('TaskEvent', ['$resource', function ($resource) {
    return $resource(
      '/api/task/:taskId/events/:eventId',
      {taskId:'@task_id', eventId:'@_id'}
    );
  }]);