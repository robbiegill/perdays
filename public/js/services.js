'use strict';

var pdServices = angular.module('pd.services', ['ngResource']);

pdServices.
  value('version', '0.0.1');

pdServices.
  factory('Card', function($resource){
    return $resource('/api/c3p0');
  });

pdServices.
  factory('Task', function ($resource) {
    return $resource('/api/task/:taskId', {taskId:'@_id'});
  });

pdServices.
  factory('TaskEvent', function ($resource) {
    return $resource(
      '/api/task/:taskId/event/:eventId',
      {taskId:'@taskId', eventId:'@_id'}
    );
  });