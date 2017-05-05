;(function(){
	'use strict';
	angular.module('home',['ui.bootstrap'])
				.service('commonHeader',['$scope',function(){
					var me = this;
					me.data = {};
					me.data.headerfix = true;
				}])
				.controller('HomeController',[
					'$state',
					'$scope',
					'$element',
					'$http',
					function($state,$scope,$element,$http){
					//	$scope.address="";
						$scope.active1 = true;
						var hello = true;
						var address = {};
						var active = true;
						var data = {};
						var count = 0;
						var regions = {};
					$scope.switchCheckBox1 = function(e) {  
						console.log("123");
						$scope.active1 = true;
						$scope.active2 = false;
						
				}
				$scope.switchCheckBox2 = function(e) {  
						console.log("1234");
						$scope.active1 = false;
						$scope.active2 = true;
				}
//				$scope.sDisplay = function(){
//					$scope.hello = !hello;
//				}
				//model types
				$scope.myMode = 'Entire';
				$scope.Modes = [{ id: 1, name: 'Entire' }, { id: 2, name: 'Share' }, { id: 3, name: 'New Homes' },{ id: 4, name: 'Sold' }];
				 // input address
				 
				 $scope.sendMsg = function () {
				 	regions = {};
				 	data.inputStr = $scope.inputStr;
				 	if(data.inputStr && data.inputStr.length>2 ) 	
						$http.post('/customer/filt_address', data)
							.then(function(r){
								console.log('r',r);				
									angular.forEach(r.data, function(value,key){
																			
									  regions.region = value.region;
									  regions.suburb = value.suburb;
									  
									});
									
									console.log(regions);
									
							},function(e){
								console.log("数据有误");
							})
					
				}
				
				
				// property types
			$scope.myPropertyType = '';
			$scope.propertyTypes = [{ id: 1, propertyType:''}, { id: 2,propertyType:'Apartment'},
				{ id: 3, propertyType:'Unit'},{ id: 4,propertyType:'Studio'},
				{ id: 5, propertyType:'House'}];
			
			
			
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
				$scope.minBedNum = 0;
				$scope.maxBedNum = 5;
				$scope.bedsNum = [{ id: 1, num: '' }, { id: 2, num: '1' }, { id: 3, num: '2' },{ id: 4, num: '3' }
								,{ id: 5, num: '4' },{ id: 6, num: '5' }];				
			//select bathNum
				$scope.minBathNum = 0;
				$scope.maxBathNum = 5;
				$scope.bathsNum = [{ id: 1, num: '' }, { id: 2, num: '1' }, { id: 3, num: '2' },{ id: 4, num: '3' }
								,{ id: 5, num: '4' },{ id: 6, num: '5' }];
								
			//select parkingNum
				$scope.myParkingNum = 0;
				$scope.parkingsNum = [{ id: 1, num: '' }, { id: 2, num: '0' }, { id: 3, num: '1' },{ id: 4, num: '2' }
								,{ id: 5, num: '3' },{ id: 6, num: '4' },{ id: 7, num: '5' }];
								
			//datepicker
			$scope.entireSearch = function(){
				
				data= {
				 address:$scope.address || ' ',
				 ER_Suburb:regions.suburb,
				 ER_Region:regions.region,
				 ER_Type:$scope.myPropertyType,
				 ER_PriceMin:$scope.myMinPrice,
				 ER_PriceMax:$scope.myMaxPrice,
				 ER_BedRoomMin:$scope.minBedNum,
				 ER_BedRoomMax:$scope.maxBedNum,
				 ER_BathRoomMin:$scope.minBathNum,
				 ER_BathRoomMax:$scope.maxBathNum,
				 ER_ParkingMin:$scope.myParkingNum,
				 ER_ParkingMax:5,	
				 ER_AreaMin:0,
				 ER_AreaMax:5000,
				 ER_AvailableDate:'2020-01-01',
				 ER_Description:$scope.keywords || ' '
			 }
//			 console.log(data);
			 $state.go('app.googlemap');
			
//			 console.log(me.signup_data);
					$http.post('/customer/filt/entire', data)
						.then(function(r){
							console.log('r',r);
							if (r.status)
							{
								
								$state.go('app.googlemap');
							}
							
							
						},function(e){
							
						})
			}
			 
			 //datepicker
	$scope.today = function() {
      $scope.dt = new Date();
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
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];



			}])
			

})();