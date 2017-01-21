(function(angular){
	"use strict"

	//定义热映的模块
    
     angular.module("moviecat.top250",["ngRoute","moviecat.service.http"])
     .config(["$routeProvider",function($routeProvider){
	  //监控跳转地址  vs  提供页面的模板

   		$routeProvider.when("/top250",{
   			templateUrl:"top250/view.html",
   			controller:"top250Controller"
   		})

     }])

     .controller("top250Controller",["$scope","HttpService",function($scope,HttpService){
     		$scope.movies = [];
     		$scope.loading = true ;
     		$scope.title = "loading...";

     		//通过上面的url，传到跨域请求后，获得豆瓣数据封装到$scope中
     		HttpService.jsonp("http://api.douban.com/v2/movie/top250",{ start: 0, count: 5},function(data){
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