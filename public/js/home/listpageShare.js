'use strict';
	angular.module('andy')
		.controller('listPageShareCtrl', ['$scope','$animate','$log','$timeout','$http','$state','$cookies','$rootScope','$localStorage','SearchService','updateService','utilConvertDateToString','getDataService',
			function($scope,$animate,$log,$timeout,
			$http,$state,$cookies,$rootScope,
			$localStorage,SearchService,
			updateService,utilConvertDateToString,getDataService) {
			var entireData = {};
			var datafromhome = {};
			$scope.favorsave = false;
			$scope.shortlistInsert = {};
			// $scope.totalItems = 64;
		  //   $scope.currentPage = 4;
		     $animate.enabled(false);//消除carousel bug
		    var ER_Feature = [];
		    // $scope.setPage = function (pageNo) {
		    //   $scope.currentPage = pageNo;
		    // };
		    // $scope.pageChanged = function() {
		    //   $log.info('Page changed to: ' + $scope.currentPage);
		    // };
		    // $scope.maxSize = 5;
				// $scope.numPages = 2;
		    // $scope.bigTotalItems = 175;
		    // $scope.bigCurrentPage = 1;
				// $scope.itemsPerPage = 20;
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
	       	/******************************start of filter data*******************************/
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
				$scope.myMaxPrice = 10000;
				$scope.maxPrices = [{ id: 1, price: '' }, { id: 2, price: '50' }, { id: 3, price: '100' },{ id: 4, price: '150' }
									,{ id: 5, price: '200' },{ id: 6, price: '250' },{ id: 7, price: '300' },{ id: 8, price: '350' }
									,{ id: 9, price: '400' },{ id: 10, price: '450' },{ id: 11, price: '500' },{ id: 12, price: '550' }
									,{ id: 13, price: '600' },{ id: 14, price: '650' },{ id: 15, price: '700' },{ id: 16, price: '750' }
									,{ id: 17, price: '800' },{ id: 18, price: '850' },{ id: 19, price: '900' },{ id: 20, price: '950' }
									,{ id: 21, price: '1000' },{ id: 22, price: '1100' },{ id: 23, price: '1200' },{ id: 24, price: '1300'}
									,{ id: 25, price: '1400' },{ id: 26, price: '1500' },{ id: 27, price: '1600' },{ id: 28, price: '1700' }
									,{ id: 29, price: '1800' },{ id: 30, price: '1900' },{ id: 31, price: '2000' },{ id: 32, price: '3000' },{ id: 33, price: '4000' }
									,{ id: 34, price: '5000' },{ id: 35, price: '10000' }];
			//select bedsNum
				$scope.minBedNum = '1';
				$scope.maxBedNum = '10';
				$scope.bedsNum = [{ id: 1, num: '1' }, { id: 2, num: '2' }, { id: 3, num: '3' },{ id: 4, num: '4' }
								,{ id: 5, num: '5' },{ id: 6, num: '6' },{ id: 7, num: '7' },{ id: 8, num: '8' },{ id: 9, num: '9' }
								,{ id: 10, num: '10' }];
			//select bathNum
				$scope.minBathNum = '0';
				$scope.maxBathNum = '10';
				$scope.bathsNum = [{ id: 1, num: '0' }, { id: 2, num: '1' }, { id: 3, num: '2' },{ id: 4, num: '3' }
								,{ id: 5, num: '4' },{ id: 6, num: '5' },{ id: 7, num: '6' },{ id: 8, num: '7' },{ id: 9, num: '8' },{ id: 10, num: '9' },{ id: 11, num: '10' }];
			//select parkingNum
				$scope.minParkingNum = '0';
				$scope.maxParkingNum = '10';
				$scope.parkingsNum = [{ id: 1, num: '0' }, { id: 2, num: '1' }, { id: 3, num: '2' },{ id: 4, num: '3' }
								,{ id: 5, num: '4' },{ id: 6, num: '5' },{ id: 7, num: '6' },{ id: 8, num: '7' },{ id: 9, num: '8' },{ id: 10, num: '9' },{ id: 11, num: '10' }];
				$scope.minArea = 0;
				$scope.maxArea = 10000;
				/******************************end of filter data*******************************/

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
		/***resolve the data passed through factory service from home page**********************/
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
			 /***********pagination starts********************/
			 	$scope.maxSize = 5;
				$scope.totalItems = entireData.length;
				$scope.currentPage = 1;
				$scope.itemsPerPage = 20;
			/***********pagination starts********************/
		 if(JSON.stringify(updateService.get()) != "{}"){
				$localStorage.datafromhome=updateService.get();
				datafromhome=$localStorage.datafromhome;
		 		console.log('updateService.get()',updateService.get());
				 }else{
				 	datafromhome=$localStorage.datafromhome;
				 	console.log('$localStorage.datafromhome',datafromhome);
				 }
				  $scope.datafromhome=datafromhome;
			/******************display the features data passed through home*****************/
				 if(datafromhome.ER_Feature!=""){
				 	ER_Feature = datafromhome.ER_Feature.split(";");
				 ER_Feature = ER_Feature.splice(ER_Feature.length-3,2);// there is something needed to be changed here
				 for (var j = 0; j<ER_Feature.length;j++) {
				 	switch (ER_Feature[j])
						{
						     case "%stove":
						     	$scope.stove = true;
						   	 break;
						     case "%dishwasher":
								$scope.dishwasher = true;
						    break;
						     case "%dryer":
								$scope.dryer = true;
						    break;
						     case "%aircondition":
								$scope.aircondition = true;
						    break;
						     case "%refrigerator":
								$scope.refrigerator = true;
						    break;
						     case "%laundry":
								$scope.laundry = true;
						    break;
						     case "%bed":
								$scope.bed = true;
						    break;
						    case "%desk":
						     	$scope.desk = true;
						     break;
						    case "%wardrob":
						    	$scope.wardrob = true;
						    	 break;
				    	    case "%wifi":
				    	        $scope.wifi = true;
				    	 		break;
				    	    case "%gas":
				    			$scope.gas = true;
				    			 break;
				    	    case "%no_pets":
				    			$scope.no_pets = true;
				    	 		break;
				    	    case "%girl_only":
				    			$scope.girl_only = true;
				    	 		break;
				    	 	case "%boy_only":
				    			$scope.boy_only = true;
				    	 		break;
				    	 	case "%no_party":
				    			$scope.no_party = true;
				    	 		break;
						}
					 }
				 }
				  /***************display the description data passed through home*********************/
				 	switch (datafromhome.ER_Description)
						{
						     case "%train_station;":
						     	$scope.train = true;
						   	 break;
						     case "%backpack;":
								$scope.backpack = true;
						    break;
						     case "%park;":
								$scope.park = true;
						    break;
						     case "%school;":
								$scope.school = true;
						    break;
						     case "%big_family;":
								$scope.family = true;
						    break;
						     case "%shopping_mall;":
								$scope.shoppingcenter = true;
						    break;
						     case "%offical_rental;":
								$scope.officerental = true;
						    break;
						    case "%university;":
						     	$scope.university = true;
						     break;
				 		}
				angular.forEach(entireData, function(data,index,array){
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
						    	data.university = true;
						    	 break;
						    default:
						    	data.university = true;
						    	 break;

						}
					}
					if (uniindex == dataresults.length-1){
							data.university = true;
						}else if ( uniindex==-1) {
							data.university = false;
						}
					if(data.university){
						data.uniname = dataresults[uniindex + 1];
					}
				});
				/*********************************************************************
				 *******************filter update code starts*************************
				 ********************************************************************/

				 /********************************************************************
				 **********************features update code starts********************
				 *********************************************************************/
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

				/****************************update submit***************************************/
				$scope.update = function(){
					var arr_desckey = [$scope.train,$scope.university,
							$scope.backpack,$scope.park,
							$scope.school,$scope.family,$scope.shoppingcenter,$scope.officerental];
					var arr_descvalue = ["%train_station;","%university;","%backpack;","%park;","%school;","%big_family;"
								,"%shopping_mall;","%offical_rental;"];
					var arr_featurekey = [$scope.stove,$scope.dishwasher,
							$scope.dryer,$scope.aircondition,
							$scope.refrigerator,$scope.laundry,$scope.bed,$scope.desk,
							$scope.wardrob,$scope.wifi,$scope.gas,$scope.no_smoking,$scope.no_pets,
							$scope.girl_only,$scope.boy_only,$scope.no_party];
					var arr_featurevalue = ["stove","dishwasher","dryer","aircondition","refrigerator"
								,"laundry","bed","desk","wardrob","wifi","gas","no_smoking",
								"no_pets","girl_only","boy_only","no_party"];
					var arr_features = [];
					var arr_descriptions = [];
					/**************descriptions package***********************/
					for(var i=0;i<arr_desckey.length;i++){
						if(arr_desckey[i]){
							arr_descriptions.push(arr_descvalue[i]);
						}
					}
					if(arr_descriptions.length==0){
						arr_descriptions.push("");
					}
					/***************************features package***************/
					for(var i=0;i<arr_featurekey.length;i++){
						if(arr_featurekey[i]){
							arr_features.push("%"+arr_featurevalue[i]+";");
						}
					}
					if(arr_features.length==0){
						arr_features.push("");
					}
					var features = arr_features.join('');
					var descriptions = arr_descriptions.join('');
					/*if($scope.inputaddr!=" " || $scope.inputaddr!="") {
						var address = $scope.inputaddr.split(",");
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
							ER_AreaMin: $scope.minArea,
							ER_AreaMax: $scope.maxArea,
							ER_AvailableDate: utilConvertDateToString.getDateToString($scope.dt,"yyyy-MM-dd") +'',
							ER_Description: descriptions,
							ER_Feature:features
						};
					} else {*/
					$http.get('/customer/profile')
		      .then(function(r) {
					 if(r.data.customer_login_status){
						entireData = {
							CID:r.data.CID,
							ER_Suburb: '',
							ER_Region: '',
							include_area:true,
							SRName:'',
							ER_Type: $scope.myPropertyType,
							SRPriceMin: $scope.myMinPrice,
							SRPriceMax: $scope.myMaxPrice,
							SRAreaMin: $scope.minArea,
							SRAreaMax: $scope.maxArea,
							SRAvailableDate: utilConvertDateToString.getDateToString($scope.dt,"yyyy-MM-dd") +'',
							ER_Description: descriptions,
							ER_Feature: features
						}
						getDataService.getDataRequests('/customer/filt/share/count', entireData).then(function(result){
                 $scope.data = result;
                 console.log($scope.data);
                 return result;
             },function(error){
               console.log("error" + error);
             }).then(function(result){
               result = Math.ceil(result/20);
               entireData.OrderBy = 'SRAvailableDate';
               entireData.PageID = 0;
               console.log(entireData);

                $http.post('/customer/filt/share/tenant', entireData)
                 .then(function(r) {
                  //  alert("entire login")
                  SearchService.set(r);
                  updateService.set(entireData);
									if(r.data.length > 0) {
												// alert("刷新吧");
										/***resolve the data passed through factory service from home page**********************/
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
										/******************display the features data passed through home*****************/
											 if(datafromhome.ER_Feature!=""){
												ER_Feature = datafromhome.ER_Feature.split(";");
											 ER_Feature = ER_Feature.splice(ER_Feature.length-3,2);// there is something needed to be changed here
											 for (var j = 0; j<ER_Feature.length;j++) {
												switch (ER_Feature[j])
													{
															 case "%stove":
																$scope.stove = true;
															 break;
															 case "%dishwasher":
															$scope.dishwasher = true;
															break;
															 case "%dryer":
															$scope.dryer = true;
															break;
															 case "%aircondition":
															$scope.aircondition = true;
															break;
															 case "%refrigerator":
															$scope.refrigerator = true;
															break;
															 case "%laundry":
															$scope.laundry = true;
															break;
															 case "%bed":
															$scope.bed = true;
															break;
															case "%desk":
																$scope.desk = true;
															 break;
															case "%wardrob":
																$scope.wardrob = true;
																 break;
																case "%wifi":
																		$scope.wifi = true;
																break;
																case "%gas":
																$scope.gas = true;
																 break;
																case "%no_pets":
																$scope.no_pets = true;
																break;
																case "%girl_only":
																$scope.girl_only = true;
																break;
															case "%boy_only":
																$scope.boy_only = true;
																break;
															case "%no_party":
																$scope.no_party = true;
																break;
													}
												 }
											 }
												/***************display the description data passed through home*********************/
												switch (datafromhome.ER_Description)
													{
															 case "%train_station;":
																$scope.train = true;
															 break;
															 case "%backpack;":
															$scope.backpack = true;
															break;
															 case "%park;":
															$scope.park = true;
															break;
															 case "%school;":
															$scope.school = true;
															break;
															 case "%big_family;":
															$scope.family = true;
															break;
															 case "%shopping_mall;":
															$scope.shoppingcenter = true;
															break;
															 case "%offical_rental;":
															$scope.officerental = true;
															break;
															case "%university;":
																$scope.university = true;
															 break;
													}
											angular.forEach(entireData, function(data,index,array){
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
																data.university = true;
																 break;
															default:
																data.university = true;
																 break;

													}
												}
												if (uniindex == dataresults.length-1){
														data.university = true;
													}else if (uniindex==-1) {
															data.university = false;
													}
												if(data.university){
													data.uniname = dataresults[uniindex + 1];
												}
											});
										/*****************************page update******************************/
												$state.go('app.listpageShare');
											}
                 }, function(e) {

                 });
             },function(error){
               console.log("error" + error);
             });
					}else {
						entireData = {
						 ER_Suburb: '',
						 ER_Region: '',
						 include_area:$scope.include_area,
						 ER_Type: $scope.myPropertyType,
						 SRPriceMin: $scope.myMinPrice,
						 SRPriceMax: $scope.myMaxPrice,
						 SRAreaMin: 0,
						 SRAreaMax: 50000,
						 SRAvailableDate: '2200-01-01',
						 ER_Description: descriptions,
						 ER_Feature: features
						};
					 // $state.go('app.googlemap');
					 console.log(entireData);
					 getDataService.getDataRequests('/customer/filt/share/count',entireData).then(function(result){
								$scope.data = result;
								console.log($scope.data);
								return result;
						},function(error){
							console.log("error" + error);
						}).then(function(result){
							result = Math.ceil(result/20);
							entireData.OrderBy = 'SRAvailableDate';
							entireData.PageID = 0;
							console.log(entireData);

							 $http.post('/customer/filt/share', entireData)
								.then(function(r) {
								 SearchService.set(r);
								 updateService.set(entireData);
								 console.log("entireData===>",entireData);
						 					if(r.data.length > 0) {
						 								// alert("刷新吧");
						 						/***resolve the data passed through factory service from home page**********************/
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
						 						/******************display the features data passed through home*****************/
						 							 if(datafromhome.ER_Feature!=""){
						 							 	ER_Feature = datafromhome.ER_Feature.split(";");
						 							 ER_Feature = ER_Feature.splice(ER_Feature.length-3,2);// there is something needed to be changed here
						 							 for (var j = 0; j<ER_Feature.length;j++) {
						 							 	switch (ER_Feature[j])
						 									{
						 									     case "%stove":
						 									     	$scope.stove = true;
						 									   	 break;
						 									     case "%dishwasher":
						 											$scope.dishwasher = true;
						 									    break;
						 									     case "%dryer":
						 											$scope.dryer = true;
						 									    break;
						 									     case "%aircondition":
						 											$scope.aircondition = true;
						 									    break;
						 									     case "%refrigerator":
						 											$scope.refrigerator = true;
						 									    break;
						 									     case "%laundry":
						 											$scope.laundry = true;
						 									    break;
						 									     case "%bed":
						 											$scope.bed = true;
						 									    break;
						 									    case "%desk":
						 									     	$scope.desk = true;
						 									     break;
						 									    case "%wardrob":
						 									    	$scope.wardrob = true;
						 									    	 break;
						 							    	    case "%wifi":
						 							    	        $scope.wifi = true;
						 							    	 		break;
						 							    	    case "%gas":
						 							    			$scope.gas = true;
						 							    			 break;
						 							    	    case "%no_pets":
						 							    			$scope.no_pets = true;
						 							    	 		break;
						 							    	    case "%girl_only":
						 							    			$scope.girl_only = true;
						 							    	 		break;
						 							    	 	case "%boy_only":
						 							    			$scope.boy_only = true;
						 							    	 		break;
						 							    	 	case "%no_party":
						 							    			$scope.no_party = true;
						 							    	 		break;
						 									}
						 								 }
						 							 }
						 							  /***************display the description data passed through home*********************/
						 							 	switch (datafromhome.ER_Description)
						 									{
						 									     case "%train_station;":
						 									     	$scope.train = true;
						 									   	 break;
						 									     case "%backpack;":
						 											$scope.backpack = true;
						 									    break;
						 									     case "%park;":
						 											$scope.park = true;
						 									    break;
						 									     case "%school;":
						 											$scope.school = true;
						 									    break;
						 									     case "%big_family;":
						 											$scope.family = true;
						 									    break;
						 									     case "%shopping_mall;":
						 											$scope.shoppingcenter = true;
						 									    break;
						 									     case "%offical_rental;":
						 											$scope.officerental = true;
						 									    break;
						 									    case "%university;":
						 									     	$scope.university = true;
						 									     break;
						 							 		}
						 							angular.forEach(entireData, function(data,index,array){
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
						 									    	data.university = true;
						 									    	 break;
						 									    default:
						 									    	data.university = true;
						 									    	 break;

						 									}
						 								}
						 								if (uniindex == dataresults.length-1){
						 										data.university = true;
						 									}else if (uniindex==-1) {
						 											data.university = false;
						 									}
						 								if(data.university){
						 									data.uniname = dataresults[uniindex + 1];
						 								}
						 							});
						 						/*****************************page update******************************/
						 								$state.go('app.listpageShare');
						 							}

								}, function(e) {
										console.log("error"+e);
								});
						},function(error){
							console.log("error" + error);
						});
					}
				});
//					}

//					alert("updated");
				}
				/********************************filter update code ends*****************************/

			/************************filter orderby*******************************/
			$scope.orderleft = false;
			$scope.orderright = false;
			$scope.sortBy = function(orderName){
				if(orderName==='SRPrice'){
					$scope.orderright = false;
					$scope.orderleft = true;
					$scope.sortPrice=!$scope.sortPrice;
				}else if(orderName==='SRAvailableDate'){
					$scope.orderleft = false;
					$scope.orderright = true;
					$scope.sortDate=!$scope.sortDate;
				}

				$scope.reverse = ($scope.orderName === orderName) ? !$scope.reverse : false;
    			$scope.orderName = orderName;
//				$scope.orderName = order+'';
			}
			/************************filter orderby*******************************/


		 /***********************add to shortlist starts************************************/
		 var shortlistInsert = {};
		 var shortlistDelete = {};
		 $scope.save2shortlist = function($index){
			 $scope.favorsave=!$scope.favorsave;
			 $http.get('/customer/profile')
			 .then(function(r) {
				 console.log(r);
				 if(r.data.customer_login_status){
					 	if ($scope.favorsave) {
							 shortlistInsert.CID =r.data.CID;
							 shortlistInsert.CLType="FavorSave";
							 shortlistInsert.CLDetail=$scope.entireData[$index].ER_ID;
							 shortlistInsert.CLTime=utilConvertDateToString.getDateToString(new Date(),"yyyy-MM-dd hh:mm:ss");
							 console.log("shortlistInsert",shortlistInsert);
							 $http.post('/customer/shortlist/insert', shortlistInsert)
								 .then(function(r){
									 console.log('r',r);
								 },function(e){
									 console.log("数据有误");
								 });
					 	}else {
							/*******************delete from shortlist*********************************************/
										console.log(r);
										shortlistDelete.CID = r.data.CID;
										shortlistDelete.CLType="FavorSave";
										shortlistDelete.CLDetail= $scope.entireData[$index].ER_ID;;
										//	$scope.shortlistDelete.CLTime="";
										$http.post('/customer/shortlist/delete',shortlistDelete)
												.then(function(r){
													// 	$scope.shortlistData = r.data;
													console.log("shortlistDelete",r);
												},function(e){
													console.log("数据有误"+e);
												});
							}
							/*************************shortlist check selection ends************************************************/
				 }else{
					 $state.go('app.login');
				 }
			 },function(e){
					 console.log("数据有误" + e);
				 });
		 }
/***********************add to shortlist ends************************************/
/*************$watch update data starts----save(shortlist)*******************/
$scope.$watch(function(){
			//  return getShortlistData();
		 },function(new_data,old_data){

			 // var timeline_data = TimelineService.data;
			 // for(var k in new_data)
			 // {
			 // 	for(var i=0;i< timeline_data.length;i++)
			 // 	{
			 // 		if(k==timeline_data[i].id){
			 // 			timeline_data[i] = new_data[k];
			 // 		}
			 // 	}
			 // }
			 // TimelineService.data = AnswerService.count_vote(TimelineService.data);
		 },true)
/*************$watch update data ends----save(shortlist)*******************/


/*******************get shortlistData starts*************************/
	var shortlistcheckdata = {};
	var shortlistData = {};
	function getShortlistData(){
		$http.get('/customer/profile')
			.then(function(r) {
			 console.log(r);
			 if(r.data.customer_login_status){
				 shortlistcheckdata.CID = r.data.CID;
				 shortlistcheckdata.CLType = 'FavorSave';
				 $http.post('/customer/shortlist', shortlistcheckdata)
						 .then(function(r){
							 shortlistData = r.data;
							 return shortlistData;
							 console.log('r',r);
						 },function(e){
							 console.log("数据有误");
						 });
			 }
			});
	}
/*******************get shortlistData ends*************************/




			/**********************************************************************/

		}]);
		/*.filter('propsFilter', function() {
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
		})*/
