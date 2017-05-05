;(function(){
	'use strict';
	angular.module('profile',[])
		.service('profileService',['$scope','$http',function($scope,$http){
			var me = this;
			me.profiledata = {};
			alert("111");
			me.saveProfile = function(){
					alert("111");
					$http.get('/customer/profile')
						.then(function(r){
							console.log(r);
						},function(e){
							
						})
					}
		}])
		.controller('ProfileController',['$scope','$http',function($scope,$http){
					$scope.data = {}
					$http.get('/customer/profile')
						.then(function(r){
//							console.log(r.data);
							$scope.data = r.data;
//							console.log($scope.data);
						},function(e){
							
						})
//					console.log($scope.data);
//				$scope.saveProfile = function(){
//						$http.post('/customer/profile/update', $scope.data)
//						.then(function(r){
//							console.log('r',r);
//							if (r.status===200)
//							{
//								alert("success!");
//							}
//						},function(e){
//							
//						})
//				}
				console.log($scope.data);
				
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
		
	}])	
	
})();