;
(function() {
	'use strict';
	angular.module('detail', [])
	.controller('ModalInstanceCtrl', ['$http','$scope', '$modalInstance', 'items','utilConvertDateToString', function($http,$scope, $modalInstance,items,utilConvertDateToString) {
	    $scope.contact = {};
	    $scope.customer = {};
		$scope.saveEnvelope = function(){
			alert('1010');
			$scope.customer.title = 'Contact';
			$scope.customer.CID = 1;
			$scope.customer.createTime = utilConvertDateToString.getDateToString(new Date(),"yyyy-MM-dd HH:mm:ss");
			$scope.customer.IdReceiver= 3;
			$scope.customer.content = $scope.contact.name +';'+$scope.contact.email +';'+$scope.contact.phone +';'+$scope.contact.message;
			$scope.customer.msg_direct_comment='Customer to Staff';
			console.log("me.customer",$scope.customer);
		$http.post('/customer/msg/write', $scope.customer)
			.then(function(r){
				console.log('r===>',r);
				/*if (r.status===200)
				{
					me.signup_data = {};
					$state.go('app.login');
				}*/
//				$modalInstance.dismiss('cancel');
			},function(e){
				
			})
			
		}
		
		$scope.items = items;
	    $scope.selected = {
	      item: $scope.items[0]
	    };
	    $scope.ok = function () {
	      $modalInstance.close($scope.selected.item);
	    };
	
	    $scope.cancel = function () {
	      $modalInstance.dismiss('cancel');
	    };
	  }])
	.controller('detailsController',['$scope','$stateParams','$cookies','$rootScope','$localStorage','$modal', '$log','SearchService','readJSON','mouseEvent',function ($scope,$stateParams,$cookies,$rootScope,$localStorage, $modal, $log, SearchService,readJSON,mouseEvent){
		var datapackage = {};
		$scope.detailsData = {};
		if(JSON.stringify(SearchService.get()) != "{}"){
		 	$localStorage.settings = SearchService.get().data;
		 	console.log('$localStorage.settings',$localStorage.settings);
		 	datapackage = $localStorage.settings;
			console.log('datapackage',datapackage);
		 }else{
		 	datapackage = $localStorage.settings;
		 	console.log('$localStorage.settings',$localStorage.settings);
		 }
		 $scope.datapackage = datapackage;
		 console.log($stateParams.id +"<======>"+$stateParams.name);
		 angular.forEach(datapackage, function(data,index,array){
					//data等价于array[index]
					//console.log("ER_ID",data.ER_ID);
					if($stateParams.id==data.ER_ID){
						$scope.detailsData = data;
//						alert($stateParams.id);
					}
				});
		   /* $scope.myInterval = 5000;
		    var slides = $scope.slides = [];
		    $scope.addSlide = function() {
		      slides.push({
		        image: 'img/b1' + slides.length + '.jpg',
		        text: ['Carousel text #0','Carousel text #1','Carousel text #2','Carousel text #3'][slides.length % 4]
		      });
		    };
		    for (var i=0; i<4; i++) {
		      $scope.addSlide();
		    }*/
	$scope.items = ['item1', 'item2', 'item3'];
    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }; 
	}])
.factory('readData', ['$http', '$q', function($http, $q) {
		return {
			query: function() {
				var deferred = $q.defer();
				$http({
					method: 'GET',
					url: '/customer/hotrent'
				}).success(function(data, status, header, config) {
					deferred.resolve(data);
				}).error(function(data, status, header, config) {
					deferred.reject(data);
				});
				return deferred.promise;
			}
		}
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
.directive('rentrecommend', ['readData','$timeout', 'mouseEvent', function(readData, $timeout, mouseEvent) {
		return {
			restrict: 'EA',
			templateUrl: '/partials/mydirectives/directive-hotrent.html',
			scope: {
			},
			link: function(scope, element, attr) {
				scope.imageid = 4;
				scope.left = 0;
				var promise = readData.query();
				var step = 0;
				var time = null;
				promise.then(function(data) {
					 angular.forEach(data, function(data,index,array){
					//data等价于array[index]
					data.train_station = false;
					data.backpack = false;
					data.park = false;
					data.school = false;
					data.big_family = false;
					data.shopping_mall = false;
					data.offical_rental = false;
					data.university = false;
					var dataresults = data.ER_Description.split(";");
					console.log("lengthhhh",dataresults);
					var uniindex = 0
					dataresults.pop();
					uniindex = dataresults.indexOf('university');
					console.log("length",dataresults.length);
					for(var i =0;i<dataresults.length;i++)
					{
						switch (dataresults[i])
						{
						     case "train_station":
						     	data.train_station = true;
						   	 break;
						     case "backpack": 
								data.backpack = true;
						    break;
						     case "park": 
								data.park = true;
						    break;
						     case "school": 
								data.school = true;
						    break;
						     case "big_family": 
								data.big_family = true;
						    break;
						     case "shopping_mall": 
								data.shopping_mall = true;
						    break;
						     case "offical_rental": 
								data.offical_rental = true;
						    break;
						    case "university":
						     	data.university = true;
						     break;
						    case "":
						    	data.university = false;
						    	 break;
						    default:
						    	data.university = true;
						    	 break;
						    	
						}
					}
					if (uniindex == dataresults.length-1 || uniindex==-1){
							data.university = false;
						}
					if(data.university){
						data.uniname = dataresults[uniindex + 1];
					}
				});
					scope.carouselimages = data;
					console.log("scope.carouselimages",scope.carouselimages);
				});
				scope.prev = function(){
					if(scope.imageid >4 ){
						scope.imageid--;
						scope.left = scope.left+341.25;
						element.find("ul").css({
							'left': scope.left + 'px'
						});
					}
				}
				scope.next = function(){
					if(scope.imageid <scope.carouselimages.length ){
						scope.imageid++;
						scope.left = scope.left-341.25;
						element.find("ul").css({
							'left': scope.left + 'px'
						});
					}
				}
			}
		}
	}])
.directive('imagelunbo',['SearchService','$timeout','$localStorage','$stateParams','mouseEvent' ,function (SearchService,$timeout,$localStorage,$stateParams,mouseEvent) {
  return{
   restrict:'EA',
   templateUrl:'/partials/mydirectives/directive-lunbo.html',
   css: 'css/winning/details.css',
   scope:{},
   link: function (scope, element, attr) {
    var datapackage = {};
	scope.detailsData = {};
	if(JSON.stringify(SearchService.get()) != "{}"){
	 	$localStorage.settings = SearchService.get().data;
	 	console.log('$localStorage.settings',$localStorage.settings);
	 	datapackage = $localStorage.settings;
		console.log('datapackage',datapackage);
	 }else{
	 	datapackage = $localStorage.settings;
	 	console.log('$localStorage.settings',$localStorage.settings);
	 }
	 scope.datapackage = datapackage;
	 console.log($stateParams.id +"<======>"+$stateParams.name);
	 angular.forEach(datapackage, function(data,index,array){
		//data等价于array[index]
		//console.log("ER_ID",data.ER_ID);
		if($stateParams.id==data.ER_ID){
			scope.detailsData = data;
		//alert($stateParams.id);
		}
	});
    var step=0;
    var time=null;
   /* promise.then(function (data) {
     scope.img1=data[0];
     scope.img2=data[1];
     scope.img3=data[2];
     scope.img4=data[3];
     scope.img5=data[4];
    });*/
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