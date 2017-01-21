
     //合并top250,theaters,coming_soon的modules

(function(angular){
	"use strict"

	//定义热映的模块
    
     angular.module("moviecat.movielist",["ngRoute","moviecat.service.http"])
     .config(["$routeProvider",function($routeProvider){
	  //监控跳转地址  vs  提供页面的模板

   		$routeProvider.when("/:category/:page?",{
   			templateUrl:"movielist/view.html",
   			controller:"MainController"
   		})

     }])

     .controller("MainController",[
                "$scope"
                ,"HttpService"
                ,"$routeParams"
                ,"$route"
                ,function($scope,HttpService,$routeParams,$route){
                      var pageSize = 5;
                      $scope.page = parseInt($routeParams.page || 1);
                      var start = ($scope.page - 1) * 5;
                   		$scope.movies = [];
                   		$scope.loading = true ;
                   		$scope.title = "loading...";

                   		//通过上面的url，传到跨域请求后，获得豆瓣数据封装到$scope中
                   		HttpService.jsonp("http://api.douban.com/v2/movie/"+$routeParams.category,{ start: start, count: pageSize ,q: $routeParams.q },function(data){
                   			$scope.movies = data.subjects;
              				  $scope.loading = false;
                   			$scope.title = data.title;
                        $scope.totalCount = data.total;
                        $scope.totalPage = Math.ceil(data.total / pageSize);
                   			$scope.$apply();
     		});

                      //翻页

                      $scope.go = function(page){
                            if(page>=1 && page <= $scope.totalPage){
                               $route.updateParams({ page : page });
                            }
                      }
     }])

    




})(angular)