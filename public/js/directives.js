'use strict';

var pdDirectives = angular.module('pd.directives', []);

pdDirectives.
    directive('appVersion', ['version', function(version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]);

pdDirectives.directive('taskEventer', function () {
  return {};
});