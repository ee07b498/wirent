;
(function() {
	'use strict';
	angular.module('andy')
		.factory('readJSONData', ['$http', '$q', function($http, $q) {
			return {
				query: function() {
					var deferred = $q.defer();
					$http({
						method: 'GET',
						url: 'img.json'
					}).success(function(data, status, header, config) {
						deferred.resolve(data);
					}).error(function(data, status, header, config) {
						deferred.reject(data);
					});
					return deferred.promise;
				}
			}
		}])
		.factory('readHotData', ['$http', '$q', function($http, $q) {
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
		.directive('guidehotrent', ['readHotData','$timeout', 'mouseEvent', function(readHotData, $timeout, mouseEvent) {
			return {
				restrict: 'EA',
				templateUrl: '/partials/mydirectives/directive-guidehotrent.html',
				scope: {
				},
				link: function(scope, element, attr) {
					scope.imageid = 4;
					scope.left = 0;
					var promise = readHotData.query();
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
							scope.top = scope.top+341.25;
							element.find("ul").css({
								'top': scope.top + 'px'
							});
						}
					}
					scope.next = function(){
						alert('111');
						if(scope.imageid <scope.carouselimages.length ){
							scope.imageid++;
							scope.top = scope.top-341.25;
							element.find("ul").css({
								'top': scope.top + 'px'
							});
						}
					}
				}
			}
		}])
		.controller('DocumentationCtrl', ['$scope','$animate','readJSONData','$timeout',function($scope,$animate,readJSONData,$timeout) {
			$scope.active=0;
		    $scope.myInterval = 5000;
		    $scope.guideData ={};
		    var slides = $scope.slides = [];
		     $animate.enabled(false);
		    $scope.addSlide = function() {
		      slides.push({
		        image: 'img/c' + slides.length + '.jpg',
		        text: ['Carousel text #0','Carousel text #1','Carousel text #2','Carousel text #3'][slides.length % 4]
		      });
		    };
		    for (var i=0; i<4; i++) {
		      $scope.addSlide();
		    }
		    var promise = readJSONData.query();
				promise.then(function(data) {
					$scope.guideData = data;
					console.log("=====>>>>",data);
				});
				/*$scope.valuechanged = function(str){
					alert(str);
					console.log(str);
				}
				console.log($scope.slide);*/
				var a =0;
				$scope.next =function(){
					a++;
					alert(a);
				}
				/******************************************/
				   //10 seconds delay
//		        $timeout( function(){
//		            $scope.test1 = "Hello World!";
//		        }, 5000 );
		
		        //time
		        $scope.time = 0;
		        $scope.step = 0;
		        //timer callback
		       /* var timer = function() {
		            if( $scope.time < 5000 ) {
		                $scope.time += 1000;
		                $timeout(timer, 1000);
		            }
		            $timeout.cancel(timer);
		            $scope.step++;
		            $scope.time = 0;
		            $timeout(timer, 1000);  
		        }
		        
		        $timeout(timer, 1000);  */
				/*****************************************/
				
		}])
			
		
})();