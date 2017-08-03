/**
 * @Date:   2017-06-30T10:20:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-03T13:14:08+10:00
 */



﻿;(function(){
	'use strict';
	angular.module('andy')
			.service('UserService',['$state','$http','$window',
			function ($state,$http,$window){
				var me = this;
				me.customer_signup_data = {};
				me.customer_login_data = {};
				me.landlord_signup_data = {};
				me.landlord_login_data = {};
				me.data = {};
				// me.profile = false;
				me.loginCheck = function(){
					return	$http.get('/customer/profile')
						.then(function(r){
							return r;
						})
				}

				me.customer_signup = function(){
					//console.log(me.signup_data);
					$http.post('/customer/register', me.customer_signup_data)
						.then(function(r){
							console.log('r',r);
							if (r.status===200)
							{
								me.customer_signup_data = {};
								$state.go('app.login');
							}
						},function(e){

						})

				}
				me.customer_login = function(){
					$http.post('/customer/login',me.customer_login_data)
						.then(function(r)
						{
							console.log('me.login_data',me.customer_login_data);
							console.log("r",r);
							//$state.go('home')
							if(r.data.stat){
								// me.profile = true;
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

				me.landlord_signup = function(){
					//console.log(me.signup_data);
					$http.post('/landlord/register', me.landlord_signup_data)
						.then(function(r){
							console.log('r',r);
							if (r.status===200)
							{
								me.landlord_signup_data = {};
								$state.go('app.login');
							}
						},function(e){

						})

				}
				me.landlord_login = function(){
					$http.post('/landlord/login',me.landlord_login_data)
						.then(function(r)
						{
							console.log('me.login_data',me.landlord_login_data);
							console.log("r",r);
							//$state.go('home')
							if(r.data.stat){
								// me.profile = true;
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
			return UserService.customer_signup_data;
		     },function(n,o){
					 console.log("111");
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
