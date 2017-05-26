;(function(){
	'use strict';
	angular.module('map',['ngMap','home'])
		.factory('utilConvertDateToString', ['$filter','$scope', function ($filter,$scope) {  
		    return {  
		        getDateToString: function (date, format) {  
		            if (angular.isDate(date) && angular.isString(format)) {  
		                return $filter('date')(date, format);  
		            }  
		        },  
		        getStringToDate: function (string) {  
		            if (angular.isString(string)) {  
		                return new Date(string.replace(/-/g, "-"));  
		            }  
		        }  
		    };  
		}])
	.controller('MyCtrl',function($scope,$http,$log,NgMap,$cookies,$rootScope,$localStorage,SearchService,updateService,utilConvertDateToString) {
				var shortlistInsert = {};
				var entireData = {};
				var datafromhome = {};
				var vm = this;
				NgMap.getMap().then(function(map) {
					vm.map = map;
					
				});
				vm.clicked = function() {
					alert('Clicked a link inside infoWindow');
				};
				/*
				 * when SearchService.get() has children, set the result to localstorage,
				 * when searchservice has no child, the localstorage will keep the previous 
				 * set value
				 *
				 * */
				 if(JSON.stringify(SearchService.get()) != "{}"){
				 	$localStorage.settings = SearchService.get().data;
				 	console.log('$localStorage.settings',$localStorage.settings);
				 	vm.shops = $localStorage.settings;
					console.log('vm.shops',vm.shops);
				 }else{
				 	vm.shops = $localStorage.settings;
				 	console.log('$localStorage.settings',$localStorage.settings);
				 }
				 /**
				  * parameters from search engine
				  */
				 if(JSON.stringify(updateService.get()) != "{}"){
					$localStorage.datafromhome=updateService.get();
					datafromhome=$localStorage.datafromhome;
		 		console.log('updateService.get()',updateService.get());
				 }else{
				 	datafromhome=$localStorage.datafromhome;
				 	console.log('$localStorage.datafromhome',datafromhome);
				 }
				 
				 $scope.selected = datafromhome.ER_Suburb+' '+datafromhome.ER_Region;
				 angular.forEach(vm.shops, function(data,index,array){
				//data等价于array[index]
					var dataresults = data.ER_Description.split(";");
					dataresults.pop();
					for(var i =0;i<dataresults.length;i++)
					{
						
						switch (dataresults[i])
						{
						     case "train_station":
						     	data.train_station = true;
						   	 break;
						     case "university":
								data.university = true;
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
						  /* default: 
						   		data.train_station =false;
								data.university =false;
								data.backpack =false;
								data.park =false;
								data.school =false;
								data.big_family =false;
								data.shopping_mall =false;
								data.offical_rental =false;
						      	 break;*/
						}
					}
					
				});
				console.log("数据",vm.shops);
				/*vm.shops = [{
						id: 'foo',
						name: 'FOO SHOP',
						position: 'sydney australia'
					},
					{
						id: 'bar',
						name: 'BAR SHOP',
						position: '9/20 harbourne road kingsford australia'
					},
					{
						id:vm.shopss[0].ER_ID+'',
						name:'Danestone',
						position:vm.shopss[0].ER_No+' '+vm.shopss[0].ER_St+' '+vm.shopss[0].ER_Suburb+' '+vm.shopss[0].ER_Region
					}
				];*/
				 
				  /*   vm.myInterval = 5000;
				   *   var slides = vm.slides = [];
				    vm.addSlide = function() {
				      slides.push({
				        image: 'img/b1' + slides.length + '.jpg',
				        text: ['Carousel text #0','Carousel text #1','Carousel text #2','Carousel text #3'][slides.length % 4]
				      });
				    };
				    for (var i=0; i<4; i++) {
				      vm.addSlide();
				    }*/
				    
				vm.addShortlist = function (){
					alert("clicked");
					shortlistInsert.CID = 1;
					shortlistInsert.CLType="FavorSave";
					shortlistInsert.CLDetail=vm.shop.ER_ID+'';;
					shortlistInsert.CLTime=utilConvertDateToString.getDateToString(new Date(),"yyyy-MM-dd hh:mm:ss");
					console.log("shortlistInsert",shortlistInsert);
					$http.post('/customer/shortlist/insert', shortlistInsert)
							.then(function(r){
								console.log('r',r);				
									console.log("r",r);
							},function(e){
								console.log("数据有误");
							})
				}
				vm.shop = vm.shops[0];
				vm.showDetail = function(e, shop) {
					vm.shop = shop;
					vm.map.showInfoWindow('foo-iw', shop.ER_ID+'');
				};

				vm.hideDetail = function() {
					vm.map.hideInfoWindow('foo-iw');
				};
				
				/*filter start*/
				// property types
			$scope.myPropertyType = 'Apartment';
			$scope.propertyTypes = [{ id: 1, propertyType:'House'}, { id: 2,propertyType:'Apartment'},
				{ id: 3, propertyType:'Unit'},{ id: 4,propertyType:'Studio'}];
			//select minPrice
				$scope.myMinPrice = 0;
				$scope.minPrices = [{ id: 1, price: '' }, { id: 2, price: '50' }, { id: 3, price: '100' },{ id: 4, price: '150' }
									,{ id: 5, price: '200' },{ id: 6, price: '250' },{ id: 7, price: '300' },{ id: 8, price: '350' }
									,{ id: 9, price: '400' },{ id: 10, price: '450' },{ id: 11, price: '500' },{ id: 12, price: '550' }
									,{ id: 13, price: '600' },{ id: 14, price: '650' },{ id: 15, price: '700' },{ id: 16, price: '750' }
									,{ id: 17, price: '800' },{ id: 18, price: '850' },{ id: 19, price: '900' },{ id: 20, price: '950' }
									,{ id: 21, price: '1000' },{ id: 22, price: '1100' },{ id: 23, price: '1200' },{ id: 24, price: '1300'}
									,{ id: 25, price: '1400' },{ id: 26, price: '1500' },{ id: 27, price: '1600' },{ id: 28, price: '1700' }
									,{ id: 29, price: '1800' },{ id: 30, price: '1900' }];
			//select maxPrice
				$scope.myMaxPrice = 2000;
				$scope.maxPrices = [{ id: 1, price: '' }, { id: 2, price: '50' }, { id: 3, price: '100' },{ id: 4, price: '150' }
									,{ id: 5, price: '200' },{ id: 6, price: '250' },{ id: 7, price: '300' },{ id: 8, price: '350' }
									,{ id: 9, price: '400' },{ id: 10, price: '450' },{ id: 11, price: '500' },{ id: 12, price: '550' }
									,{ id: 13, price: '600' },{ id: 14, price: '650' },{ id: 15, price: '700' },{ id: 16, price: '750' }
									,{ id: 17, price: '800' },{ id: 18, price: '850' },{ id: 19, price: '900' },{ id: 20, price: '950' }
									,{ id: 21, price: '1000' },{ id: 22, price: '1100' },{ id: 23, price: '1200' },{ id: 24, price: '1300'}
									,{ id: 25, price: '1400' },{ id: 26, price: '1500' },{ id: 27, price: '1600' },{ id: 28, price: '1700' }
									,{ id: 29, price: '1800' },{ id: 30, price: '1900' }];
			//select bedsNum
				$scope.minBedNum = '1';
				$scope.maxBedNum = '2';
				$scope.bedsNum = [{ id: 1, num: '1' }, { id: 2, num: '2' }, { id: 3, num: '3' },{ id: 4, num: '4' }
								,{ id: 5, num: '5' },{ id: 6, num: '6' }];				
			//select bathNum
				$scope.minBathNum = '0';
				$scope.maxBathNum = '2';
				$scope.bathsNum = [{ id: 1, num: '0' }, { id: 2, num: '1' }, { id: 3, num: '2' },{ id: 4, num: '3' }
								,{ id: 5, num: '4' },{ id: 6, num: '5' }];
			//select parkingNum
				$scope.minParkingNum = '0';
				$scope.maxParkingNum = '1';
				$scope.parkingsNum = [{ id: 1, num: '0' }, { id: 2, num: '1' }, { id: 3, num: '2' },{ id: 4, num: '3' }
								,{ id: 5, num: '4' },{ id: 6, num: '5' },{ id: 7, num: '6' }];
				/*end of filter*/
				
		/*datepicker start*/
			$scope.today = function() {
		      $scope.dt = utilConvertDateToString.getDateToString(new Date(),"yyyy-MM-dd") ;
		    };
		    $scope.today();
		    $scope.clear = function () {
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
		    $scope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		    $scope.format = $scope.formats[0];
				/*datepicker end*/
				
				/**
				 * filter update code starts
				 * 
				 */
				// colum1
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
				}
				// colum3
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
				/*update submit*/
				$scope.update = function(){
						alert($scope.train);
					/*console.log($scope.x);
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
							ER_BathRoomMax: $scope.maxBathNum,
							ER_ParkingMin: $scope.minParkingNum,
							ER_ParkingMax: $scope.maxParkingNum,
							ER_AreaMin: 0,
							ER_AreaMax: 5000,
							ER_AvailableDate: '2020-01-01',
							ER_Description: $scope.keywords || '',
							ER_Feature: ' '
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
							ER_Description: $scope.keywords || '',
							ER_Feature: ''
						}
					}*/

					// $state.go('app.googlemap');
					/*console.log(entireData);
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

						});*/
				
//					alert("updated");
					console.log("vm.shops",vm.shops);
				}
				/**
				 * filter update code ends
				 */
			})
		.service('googleService',['$scope',function($scope){
			var me = this;
			me.data = {};
//				alert("fixed header");
		}])
})();
