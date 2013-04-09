'use strict';

/* global angular */
var pdDirectives = angular.module('pd.directives', []);

pdDirectives.
  directive('appVersion', ['version', function(version) {
    return function (scope, elm, attrs) {
      elm.text(version);
    };
  }]);

pdDirectives.
  directive('bootstrapNav', ['$location', function ($location) {
    return {
      restrict: 'A',
      link: function ($scope, element, attrs, controller) {
        $scope.$watch(function() {
          return $location.path();
        }, function(newPath, oldPath) {

          angular.forEach(element.find('li'), function(li) {
            var $li = angular.element(li);
            if ($li.attr('data-nav-path') === newPath) {
              $li.addClass('active');
            } else {
              $li.removeClass('active');
            }
          });

        });
      }
    };
  }]);

pdDirectives.
  directive('ted', function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '/directives/taskEventDetail'
    };
  });