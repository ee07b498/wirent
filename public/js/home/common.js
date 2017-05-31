;
(function() {
	'use strict';
	angular.module('home', ['ui.bootstrap'])
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
		.factory('SearchService', function() {
			var savedData = {}

			function set(data) {
				savedData = data;
			}

			function get() {
				return savedData;
			}

			return {
				set: set,
				get: get
			}

		})
		.factory('updateService', function() {
			var savedData = {}

			function set(data) {
				savedData = data;
			}

			function get() {
				return savedData;
			}

			return {
				set: set,
				get: get
			}

		})
		.directive('animatesearch', ['$timeout', function($timeout) {
			return {
				restrict: 'EA',
				templateUrl: '/partials/mydirectives/directive-search.html',
				//			   css: 'css/winning/new.css',
				scope: {
					tips : '=',
					features : '=',
					boxshow : '=',
					openmodal : "&"
				},
				controller: function($scope) {
//					$scope.openmodal();
				},
				link: function(scope, element, attr) {
//					scope.openmodal();
					scope.tips=false;
					scope.features=false;
					scope.boxshow=true;
					/*点击事件*/
					scope.clickEvent = function(event) {
						var left = 0;
						var opacity=0;
						left = left + 63 * event;
						if(event == 0) {
							left = 0;
							opacity=1;
							scope.tips=false;
							scope.features=false;
							scope.boxshow=true;
							element.find("i").css({'opacity': 1,'left': left + 56 + 'px'});
						} else if(event == 1) {
							left = 64;
							opacity=1;
							scope.tips=false;
							scope.features=false;
							scope.boxshow=true;
							element.find("i").css({'opacity': 1,'left': left + 56 + 'px'});
						}
						 else if(event == 2) {
							left = 130;
							opacity=1;
							scope.tips=false;
							scope.features=false;
							scope.boxshow=true;
							element.find("i").css({'opacity': 1,'left': left + 56 + 'px'});
						}
						  else if(event == 3) {
							left = 186;
							opacity=1;
							scope.tips=true;
							scope.features=false;
							scope.boxshow=false;
							element.find("i").css({'opacity': 0,'left': left + 56 + 'px'});
						}
						   else if(event == 4) {
							left = 256;
							opacity=1;
							scope.tips=false;
							scope.features=true;
							scope.boxshow=false;
							element.find("i").css({'opacity': 0,'left': left + 56 + 'px'});
						}
						 else if(event == 5) {
						 	left = 334;
						 	opacity=1;
							scope.tips=false;
							scope.features=false;
							scope.boxshow=true;
							element.find("i").css({'opacity': 1,'left': left + 56 + 'px'});
						}
						element.find("li").removeClass("selected");
						element.find("li").eq(event).addClass("selected");
						/*element.find("i").css({
							'left': left + 56 + 'px'
						});*/
					};
				}
			}
		}])
		.directive('selectSearch', function($compile) {
			return {
				restrict: 'AE', //attribute or element  
				scope: {
					datas: '=',
					x: '=',
					//bindAttr: '='
					searchField: '=bind',
					getData: "&",
					change: "&"
				},
				controller: function($scope) {
					$scope.getData();
					$scope.change();
				},
				template: '<input type = "test"' +
					'class="input-lg form-control" autocomplete="off" name="inputStr" data-val="true" data-val-required="Please choose a location to search." ng-minlength="2"  placeholder="Search by suburb, region, postcode or address" type="text"' +
					'ng-change="changeKeyValue(searchField)" ng-keyup="getData({val:searchField})" ng-model="searchField" ' +
					' value="{{searchField}}" style="width:605px; height:55px;border:none"/>' +
					'<div  ng-hide="hidden" style = "position:absolute; top:55px; z-index: 1000;">' +
					'   <select style = "width:605px; border:none;border-bottom-left-radius:2px;border-bottom-right-radius:4px; overflow-x:hidden;" ng-change="change(x)" ng-model="x" multiple>' +
					'       <option ng-repeat="data in datas track by $index" style="padding-left:16px;padding-bottom:10px">{{data}}</option>' +
					'   </select>' +
					'</div>',
				//    replace: true,  overflow-y:hidden;remove the y-direction overflow-hidden
				link: function($scope, elem, attr, ctrl) {
					$scope.getData();
					$scope.change();
					$scope.tempdatas = $scope.datas; //下拉框选项副本  
					$scope.hidden = true; //选择框是否隐藏  
					$scope.searchField = ''; //文本框数据  
					//将下拉选的数据值赋值给文本框  
					$scope.change = function(x) {
						$scope.searchField = x;
						$scope.hidden = true;
					}
					//获取的数据值与下拉选逐个比较，如果包含则放在临时变量副本，并用临时变量副本替换下拉选原先的数值，如果数据为空或找不到，就用初始下拉选项副本替换  
					$scope.changeKeyValue = function(v) {

						var newDate = []; //临时下拉选副本  
						//如果包含就添加  
						angular.forEach($scope.datas, function(data, index, array) {
							if((data + "").indexOf(v) >= 0) {
								newDate.unshift(data);
							}
						});
						//用下拉选副本替换原来的数据  
						$scope.datas = newDate;
						//下拉选展示  
						$scope.hidden = false;
						//如果不包含或者输入的是空字符串则用初始变量副本做替换  
						if($scope.datas.length == 0 || '' == v) {
							$scope.datas = $scope.tempdatas;
						}
						console.log($scope.datas);
					}
				}
			};
		})
		.directive('hotrent', ['readData','$timeout', 'mouseEvent', function(readData, $timeout, mouseEvent) {
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
		.service('commonHeader', ['$scope', function() {
			
			
		}])
		.controller('HomeController', [
			'$cookies',
			'$rootScope',
			'$state',
			'$scope',
			'$element',
			'$http',
			'SearchService',
			'updateService',
			'$modal', 
			'$log',
			function($cookies, $rootScope, $state, $scope, $element, $http, SearchService, updateService,$modal,$log) {
				var hello = true;
				//						var address = {};
				var active = true;
				var data = {};
				var count = 0;
				var regions = {};
				var business = {};
				$scope.datas = []; //下拉框选项
				var entireData = {};
				var ER_Feature = '';
				//model types
				$scope.myMode = 'Entire';
				$scope.Modes = [{
					id: 1,
					name: 'Entire'
				}, {
					id: 2,
					name: 'Share'
				}, {
					id: 3,
					name: 'New Homes'
				}, {
					id: 4,
					name: 'Sold'
				}];

				// input address
				$scope.getData = function(val) {
					$scope.datas = [];
					regions = {};
					data.inputStr = val;
					if(data.inputStr && data.inputStr.length > 2) {
						$http.post('/customer/filt_address', data)
							.then(function(r) {
								console.log('r', r);
								angular.forEach(r.data, function(value, key) {
									regions.postcode = value.postcode;
									regions.region = value.region;
									regions.suburb = value.suburb;
									//									  console.log("regions",regions);
									//									  if( !$scope.datas.contains(regions.postcode))
									$scope.datas.push(regions.suburb + "," + regions.region + "," + regions.postcode);
								});

							}, function(e) {
								console.log("数据有误");
							})
					} else {
						$scope.datas = [""];
					}

				}

				// property types
				$scope.myPropertyType = '';
				$scope.propertyTypes = [{
						id: 1,
						propertyType: 'House'
					}, {
						id: 2,
						propertyType: 'Apartment'
					},
					{
						id: 3,
						propertyType: 'Unit'
					}, {
						id: 4,
						propertyType: 'Studio'
					}
				];

				//select minPrice
				$scope.myMinPrice = 0;
				$scope.minPrices = [{
					id: 1,
					price: ''
				}, {
					id: 2,
					price: '50'
				}, {
					id: 3,
					price: '100'
				}, {
					id: 4,
					price: '150'
				}, {
					id: 5,
					price: '200'
				}, {
					id: 6,
					price: '250'
				}, {
					id: 7,
					price: '300'
				}, {
					id: 8,
					price: '350'
				}, {
					id: 9,
					price: '400'
				}, {
					id: 10,
					price: '450'
				}, {
					id: 11,
					price: '500'
				}, {
					id: 12,
					price: '550'
				}, {
					id: 13,
					price: '600'
				}, {
					id: 14,
					price: '650'
				}, {
					id: 15,
					price: '700'
				}, {
					id: 16,
					price: '750'
				}, {
					id: 17,
					price: '800'
				}, {
					id: 18,
					price: '850'
				}, {
					id: 19,
					price: '900'
				}, {
					id: 20,
					price: '950'
				}, {
					id: 21,
					price: '1000'
				}, {
					id: 22,
					price: '1100'
				}, {
					id: 23,
					price: '1200'
				}, {
					id: 24,
					price: '1300'
				}, {
					id: 25,
					price: '1400'
				}, {
					id: 26,
					price: '1500'
				}, {
					id: 27,
					price: '1600'
				}, {
					id: 28,
					price: '1700'
				}, {
					id: 29,
					price: '1800'
				}, {
					id: 30,
					price: '1900'
				}];

				//select maxPrice
				$scope.myMaxPrice = 2000;
				$scope.maxPrices = [{
					id: 1,
					price: ''
				}, {
					id: 2,
					price: '50'
				}, {
					id: 3,
					price: '100'
				}, {
					id: 4,
					price: '150'
				}, {
					id: 5,
					price: '200'
				}, {
					id: 6,
					price: '250'
				}, {
					id: 7,
					price: '300'
				}, {
					id: 8,
					price: '350'
				}, {
					id: 9,
					price: '400'
				}, {
					id: 10,
					price: '450'
				}, {
					id: 11,
					price: '500'
				}, {
					id: 12,
					price: '550'
				}, {
					id: 13,
					price: '600'
				}, {
					id: 14,
					price: '650'
				}, {
					id: 15,
					price: '700'
				}, {
					id: 16,
					price: '750'
				}, {
					id: 17,
					price: '800'
				}, {
					id: 18,
					price: '850'
				}, {
					id: 19,
					price: '900'
				}, {
					id: 20,
					price: '950'
				}, {
					id: 21,
					price: '1000'
				}, {
					id: 22,
					price: '1100'
				}, {
					id: 23,
					price: '1200'
				}, {
					id: 24,
					price: '1300'
				}, {
					id: 25,
					price: '1400'
				}, {
					id: 26,
					price: '1500'
				}, {
					id: 27,
					price: '1600'
				}, {
					id: 28,
					price: '1700'
				}, {
					id: 29,
					price: '1800'
				}, {
					id: 30,
					price: '1900'
				}];
				//select bedsNum
				$scope.minBedNum = 0;
				$scope.maxBedNum = 5;
				$scope.bedsNum = [{
					id: 1,
					num: ''
				}, {
					id: 2,
					num: '1'
				}, {
					id: 3,
					num: '2'
				}, {
					id: 4,
					num: '3'
				}, {
					id: 5,
					num: '4'
				}, {
					id: 6,
					num: '5'
				}];
				//select bathNum
				$scope.minBathNum = 0;
				$scope.maxBathNum = 5;
				$scope.bathsNum = [{
					id: 1,
					num: ''
				}, {
					id: 2,
					num: '1'
				}, {
					id: 3,
					num: '2'
				}, {
					id: 4,
					num: '3'
				}, {
					id: 5,
					num: '4'
				}, {
					id: 6,
					num: '5'
				}];

				//select parkingNum
				$scope.myParkingNum = 0;
				$scope.parkingsNum = [{
					id: 1,
					num: ''
				}, {
					id: 2,
					num: '0'
				}, {
					id: 3,
					num: '1'
				}, {
					id: 4,
					num: '2'
				}, {
					id: 5,
					num: '3'
				}, {
					id: 6,
					num: '4'
				}, {
					id: 7,
					num: '5'
				}];

				function SetCredentials(searchData) {
					$rootScope.globals = {
						currentData: {
							data: searchData
						}
					};
					// store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
					var cookieExp = new Date();
					cookieExp.setDate(cookieExp.getDate() + 7);
					$cookies.globals = $rootScope.globals;
				}
				//search for the results of properties
				$scope.entireSearch = function() {
					//selected items which are an array
					console.log('$scope.x',$scope.x);
					if($scope.x) {
						var address = $scope.x[0].split(",");
						console.log("xxx", address);
						entireData = {
							ER_Suburb: address[0],
							ER_Region: address[1],
							ER_Type: $scope.myPropertyType,
							ER_PriceMin: $scope.myMinPrice,
							ER_PriceMax: $scope.myMaxPrice,
							ER_BedRoomMin: $scope.minBedNum,
							ER_BedRoomMax: $scope.maxBedNum,
							ER_BathRoomMin: $scope.minBathNum,
							ER_BathRoomMax: 10,
							ER_ParkingMin: $scope.myParkingNum,
							ER_ParkingMax: 10,
							ER_AreaMin: 0,
							ER_AreaMax: 50000,
							ER_AvailableDate: '2200-01-01',
							ER_Description:'',
							ER_Feature: ER_Feature
						};
					} else {
						entireData = {
							ER_Suburb: '',
							ER_Region: '',
							ER_Type: $scope.myPropertyType,
							ER_PriceMin: $scope.myMinPrice,
							ER_PriceMax: $scope.myMaxPrice,
							ER_BedRoomMin: $scope.minBedNum,
							ER_BedRoomMax: $scope.maxBedNum,
							ER_BathRoomMin: $scope.minBathNum,
							ER_BathRoomMax: 10,
							ER_ParkingMin: $scope.myParkingNum,
							ER_ParkingMax: 10,
							ER_AreaMin: 0,
							ER_AreaMax: 5000,
							ER_AvailableDate: '2200-01-01',
							ER_Description:'',
							ER_Feature: ER_Feature
						}
					}

					// $state.go('app.googlemap');
					console.log(entireData);
					$http.post('/customer/filt/entire', entireData)
						.then(function(r) {
							SearchService.set(r);
							updateService.set(entireData);
							//							SetCredentials(r);
							console.log('r===>', r);
							if(r.data.length > 0) {
								$state.go('app.googlemap');
							}
							//							

						}, function(e) {

						});
				}
				/**
				 * features update code starts
				 */
				//all_requirements
				// colum1
				$scope.nosmoking = function (){
					$scope.no_smoking = !$scope.no_smoking;
					if($scope.no_smoking==true &&$scope.no_pets==true&&$scope.girl_only==true&&$scope.boy_only==true&&$scope.no_party==true)
					{
						$scope.all_requirements = true;
					}else if($scope.no_smoking==false || $scope.no_pets==false || $scope.girl_only==false || $scope.boy_only==false || $scope.no_party==false){
						$scope.all_requirements = false;
					}
				}
				$scope.nopets = function (){
					$scope.no_pets = !$scope.no_pets;
					if($scope.no_smoking==true&&$scope.no_pets==true&&$scope.girl_only==true&&$scope.boy_only==true&&$scope.no_party==true)
					{
						$scope.all_requirements = true;
					}else if($scope.no_smoking==false || $scope.no_pets==false || $scope.girl_only==false || $scope.boy_only==false || $scope.no_party==false){
						$scope.all_requirements = false;
					}
				}
				$scope.girlonly = function (){
					$scope.girl_only = !$scope.girl_only;
					if($scope.no_smoking==true&&$scope.no_pets==true&&$scope.girl_only==true&&$scope.boy_only==true&&$scope.no_party==true)
					{
						$scope.all_requirements = true;
					}else if($scope.no_smoking==false || $scope.no_pets==false || $scope.girl_only==false || $scope.boy_only==false || $scope.no_party==false){
						$scope.all_requirements = false;
					}
				}
				$scope.boyonly = function (){
					$scope.boy_only = !$scope.boy_only;
					if($scope.no_smoking==true&&$scope.no_pets==true&&$scope.girl_only==true&&$scope.boy_only==true&&$scope.no_party==true)
					{
						$scope.all_requirements = true;
					}else if($scope.no_smoking==false || $scope.no_pets==false || $scope.girl_only==false || $scope.boy_only==false || $scope.no_party==false){
						$scope.all_requirements = false;
					}
				}
				$scope.noparty = function (){
					$scope.no_party = !$scope.no_party;
					if($scope.no_smoking==true&&$scope.no_pets==true&&$scope.girl_only==true&&$scope.boy_only==true&&$scope.no_party==true)
					{
						$scope.all_requirements = true;
					}else if($scope.no_smoking==false || $scope.no_pets==false || $scope.girl_only==false || $scope.boy_only==false || $scope.no_party==false){
						$scope.all_requirements = false;
					}
				}
				
				$scope.col_requirements = function(){
					$scope.all_requirements = !$scope.all_requirements;
					
					if($scope.all_requirements)
					{
						$scope.no_smoking = true;
						$scope.no_pets = true;
						$scope.girl_only = true;
						$scope.boy_only = true;
						$scope.no_party = true;
					}
					else{
						$scope.no_smoking = false;
						$scope.no_pets = false;
						$scope.girl_only = false;
						$scope.boy_only = false;
						$scope.no_party = false;
					}
					
				}
				// colum2
				//appliances
				$scope.stove_click = function (){
					$scope.stove = !$scope.stove;
					if($scope.stove==true &&$scope.dishwasher==true&&$scope.dryer==true&&$scope.aircondition==true)
					{
						$scope.appliances = true;
					}else if($scope.stove==false || $scope.dishwasher==false || $scope.dryer==false || $scope.aircondition==false){
						$scope.appliances = false;
					}
				}
				$scope.dishwasher_click = function (){
					$scope.dishwasher = !$scope.dishwasher;
					if($scope.stove==true &&$scope.dishwasher==true&&$scope.dryer==true&&$scope.aircondition==true)
					{
						$scope.appliances = true;
					}else if($scope.stove==false || $scope.dishwasher==false || $scope.dryer==false || $scope.aircondition==false){
						$scope.appliances = false;
					}
				}
				$scope.dryer_click = function (){
					$scope.dryer = !$scope.dryer;
					if($scope.stove==true &&$scope.dishwasher==true&&$scope.dryer==true&&$scope.aircondition==true)
					{
						$scope.appliances = true;
					}else if($scope.stove==false || $scope.dishwasher==false || $scope.dryer==false || $scope.aircondition==false){
						$scope.appliances = false;
					}
				}
				$scope.aircondition_click = function (){
					$scope.aircondition = !$scope.aircondition;
					if($scope.stove==true &&$scope.dishwasher==true&&$scope.dryer==true&&$scope.aircondition==true)
					{
						$scope.appliances = true;
					}else if($scope.stove==false || $scope.dishwasher==false || $scope.dryer==false || $scope.aircondition==false){
						$scope.appliances = false;
					}
				}
				
				$scope.col_appliances = function(){
					$scope.appliances = !$scope.appliances;
					if($scope.appliances)
					{
						$scope.stove = true;
						$scope.dishwasher = true;
						$scope.dryer = true;
						$scope.aircondition = true;
					}
					else{
						$scope.stove = false;
						$scope.dishwasher = false;
						$scope.dryer = false;
						$scope.aircondition = false;
					}
//					$scope.appliances = $scope.stove&&$scope.dishwasher&&$scope.dryer;
				}
				//furniture
				// colum3
				$scope.bed_click = function (){
					$scope.bed = !$scope.bed;
					if($scope.bed==true &&$scope.desk==true&&$scope.wardrob==true)
					{
						$scope.furniture = true;
					}else if($scope.bed==false || $scope.desk==false || $scope.wardrob==false){
						$scope.furniture = false;
					}
				}
				$scope.desk_click = function (){
					$scope.desk = !$scope.desk;
					if($scope.bed==true &&$scope.desk==true&&$scope.wardrob==true)
					{
						$scope.furniture = true;
					}else if($scope.bed==false || $scope.desk==false || $scope.wardrob==false){
						$scope.furniture = false;
					}
				}
				$scope.wardrob_click = function (){
					$scope.wardrob = !$scope.wardrob;
					if($scope.bed==true &&$scope.desk==true&&$scope.wardrob==true)
					{
						$scope.furniture = true;
					}else if($scope.bed==false || $scope.desk==false || $scope.wardrob==false){
						$scope.furniture = false;
					}
				}
				
				$scope.col_furniture = function(){
					$scope.furniture = !$scope.furniture;
					if($scope.furniture)
					{
						$scope.bed = true;
						$scope.desk = true;
						$scope.wardrob = true;
					}
					else{
						$scope.bed = false;
						$scope.desk = false;
						$scope.wardrob = false;
					}
				}
				// colum4
				//other_appliance
				$scope.refrigerator_click = function (){
					$scope.refrigerator = !$scope.refrigerator;
					if($scope.refrigerator==true &&$scope.laundry==true)
					{
						$scope.other_appliance = true;
					}else if($scope.refrigerator==false || $scope.laundry==false){
						$scope.other_appliance = false;
					}
				}
				$scope.laundry_click = function (){
					$scope.laundry = !$scope.laundry;
					if($scope.refrigerator==true &&$scope.laundry==true)
					{
						$scope.other_appliance = true;
					}else if($scope.refrigerator==false || $scope.laundry==false){
						$scope.other_appliance = false;
					}
				}
				
				
				$scope.col_other_appliance = function(){
					$scope.other_appliance = !$scope.other_appliance;
					if($scope.other_appliance)
					{
						$scope.refrigerator = true;
						$scope.laundry = true;
					}
					else{
						$scope.refrigerator = false;
						$scope.laundry = false;
					}
				}
				// colum5
				//other_essential
				$scope.wifi_click = function (){
					$scope.wifi = !$scope.wifi;
					if($scope.wifi==true &&$scope.gas==true)
					{
						$scope.other_essential = true;
					}else if($scope.wifi==false || $scope.gas==false){
						$scope.other_essential = false;
					}
				}
				$scope.gas_click = function (){
					$scope.gas = !$scope.gas;
					if($scope.wifi==true &&$scope.gas==true)
					{
						$scope.other_essential = true;
					}else if($scope.wifi==false || $scope.gas==false){
						$scope.other_essential = false;
					}
				}
				$scope.col_other_essential = function(){
					$scope.other_essential = !$scope.other_essential;
					if($scope.other_essential)
					{
						$scope.wifi = true;
						$scope.gas = true;
					}
					else{
						$scope.wifi = false;
						$scope.gas = false;
					}
				}
				
				
		/***************************features update ends *******************************************/
		
		/*******************************************************************************************
		 * search by different features
		 *******************************************************************************************/
		$scope.features_Submit = function(){
//			alert($scope.wardrob);
			var arr_key = [$scope.stove,$scope.dishwasher,
							$scope.dryer,$scope.aircondition,
							$scope.refrigerator,$scope.laundry,$scope.bed,$scope.desk,
							$scope.wardrob,$scope.wifi,$scope.gas,$scope.no_smoking,$scope.no_pets,
							$scope.girl_only,$scope.boy_only,$scope.no_party];
			var arr_value = ["stove","dishwasher","dryer","aircondition","refrigerator"
								,"laundry","bed","desk","wardrob","wifi","gas","no_smoking",
								"no_pets","girl_only","boy_only","no_party"];
			var arr_features = [];
			for(var i=0;i<arr_key.length;i++){
				if(arr_key[i]){
					arr_features.push("%"+arr_value[i]+";");
				}
			}
			if(arr_features.length==0){
				arr_features.push("");
			}
			ER_Feature = arr_features.join('');
			entireData = {
							ER_Suburb: '',
							ER_Region: '',
							ER_Type: $scope.myPropertyType,
							ER_PriceMin: $scope.myMinPrice,
							ER_PriceMax: 10000,
							ER_BedRoomMin: $scope.minBedNum,
							ER_BedRoomMax: 20,
							ER_BathRoomMin: $scope.minBathNum,
							ER_BathRoomMax: 10,
							ER_ParkingMin: $scope.myParkingNum,
							ER_ParkingMax: 10,
							ER_AreaMin: 0,
							ER_AreaMax: 50000,
							ER_AvailableDate: '2200-01-01',
							ER_Description:'',
							ER_Feature: ER_Feature
						}
			console.log("arr_features",arr_features.join(''));
			$http.post('/customer/filt/entire', entireData)
						.then(function(r) {
							SearchService.set(r);
							updateService.set(entireData);
							//SetCredentials(r);
							console.log('r===>', r);
							if(r.data.length > 0) {
//								$state.go('app.listpage');
								$state.go('app.googlemap');
							}
							//							

						}, function(e) {

						});
		}
				
				
		/*****************theme title search********************************************************/
				$scope.search = function(keywords) {
//					console.log($scope.x);
//					alert(keywords);
					if($scope.x) {
						var address = $scope.x[0].split(",");
//						console.log("xxx", address);
						entireData = {
							ER_Suburb: address[0],
							ER_Region: address[1],
							ER_Type: $scope.myPropertyType,
							ER_PriceMin: $scope.myMinPrice,
							ER_PriceMax: $scope.myMaxPrice,
							ER_BedRoomMin: $scope.minBedNum,
							ER_BedRoomMax: $scope.maxBedNum,
							ER_BathRoomMin: $scope.minBathNum,
							ER_BathRoomMax: 5,
							ER_ParkingMin: $scope.myParkingNum,
							ER_ParkingMax: 5,
							ER_AreaMin: 0,
							ER_AreaMax: 5000,
							ER_AvailableDate: '2020-01-01',
							ER_Description:'%'+keywords+';',
							ER_Feature: ER_Feature
						};
					} else {
						entireData = {
							ER_Suburb: '',
							ER_Region: '',
							ER_Type: $scope.myPropertyType,
							ER_PriceMin: $scope.myMinPrice,
							ER_PriceMax: $scope.myMaxPrice,
							ER_BedRoomMin: $scope.minBedNum,
							ER_BedRoomMax: $scope.maxBedNum,
							ER_BathRoomMin: $scope.minBathNum,
							ER_BathRoomMax: 5,
							ER_ParkingMin: $scope.myParkingNum,
							ER_ParkingMax: 5,
							ER_AreaMin: 0,
							ER_AreaMax: 5000,
							ER_AvailableDate: '2020-01-01',
							ER_Description:'%'+keywords+';',
							ER_Feature: ER_Feature
						}
					}

					// $state.go('app.googlemap');
					console.log(entireData);
					$http.post('/customer/filt/entire', entireData)
						.then(function(r) {
							SearchService.set(r);
							updateService.set(entireData);
							//SetCredentials(r);
							console.log('r===>', r);
							if(r.data.length > 0) {
//								$state.go('app.listpage');
								$state.go('app.listpage');
							}
							//							

						}, function(e) {

						});
				}
		/*****************theme title search ends********************************************************/
		
		
		/**************************************商家专区 starts****************************************************/
				$scope.businessSearch = function(TPDetail){
					business.TPDetail = TPDetail;
					business.TPServLoc = '';
					$http.post('/customer/filt_thirdparty', business)
						.then(function(r) {
							SearchService.set(r);
							console.log('r===>', r);
							if(r.data.length > 0) {
								$state.go('app.business');
							}
							//							

						}, function(e) {

						});
				}
		/**************************************商家专区 ends****************************************************/
		
				/****************************datepicker control code************************************/
				$scope.today = function() {
					$scope.dt = new Date();
				};
				$scope.today();

				$scope.clear = function() {
					$scope.dt = null;
				};

				// Disable weekend selection
				/*$scope.disabled = function(date, mode) {
				  return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
				};*/

				$scope.toggleMin = function() {
					$scope.minDate = $scope.minDate ? null : new Date();
				};
				$scope.toggleMin();

				$scope.open = function($event) {
					$event.preventDefault();
					$event.stopPropagation();

					$scope.opened = true;
				};

				$scope.dateOptions = {
					formatYear: 'yy',
					startingDay: 1,
					class: 'datepicker'
				};

				$scope.initDate = new Date('2016-15-20');
				$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
				$scope.format = $scope.formats[0];


			/**********************************modal code starts***********************************/
		    $scope.items = ['item1', 'item2', 'item3'];
		    
		    $scope.openmodal = function (size) {
//		    	alert("modal");
				
		      var modalInstance = $modal.open({
		        templateUrl: 'myModalContent.html',
		        controller: 'ModalInstanceCtrl',
		        size: size,
		        resolve: {
		         /* maps: function(){
		          	return angular.element(".subway-map").subwayMap({ debug: true });
		          },*/
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
		    /**********************************modal code starts***********************************/
			}
		])
		.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
		   
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
		  }]);
		
		
		
  
	/*.animation('.fold-animation', ['$animateCss', function($animateCss) {
	  return {
	    enter: function(element, doneFn) {
	      var left = element[0].offsetLeft;
	      return $animateCss(element, {
	        from: { height:'0px' },
	        to: { height:left + 'px' },
	        duration: 1 
	      });
	    }
	  }
	}])*/

})();