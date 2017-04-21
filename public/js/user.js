;(function(){
	'use strict';
	angular.module('user',['andy'])
			.service('UserService',['$state','$http','$window',
			function ($state,$http,$window){
				var me = this;
				me.signup_data = {};
				me.login_data = {};
				me.data = {};
				me.profile = false;
				me.loginCheck = function(){
					return	$http.get('/customer/profile')
						.then(function(r){
							console.log(r);
							return r.customer_login_status;						
						})
				}
				
				me.signup = function(){
					//console.log(me.signup_data);
					$http.post('/customer/register', me.signup_data)
						.then(function(r){
							console.log('r',r);
							if (r.status===200)
							{
								me.signup_data = {};
								$state.go('login');
							}
						},function(e){
							
						})
					
				}
				me.login = function(){
					$http.post('/customer/login',me.login_data)
						.then(function(r)
						{
							console.log($window.sessionStorage.token);
							//$state.go('home')
							if(r.status){
							$window.sessionStorage.token = r.status;//BaseService.profile = false;
						//	console.log($window.sessionStorage.token);
							if(me.loginCheck()){
									
								me.profile = true;
								console.log(me);
								location.href = '/';
								 // $state.go('home');
								
							}
							
							
							}else
							{
								me.login_failed = true;
							}
						},function(){
							
						})
				}
				
				
			}])
			.controller('SignupFormController',[
			'$scope',
			'UserService',
			function($scope,UserService){
				$scope.name1 = "Winning";
				$scope.User = UserService;
				$scope.$watch(function(){
			return UserService.signup_data;
			console.log("111");
		     },function(n,o){
			
		},true);
			}])
		.controller('UserController',[
						'$scope',
						'UserService',
					function($scope,UserService){
						//$scope.User = UserService;
						
		}])
		.controller('SigninFormController',['$scope','UserService',function($scope,UserService){
		$scope.name = "Winning";
		$scope.User = UserService;
		console.log(UserService);
		
	}])
		.controller('ProfileController',function($scope){
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
		
	})	
})();