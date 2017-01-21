//利用html中的script标签的src属性请求跨域
(function(angular) {
	"use strict"
					
	angular.module("moviecat.service.http",[])
	.service("HttpService",["$window",function($window) {

		this.jsonp = function(url,params,fn) {

			//回调函数放在全局变量	
			var cbName = "jsonp_"+(Math.random()*Math.random()).toString().substr(2);//防止多次请求，回调函数名字重复
			$window[cbName] = function(data){
				fn(data);
				$window.document.body.removeChild(scriptElement);
			};
			//拆解查询参数   {key:value}
			var queryStr="";
			for(var key in params){
				queryStr += key + "=" + params[key] + "&";
			}

			queryStr += "callback=" + cbName;
            url += "?" + queryStr;
			//创建script元素
           var scriptElement = $window.document.createElement("script");
           //给script元素src赋值url
			   scriptElement.src = url; 

			//script拼接到html中
			$window.document.body.append(scriptElement);

		}
			



	}])


})(angular)