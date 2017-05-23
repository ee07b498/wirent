;(function(){
	'use strict';
	angular.module('profile',[])
		.factory('utilConvertDateToString', ['$filter', function ($filter) {  
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
		.service('profileService',['$scope','$http',function($scope,$http){
			var me = this;
			me.profiledata = {};
			
			alert("111");
			me.propMgm() = function(){
					alert("111");
					$http.get('/customer/maintenance')
						.then(function(r){
							console.log(r);
						},function(e){
							
						})
					}
		}])
		.controller('ProfileController',['$scope','$http','$filter','utilConvertDateToString','$timeout',function($scope,$http,$filter,utilConvertDateToString,$timeout){
					$scope.data = {};
					$scope.payment = {};
					$scope.management = {};
					$scope.maintenance={};
					$scope.mtCheckData={};
					$scope.mtCheckDataResult={};
					$scope.serviceHistoryData={};
					var val= {
						ER_ID : 0,
						CID : 0,
						BillDateMin : '2000-01-01',
						BillDateMax : '3000-01-01',
						BillType : ''
					};
					$http.get('/customer/profile')
						.then(function(r){
							console.log(r.data);
							delete r.data["customer_login_status"]; 
//							r.data["CLastContDate"] = utilConvertDateToString.getStringToDate(r.data["CLastContDate"]);
							$scope.data = r.data;
//							console.log($scope.data);
						},function(e){
							
						})
						console.log($scope.data);
							$scope.saveProfile = function(){
								$scope.data.CPassword = null;
		//						$scope.data.CLastContDate = $scope.data.CLastContDate;
		//						$scope.data.CLastContDate = $filter("date")($scope.data.CLastContDate, "yyyy-MM-dd"); 
		//						$scope.data.CLastContDate = utilConvertDateToString.getDateToString($scope.data.CLastContDate, "yyyy-MM-dd");
								console.log("$scope.data.CLastContDate",angular.isString($scope.data.CLastContDate));
								console.log("$scope.data.CLastContDatedd",$scope.data.CLastContDate);
								console.log('$scope.data',$scope.data);
								$http.post('/customer/profile/update', $scope.data)
								.then(function(r){
									console.log(' $scope.data', $scope.data);
									console.log('r',r);
									if (r.data)
									{	
										$scope.success = true;
										timeOut($scope.success);
		//								$scope.success = false;
									}
								},function(e){
									$scope.error = true;
								})
						}
						console.log($scope.data);
				
				//timeout funtion
				var timeOut = function(ele){
					 var timer = $timeout(
                        function() {

                            console.log( "Timeout executed", Date.now() );
							$scope.success = false;

                        },
                        5000
                    );
                    //将resolve/reject处理函数绑定到timer promise上以确保我们的cancel方法能正常运行
                    timer.then(
                        function() {

                            console.log( "Timer resolved!", Date.now() );
                           $scope.success = false;

                        },
                        function() {

                            console.log( "Timer rejected!", Date.now() );

                        }
                    );

                    //当DOM元素从页面中被移除时，AngularJS将会在scope中触发$destory事件。这让我们可以有机会来cancel任何潜在的定时器
                    $scope.$on(
                        "$destroy",
                        function( event ) {

                            $timeout.cancel( timer );

                        }
                    );
				}
				//mypaments click()
					$scope.myPayment = function(){
//						alert("111");
						$scope.payment.CID = 0;
						$scope.payment.ER_ID = 0;
						$scope.payment.BillDateMin = '2000-01-01';
						$scope.payment.BillDateMax = '3000-01-01';
						$scope.payment.BillType = '';
						 $http.post('/customer/bill',$scope.payment)
            		.then(function (response) {
            			console.log("response",response);
            			$scope.payment = response.data[0];
            				console.log("$scope.payment",$scope.payment);
            		});
						
					}
					
					//propertymanagement click()
					$scope.propMgm = function(){
					$scope.management.CID = 0;
					$http.post('/customer/rent',$scope.management)
						.then(function(r){
						$scope.management = r.data[0];
						$scope.management.address= r.data[0].ER_No+" "+r.data[0].ER_St+" "+r.data[0].ER_Suburb+","+r.data[0].ER_Region+" "+r.data[0].postcode;
						console.log($scope.management);
						},function(e){
							
						});
					}
					//maintenance Apply
					$scope.mtApply =  function(){
						$scope.submit = function(){
							$scope.maintenance.CID = 1;
							$scope.maintenance.ER_ID = 2;
							$scope.maintenance.MType = $scope.MType;
							$scope.maintenance.MApplyForm = "q1:"+$scope.maintenance.q1+"@"+"q2:"+$scope.maintenance.q2+"@"+"q3:"+$scope.maintenance.q3+"@"+"q4:"+$scope.maintenance.q4+"@"+"feature:"+$scope.maintenance.feature+"@"+"date1:"+$scope.maintenance.dt1+"@"+"date2:"+$scope.maintenance.dt2+"@"+"date3:"+$scope.maintenance.dt3;
							delete $scope.maintenance["q1"]; 
							delete $scope.maintenance["q2"]; 
							delete $scope.maintenance["q3"]; 
							delete $scope.maintenance["q4"]; 
							delete $scope.maintenance["dt1"]; 
							delete $scope.maintenance["dt2"]; 
							delete $scope.maintenance["dt3"]; 
							delete $scope.maintenance["feature"]; 
							$scope.maintenance.MApplyDate = utilConvertDateToString.getDateToString(new Date(),"yyyy-MM-dd");
							$scope.maintenance.MStat = "Processing";
							console.log("$scope.maintenance",$scope.maintenance)
							
							$http.post('/customer/maintenance/apply',$scope.maintenance)
								.then(function(r){
								console.log(r);
								$scope.maintenance = r.data[0];
								console.log("$scope.maintenance",$scope.maintenance);
								},function(e){
									
								})
						}
					
					}
					//maintenance check()
					$scope.mtCheck = function(){
						$scope.mtCheckData.CID = 0;
						$scope.mtCheckData.ER_ID =0;
						$scope.mtCheckData.MType = "";
						$scope.mtCheckData.MStat = "";
						$scope.mtCheckData.MApplyDateMin="2000-01-01";
						$scope.mtCheckData.MApplyDateMax="3000-01-01";
						$http.post('/customer/maintenance',$scope.mtCheckData)
								.then(function(r){
								console.log(r);
								$scope.mtCheckDataResult = r;
								console.log("$scope.mtCheckDataResult",$scope.mtCheckDataResult);
								},function(e){
									
								})
					}
					
					//Service history
					$scope.svHistory = function(){
						$scope.serviceHistoryData.CID = 0;
						$scope.serviceHistoryData.ER_ID = 0;
						$scope.serviceHistoryData.ServiceType = "";
						$scope.serviceHistoryData.ServiceStat="";
						$scope.serviceHistoryData.ServiceDateMin="2000-01-01";
						$scope.serviceHistoryData.ServiceDateMax="3000-01-01";
						$http.post('/customer/service',$scope.serviceHistoryData)
								.then(function(r){
								console.log("$scope.serviceHistoryData",r);
								$scope.serviceHistoryData = r;
//								console.log("$scope.mtCheckDataResult",$scope.mtCheckDataResult);
								},function(e){
									
								})
					}
			
			
			
			// tab switch
			 $scope.tabs = [true, false, false, false, false];
			 $scope.tab = function(index){
			angular.forEach($scope.tabs, function(i, v) {
				  $scope.tabs[v] = false;
				});
			$scope.tabs[index] = true;
		}	
			 $scope.tabs_sum = [true, false];
			  $scope.tab_sum = function(index){
			angular.forEach($scope.tabs_sum, function(i, v) {
				  $scope.tabs_sum[v] = false;
				});
			$scope.tabs_sum[index] = true;
		}	
		 $scope.tabs_accounts = [true, false, false, false, false];
			 $scope.tab_account = function(index){
			angular.forEach($scope.tabs_accounts, function(i, v) {
				  $scope.tabs_accounts[v] = false;
				});
			$scope.tabs_accounts[index] = true;
		}	
		
		/*maintenance type*/
		$scope.MType = 'Plumb';
		$scope.MTypes = [{ id: 1, MType:'Plumb'}, { id: 2,MType:'Refrigerator'},
			{ id: 3, MType:'Microwave'},{ id: 4,propertyType:'Oven'},
			{ id: 5, MType:'Washing Machine'}];
		/*datepicker*/
		$scope.today = function() {
	      $scope.maintenance.dt1 = utilConvertDateToString.getDateToString(new Date(),"yyyy-MM-dd");
	    };
	    $scope.today();
	
	    $scope.clear = function () {
	      $scope.maintenance.dt1 = null;
	    };
		$scope.today = function() {
	      $scope.maintenance.dt2 = utilConvertDateToString.getDateToString(new Date(),"yyyy-MM-dd");
	    };
	    $scope.today();
	
	    $scope.clear = function () {
	      $scope.maintenance.dt2 = null;
	    };
	    $scope.today = function() {
	      $scope.maintenance.dt3 = utilConvertDateToString.getDateToString(new Date(),"yyyy-MM-dd");
	    };
	    $scope.today();
	
	    $scope.clear = function () {
	      $scope.maintenance.dt3 = null;
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
		$scope.open2 = function($event) {
	      $event.preventDefault();
	      $event.stopPropagation();
	
	      $scope.opened2 = true;
	    };
	    $scope.open3 = function($event) {
	      $event.preventDefault();
	      $event.stopPropagation();
	
	      $scope.opened3 = true;
	    };
	    $scope.dateOptions = {
	      formatYear: 'yy',
	      startingDay: 1,
	      class: 'datepicker'
	    };
	
	    $scope.initDate = new Date('2016-15-20');
	    $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	    $scope.format = $scope.formats[0];

	}])	
	
})();