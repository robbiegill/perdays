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

pdServices.factory('MessageService', [function () {
  var messages = [];
  var service = {};
  var defaultMsg = {
    text: '',
    type: 'info',
    duration: 10
  };

  service.add = function(msg, type) {
    var newMessage = angular.copy(defaultMsg);
    if (typeof msg !== 'object') {
      var tmpObj = {};
      if (msg) tmpObj.text = msg;
      if (type) tmpObj.type = type;
      msg = tmpObj;
    }
    angular.extend(newMessage, msg);
    messages.push(newMessage);
  };

  service.remove = function(msg) {
    messages.splice(messages.indexOf(msg), 1);
  };

  service.allMessages = function() {
    return messages;
  };

  return service;

}]);