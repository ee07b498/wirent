;(function(){
	'use strict';
	angular.module('andy')
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
							return r;						
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
								$state.go('app.login');
							}
						},function(e){
							
						})
					
				}
				me.login = function(){
					$http.post('/customer/login',me.login_data)
						.then(function(r)
						{
							console.log('me.login_data',me.login_data);
							console.log("r",r);
							//$state.go('home')
							if(r.data.stat){
								me.profile = true;
								console.log(me);
								location.href = '/';
//								  $state.go('app.home');
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
		
})();