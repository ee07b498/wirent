;
(function() {
	'use strict';
	angular.module('listpage', [])
		.filter('propsFilter', function() {
		    return function(items, props) {
		        var out = [];
		
		        if (angular.isArray(items)) {
		          items.forEach(function(item) {
		            var itemMatches = false;
		
		            var keys = Object.keys(props);
		            for (var i = 0; i < keys.length; i++) {
		              var prop = keys[i];
		              var text = props[prop].toLowerCase();
		              if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
		                itemMatches = true;
		                break;
		              }
		            }
		
		            if (itemMatches) {
		              out.push(item);
		            }
		          });
		        } else {
		          // Let the output be the input untouched
		          out = items;
		        }
		
		        return out;
		    };
		})
		.controller('listPageCtrl', ['$scope', 
			'$log','$timeout','$http',
			'$cookies','$rootScope','$localStorage',
			'SearchService','updateService',
			function($scope,$log,$timeout,
			$http,$cookies,$rootScope,
			$localStorage,SearchService,
			updateService) {
			var entireData = {};
			var datafromhome = {};
			$scope.totalItems = 64;
		    $scope.currentPage = 4;
		    $scope.setPage = function (pageNo) {
		      $scope.currentPage = pageNo;
		    };
		    $scope.pageChanged = function() {
		      $log.info('Page changed to: ' + $scope.currentPage);
		    };
		    $scope.maxSize = 5;
		    $scope.bigTotalItems = 175;
		    $scope.bigCurrentPage = 1;
		   /* location input*/
		    $scope.person = {};
	        $scope.people = [
	        { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
	        { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
	        { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
	        { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
	        { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
	        { name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
	        { name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
	        { name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
	        { name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
	        { name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
	        ];
	        /*the other filter attributes*/
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
		      $scope.dt =new Date() ;
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
				/*update submit*/
				$scope.update = function(){
					alert("updated");
				}
				
		/**
		 * resolve the data passed through factory service from home page
		 */
		 if(JSON.stringify(SearchService.get()) != "{}"){
			 	$localStorage.settings = SearchService.get().data;
			 	console.log('$localStorage.settings',$localStorage.settings);
			 	entireData = $localStorage.settings;
				console.log('entireData',entireData);
			 }else{
			 	entireData = $localStorage.settings;
			 	console.log('$localStorage.settings other conditions',$localStorage.settings);
			 }
			 $scope.entireData=entireData;
		 if(JSON.stringify(updateService.get()) != "{}"){
				$localStorage.datafromhome=updateService.get();
				datafromhome=$localStorage.datafromhome;
		 		console.log('updateService.get()',updateService.get());
				 }else{
				 	datafromhome=$localStorage.datafromhome;
				 	console.log('$localStorage.datafromhome',datafromhome);
				 }
				  $scope.datafromhome=datafromhome;
		/**
		 * filter update code starts
		 */
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
				
					//alert("updated");
					console.log("vm.shops",vm.shops);
				}
		/**
		 * filter update code ends
		 */
	}])
})();