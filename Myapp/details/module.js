(function(angular){
	"use strict"
	angular.module("moviecat.details",["ngRoute","moviecat.service.http"])
	.config(["$routeProvider",function($routeProvider){
		$routeProvider.when('/detail/:id',{
			controller:"detailsController",
			templateUrl:"/details/view"
		})
	}])
	.controller("detailsController",[
		"$scope"
		,"HttpService"
		,"$routeParams"
		,function($scope,HttpService,$routeParams){
			$scope.movie = {};
			$scope.loading = true;
			HttpService.jsonp("http://api.douban.com//v2/movie/subject/"+$routeParams.id,{},function(data){
				
				$scope.title = data.title;
				$scope.movie = data;
				$scope.loading = false;
				$scope.$apply();
			})
			


	}])





})(angular)