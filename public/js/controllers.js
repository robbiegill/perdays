'use strict';

var pdControllers = angular.module('pd.controllers', []);

pdControllers.controller('TaskCtrl', [
  '$scope',
  '$http',
  '$routeParams',
  'Task', function ($scope, $http, $routeParams, Task) {



    /*Task.save({},{name: 'ng-posted', owner: 'rob'});

    var post = new Task({name: 'ng-posted instance', owner: 'rob'});
    post.$save();

    $http.get('/api/task').
      success(function (data, status, headers, config) {
        console.debug(data);
        $scope.tasks = data;
      });
    */

    $scope.tasks = Task.query({}, function (data) {
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

pdControllers.controller('IntlCtrl', [
  '$scope',
  '$routeParams',
  'Card', function ($scope, $routeParams, Card) {

    $scope.busy = false;

    $scope.cards = [];
    $scope.numColumns = 3;
    $scope.rows = [];
    $scope.cols = [];
    $scope.offset = 0;
    $scope.limit = 12;
    $scope.$watch('cards.length', function (newVal, oldVal) {
      $scope.rows.length = Math.ceil(newVal / $scope.numColumns);
      $scope.cols.length = $scope.numColumns;
      if ($scope.cards.length > 100) {$scope.busy = true;}
    });

    /*$http.get('/api/c3p0').
     success(function (data, status, headers, config) {
     $scope.cards = data;
     });*/

    $scope.fetchCards = function () {
      if ($scope.busy) {return;}
      $scope.busy = true;
      Card.query({
        offset: $scope.offset,
        limit: $scope.limit,
        username: $routeParams.username,
        repo: $routeParams.repo
      }, function (data) {
        $scope.offset += data.length;
        $scope.cards = $scope.cards.concat(data);
        $scope.busy = !!(data.length < $scope.limit);
      });

    };

    $scope.fetchCards();


    $scope.addCard = function (hint, reveal) {

      var postData = {
        hint: hint,
        reveal: reveal
      };

      /*$http.post('/api/c3p0', postData).
       success(function (data, status, headers, config) {
       $scope.cards.push(data);
       });*/

      Card.save({}, postData,
        function (data, status, headers, config) {
          $scope.cards.push(data);
        },
        function (data, status, headers, config) {
          console.log('save failed');
        }
      );
    };

  }
]);

pdControllers.controller('IndexCtrl', [
  '$scope',
  '$http', function ($scope, $http) {

    $http.get('/loader/cards').
      success(function (data, status, headers, config) {
        $scope.cards = data.cards;
      });

    $scope.showModal = function (id) {
      $('#modal' + id).modal('toggle');
    };

    $scope.addTag = function (tags, text) {
      tags.push(text);
    };

  }
]);

pdControllers.controller('TranslateCtrl', [
  '$scope',
  '$http', function ($scope, $http) {

    $scope.translate = function (input) {
      var config = {
        params: {input: input}
      };
      $http.get('/api/translate', config).
        success(function (data, status, headers, config) {
          $scope.translation.result = data;
        });
    };
  }
]);

