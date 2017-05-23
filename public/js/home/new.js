;(function(){
	'use strict';
	 angular.module('lunbo',[])
  		.controller('lunboController',['$scope','readJSON','mouseEvent' ,function ($scope,readJSON,mouseEvent) {

 }])
 		.factory('readJSON',['$http','$q', function ($http,$q) {
  return {
   query: function (){
    var deferred=$q.defer();
    $http({
     method:'GET',
     url:'img.json'
    }).success(function (data, status, header, config) {
     deferred.resolve(data);
    }).error(function (data, status, header, config) {
     deferred.reject(data);
    });
    return deferred.promise;
   }
  }
 }])
 /*这个服务有问题，需改进，暂时没想到解决办法*/
  	.factory('mouseEvent', function () {
  return{
   mouseevent: function (ele1,ele2 ,event, done) {
		//html
//		<img src="currentImage"/>
//		<button type="button" ng-click="change("next")">向前</button>
//		<button type="button" ng-click="change("back")">向后</button>
//		//controller
//		var currentIndex = 0;
//		$scope.images = ["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg"]
//		$scope.currentImage = $scope.images[currentIndex];
//		$scope.change=function(des){
//		    if(des === "next"){
//		        ++currentIndex < $scope.images.length? $scope.currentImage = $scope.images[currentIndex]:alert("已是最后一张");
//		    }else{
//		        --currentIndex > 0 ? $scope.currentImage = $scope.images[currentIndex]:alert("已是第一张");
//		    }
//		}

   }
  }
 })
 	.directive('lunbo',['readJSON','$timeout','mouseEvent' ,function (readJSON,$timeout,mouseEvent) {
  return{
   restrict:'EA',
   templateUrl:'/partials/directive-lunbo.html',
   css: 'css/winning/new.css',
   scope:{},
   link: function (scope, element, attr) {
    var promise=readJSON.query();
    var step=0;
    var time=null;

    promise.then(function (data) {
     scope.img1=data[0];
     scope.img2=data[1];
     scope.img3=data[2];
     scope.img4=data[3];
     scope.img5=data[4];
    });
    var stepFun= function () {
     element.find("li").removeClass("active");
     element.find("li").eq(step+1).addClass("active");
     scope.pic=step;
     step++;
     step=step%5;
     time=$timeout(function () {
      stepFun();
     },5000);
    };
    stepFun();
    /*点击事件*/
    scope.clickEvent= function (number) {
     scope.pic=number;
     element.find("li").removeClass("active");
     element.find("li").eq(number+1).addClass("active");
     $timeout.cancel(time);
     step=number;
    };
    /*鼠标移除动画重新开始*/
    scope.start= function () {
     $timeout.cancel(time);
     stepFun();
    }
   }
  }
 }])
 	.animation('.fade-in', function () {
  return{
   enter: function (element, done) {
    var step=0;
    var time=null;//计时器
    var animationFunc= function () {
     step+=20;
     if(step>100){
      done();
      clearInterval(time);
     }else{
      element.css("opacity",step/100);
     }
    };
    element.css("opacity",0);
    time=setInterval(animationFunc,50);
   },
   leave: function (element,done) {
    var step=100;
    var time=null;
    var animationFun= function () {
     step-=20;
     if(step<0){
      done();
      clearInterval(time);
     }else{
      element.css("opacity",step/100)
     }
    };
    element.css("opacity",1);
    time=setInterval(animationFun,40);
   }
  }
 })
})();
