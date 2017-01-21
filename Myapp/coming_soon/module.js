(function(angular){
	"use strict"

	//定义热映的模块
    
     angular.module("moviecat.coming_soon",["ngRoute","moviecat.service.http"])
     .config(["$routeProvider",function($routeProvider){
	  //监控跳转地址  vs  提供页面的模板

   		$routeProvider.when("/coming_soon",{
   			templateUrl:"coming_soon/view.html",
   			controller:"comingSoonController"
   		})

     }])

     .controller("comingSoonController",["$scope","HttpService",function($scope,HttpService){
     		$scope.movies = [];
     		$scope.loading = true ;
     		$scope.title = "loading...";

     		//通过上面的url，传到跨域请求后，获得豆瓣数据封装到$scope中
     		HttpService.jsonp("http://api.douban.com/v2/movie/coming_soon",{ start: 0, count: 5},function(data){
          
     			$scope.movies = data.subjects;
				  $scope.loading = false;
     			$scope.title = data.title;
          $scope.totalCount = data.total;
            var pageSize = 5;
          $scope.totalPage = Math.ceil(data.total / pageSize);
     			$scope.$apply();
     		});
     }])

    




})(angular)