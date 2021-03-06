/**
 * @Date:   2017-06-30T10:20:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-09T10:01:34+10:00
 */



;
(function() {
	'use strict';
	angular.module('andy')
	.controller('detailsController',function ($anchorScroll,$animate,$location,$http,$scope,$state,NgMap,$window,$stateParams,$cookies,$rootScope,$localStorage, $modal, $log, SearchService,readJSON,mouseEvent,utilConvertDateToString,hotRentService,getDataCommonService){
		var datapackage = {};
		$scope.detailsData = {};
		var _Data = {};
		$scope.shortlistInsert = {};
		$scope.no_smoking=false;
		$scope.no_pets=false;
		$scope.girl_only=false;
		$scope.boy_only=false;
		$scope.furniture=false;
		$scope.laundry=false;
		$scope.fullkitchen=false;
		$scope.coffee=false;
		$scope.aircondition=false;
		$scope.media=false;
		var ER_Feature = [];
		$(window).scrollTop(0,0);//回到顶部
		$animate.enabled(false);//消除carousel bug
		if(JSON.stringify(SearchService.get()) != "{}"){
		 	$localStorage.settings = SearchService.get().data;
		 	console.log('$localStorage.settings',$localStorage.settings);
		 	datapackage = $localStorage.settings;
			console.log('datapackage',datapackage);

		 }else{
		 	datapackage = $localStorage.settings;
		 	console.log('$localStorage.settings',$localStorage.settings);
		 }
//		 $scope.datapackage = datapackage;
		 console.log("=====datapackage=====",datapackage);
		 console.log($stateParams.id +"<======>"+$stateParams.name);
		
		if (typeof($scope.datapackage) === "undefined")
		 {
		 	if(JSON.stringify(hotRentService.get()) != "{}"){
		 	$localStorage.settings = hotRentService.get();
		 	console.log('$localStorage.settings',$localStorage.settings);
		 	datapackage = $localStorage.settings;
			console.log('datapackage',datapackage);
		 }else{
		 	datapackage = $localStorage.settings;
		 	console.log('$localStorage.settings',$localStorage.settings);
		 }
		}
		  _Data = getDataCommonService.get();
			if (_Data.id ==='ShareSave') {
				$scope.datapackage = _Data.data;
			 console.log("=====datapackage=====",datapackage);
			angular.forEach($scope.datapackage, function(data,index,array){
					 //data等价于array[index]
					 console.log("ER_ID",data.SRID);
					 if($stateParams.id==data.SRID){
						 $scope.detailsData = data;
					 }
				 });
			}else {
				$scope.datapackage = datapackage;
			  console.log("=====datapackage=====",datapackage);
			 angular.forEach($scope.datapackage, function(data,index,array){
						//data等价于array[index]
						console.log("ER_ID",data.ER_ID);
						if($stateParams.id==data.ER_ID){
							$scope.detailsData = data;
						}
					});
			}

		console.log("$scope.datapackage======>",$scope.datapackage );
		/******************display the features data passed through home starts*****************/
			 if($scope.detailsData.ER_Feature!=""){
			 var str = $scope.detailsData.ER_Feature + "";
			 ER_Feature = str.split(";");
			//  ER_Feature = ER_Feature.pop();// there is something needed to be changed here
			 for (var j = 0; j<ER_Feature.length;j++) {
				//  console.log(ER_Feature[j]);
				switch (ER_Feature[j])
					{
						case "girl_only":
						 $scope.girl_only = true;
						break;
						case "boy_only":
					 $scope.boy_only = true;
					 break;
						case "furniture":
					 $scope.furniture = true;
					 break;
						case "laundry":
					 $scope.laundry = true;
					 break;
						case "full_kitchen":
					 $scope.full_kitchen = true;
					 break;
						case "coffee_bar":
					 $scope.coffee_bar = true;
					 break;
						case "aircondition":
					 $scope.aircondition = true;
					 break;
					 case "media":
						 $scope.media = true;
						break;
					 case "no_smoking":
						 $scope.no_smoking = true;
							break;
						 case "no_pets":
								 $scope.no_pets = true;
						 break;
					}
				 }
			 }
/******************display the features data passed through home ends*****************/

		/**************************Advertisements carousel********************************/
		$scope.myInterval = 5000;
	    var slides = $scope.slides = [];
	    $scope.addSlide = function() {
	      slides.push({
	        image: 'img/c' + slides.length + '.jpg',
	        text: ['Carousel text #0','Carousel text #1','Carousel text #2','Carousel text #3'][slides.length % 4]
	      });
	    };
	    for (var i=0; i<4; i++) {
	      $scope.addSlide();
	    }

		/****************************************************************/

		/******************details page map starts******************************/
		var vm = this;
		$scope.center = '';
		NgMap.getMap().then(function(map) {
			vm.map = map;
		});
		 $scope.locations = [
					{
						id: 'property',
						center: $scope.detailsData.ER_No+' '+$scope.detailsData.ER_St+' '+$scope.detailsData.ER_Suburb+','+$scope.detailsData.ER_Region,
						position: $scope.detailsData.ER_No+' '+$scope.detailsData.ER_St+' '+$scope.detailsData.ER_Suburb+','+$scope.detailsData.ER_Region
					},
					{
						id: 'company',
						center: '84 pitt street Sydney NSW',
						position: '84 pitt street Sydney NSW'
					}
				];
				$scope.center = $scope.locations[0].center;
				$scope.showDetail = function() {
						$scope.center = $scope.locations[1].center;
				};
				$scope.goback = function() {
						$scope.center = $scope.locations[0].center;
				};
				$scope.gotoAnchor = function(company) {
	      var newHash = company;
	      if ($location.hash() !== newHash) {
	        // set the $location.hash to `newHash` and
	        // $anchorScroll will automatically scroll to it
	        $location.hash(company);
	      } else {
	        // call $anchorScroll() explicitly,
	        // since $location.hash hasn't changed
	        $anchorScroll();
	      }
	    };
		/******************details page map******************************/

		/************print web page*****************/
		$scope.printDiv = function (div){
			var printContents = document.getElementById(div);
            var popupWin = window.open('', '_blank', 'width=880,height=800,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no,top=200,bottom=200');
            popupWin.window.focus();
            popupWin.document.open();
            popupWin.document.write('<!DOCTYPE html><html><head><title>TITLE OF THE PRINT OUT</title>'
																		+'<link rel="stylesheet" type="text/css" href="/fonts/css/font-awesome.min.css" />'
																		+'<link rel="stylesheet" type="text/css"  href="/font/flaticon.css" />'
																		+'<link rel="stylesheet" type="text/css"  href="css/winning/app.css" />'
																		+'<link rel="stylesheet" type="text/css" media="print" href="css/winning/print.css" />'
																		+'<script src="vendor/angular/angular.js"></script>'
                                    +'</head><body onload="window.print(); "><div>');
                                    popupWin.document.write(printContents.innerHTML);
																		popupWin.document.write('</div></body></html>');
																		popupWin.focus();
																		// popupWin.print();
																		// popupWin.close();
																	  popupWin.document.close();
		}
		/*******************************/



		/****************************add shortlist**********************************/

		   	$scope.addShortlist = function (){
		   		$http.get('/customer/profile')
				.then(function(r) {
					console.log(r);
					if(r.data.customer_login_status){
						$scope.shortlistInsert.CID = $scope.detailsData.CID;
						$scope.shortlistInsert.CLType="FavorSave";
						$scope.shortlistInsert.CLDetail=$scope.detailsData.ER_ID+'';
						$scope.shortlistInsert.CLTime=utilConvertDateToString.getDateToString(new Date(),"yyyy-MM-dd hh:mm:ss");
						console.log("shortlistInsert",$scope.shortlistInsert);
						$http.post('/customer/shortlist/insert', $scope.shortlistInsert)
								.then(function(r){
									console.log('r',r);
								},function(e){
									console.log("数据有误");
								});
					}else{
						$state.go('app.login');
					}
				},function(e){
						console.log("数据有误");
					})

			}
	   	/****************************add shortlist end**********************************/
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
			/********************************************/
				$scope.wechatShow = false;
				$scope.showWechat = function(){
					$scope.wechatShow = !$scope.wechatShow;
					$rootScope.$broadcast('wechat', $scope.wechatShow);
				}
			/********************************************/
				/************************contactus modal starts*************************/
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
	})
	.controller('ModalInstanceCtrl', ['$http','$scope', '$modalInstance', 'items','utilConvertDateToString', function($http,$scope, $modalInstance,items,utilConvertDateToString) {
	    $scope.contact = {};
	    $scope.customer = {};
		$scope.saveEnvelope = function(){
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
.directive('rentrecommend', ['readData','$timeout','$localStorage', 'mouseEvent', 'hotRentService',function(readData, $timeout,$localStorage,mouseEvent,hotRentService) {
		return {
			restrict: 'EA',
			templateUrl: '/partials/mydirectives/directive-hotrent.html',
			scope: {
			},
			link: function(scope, element, attr) {
				scope.imageid = 4;
				scope.left = 0;
				var datapackage = {};
				scope.datapackage = {};
//				var promise = readData.query();
				var step = 0;
				var time = null;
//				promise.then(function(data) {
//
//				});
				if(JSON.stringify(hotRentService.get()) != "{}"){
				 	$localStorage.hotrent = hotRentService.get();
				 	console.log('$localStorage.hotrent',$localStorage.hotrent);
				 	datapackage = $localStorage.hotrent;
				 	scope.datapackage = datapackage;
					console.log('datapackage',datapackage);
				 }else{
				 	datapackage = $localStorage.hotrent;
				 	console.log('$localStorage.hotrent',$localStorage.hotrent);
				 }
				angular.forEach(datapackage, function(data,index,array){
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
				scope.carouselimages = datapackage;
				console.log("scope.carouselimages",scope.carouselimages);

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
.directive('imagelunbo',['SearchService','getDataCommonService','$timeout','$localStorage','$stateParams','mouseEvent' ,'hotRentService',function (SearchService,getDataCommonService,$timeout,$localStorage,$stateParams,mouseEvent,hotRentService) {
  return{
   restrict:'EA',
   templateUrl:'/partials/mydirectives/directive-lunbo.html',
   css: 'css/winning/details.css',
   scope:{},
   link: function (scope, element, attr) {
    var datapackage = {};
		var _Data = {};
	scope.detailsData = {};
	scope.indexNum = 0;
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
	  console.log("scope.datapackage" +"<======>"+scope.datapackage);
	 if (typeof(scope.datapackage) === "undefined")
	 {
	 	if(JSON.stringify(hotRentService.get()) != "{}"){
	 	$localStorage.settings = hotRentService.get();
	 	console.log('$localStorage.settings',$localStorage.settings);
	 	datapackage = $localStorage.settings;
		console.log('datapackage',datapackage);
	 }else{
	 	datapackage = $localStorage.settings;
	 	console.log('$localStorage.settings',$localStorage.settings);
	 }
	 scope.datapackage = datapackage;
	 }
	 _Data = getDataCommonService.get();
	 if (_Data.id ==='ShareSave') {
		 $scope.datapackage = _Data.data;
		console.log("=====datapackage=====",datapackage);
	 angular.forEach($scope.datapackage, function(data,index,array){
				//data等价于array[index]
				console.log("ER_ID",data.SRID);
				if($stateParams.id==data.SRID){
					$scope.detailsData = data;
				}
			});
	 }else {
		 angular.forEach(datapackage, function(data,index,array){
  		//data等价于array[index]
  		//console.log("ER_ID",data.ER_ID);
  		if($stateParams.id==data.ER_ID){
  			scope.detailsData = data;
  		//alert($stateParams.id);
  		}
  	});
	 }

	var step = 0;
	var time = null;
	var stepFun = function() {
		step = step % scope.detailsData.picset.length;
		scope.pic = step;
		element.find("li").removeClass("active");
		element.find("li").eq(scope.pic-1).addClass("active");
		step++;
		time = $timeout(function() {
			stepFun();
		}, 5000);
	};
	stepFun();
	/*点击事件*/
	scope.clickEvent = function(number) {
		$timeout.cancel(time);
//		$timeout.clear(time);
		scope.pic = number;
//		alert(number);
		element.find("li").removeClass("active");
		element.find("li").eq(number).addClass("active");
		step = number;
	};
	scope.next = function (){
		$timeout.cancel(time);
		step ++;
		step = step % scope.detailsData.picset.length;
		scope.pic = step;
		element.find("li").removeClass("active");
		element.find("li").eq(step).addClass("active");

	}
	scope.prev = function (){
		$timeout.cancel(time);
		if(step-- !=0)
		{
			step--;
		}else {
			step = 0;
		}
		step = step % scope.detailsData.picset.length;
		scope.pic = step;
		element.find("li").removeClass("active");
		element.find("li").eq(step).addClass("active");

	}
	/*鼠标移除动画重新开始*/
	scope.start = function() {
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
