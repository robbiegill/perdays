'use strict';

/* global angular */
var pdFilters = angular.module('pd.filters', []);

pdFilters.
  filter('interpolate', ['version', function(version) {
    return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    };
  }
]);

pdFilters.
  filter('timeFromNow', [function() {
    return function(ts) {
      /* global moment */
      return moment(ts).fromNow();
    };
  }]);