(function(angular) {
  'use strict';

  // 主模块
  angular.module('moviecat', [
      'ngRoute',
      'moviecat.details',
      'moviecat.movielist'

    ])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({ redirectTo: '/in_theaters' });
    }])
    .controller('SearchController', [
      '$scope',
      '$route',
      function($scope, $route) {
        $scope.input = '';
        $scope.search = function() {
          $route.updateParams({ category: 'search', q: $scope.input });
        };
      }
    ]);

}(angular));
