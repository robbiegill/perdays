'use strict';

/* global angular */
var pdDirectives = angular.module('pd.directives', []);

pdDirectives.
    directive('appVersion', ['version', function(version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]);

pdDirectives.directive('ted', function () {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: '/directives/taskEventDetail'
  };
});