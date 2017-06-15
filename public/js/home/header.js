;
(function() {
	'use strict';
	angular.module('andy')
		.factory('readLetters', ['$http', '$q', 'SearchService',function($http, $q,SearchService) {
			return {
				query: function() {
					var deferred = $q.defer();
					$http({
						method: 'POST',
						url: '/customer/msg/notice',
						data: {  CID: 1,msg_direct_comment:'% to customer' }
					}).success(function(data, status, header, config) {
						deferred.resolve(data);
					}).error(function(data, status, header, config) {
						deferred.reject(data);
					});
					return deferred.promise;
				}
			}
		}])
		.service('BaseService', ['$state', '$http', function($state, $http,$localStorage) {

		}])
		.controller('WinCtrl', ['$scope', '$state','$window', '$http','UserService','readLetters','$localStorage', 'SearchService',function($scope, $state,$window, $http,UserService,readLetters,$localStorage,SearchService) {
			$localStorage.headerSetting = {};
			$scope.name = "Winning";
			$scope.letternums = 0;

			$http.get('/customer/profile')
				.then(function(r) {
					console.log(r);
					if(r.data.customer_login_status)
						$scope.profile = true;
					else
						$scope.profile = false;
				})

			$scope.profile = UserService.profile;
			console.log($scope.profile);
			$scope.logout = function() {
				alert("logout");
				$http.post('/customer/logout', {})
					.then(function() {
						location.href = '/';
					});
			}
			$scope.read_Letters = function(){
				$http.get('/customer/profile')
						.then(function(r){
							console.log("=============",r);
							if(r.data=="login"){
								$state.go("app.login");
							}else{

							}
						},function(e){
							$state.go("app.login");
						})

					}
			/*********************obtain unread messages number***********************************/
				var promise=readLetters.query();
			    promise.then(function (data) {
			    	console.log("===data===",data);
			    	$localStorage.headerSetting.letternums = data[0]['count(*)'];
			    	$scope.letternums = $localStorage.headerSetting.letternums;
			    });
					$scope.letternums = $localStorage.headerSetting.letternums;

			/*********************obtain unread messages number***********************************/

			/*********************go to shortlist******************************************/
			$scope.go2Shortlist = function(){
				$http.get('/customer/profile')
						.then(function(r){
							if(r.data=="login"){
								$state.go("app.login");
							}else{
								$scope.shortlistData = {};
								$scope.shortlistDelete={};
								$scope.shortlistData.CID = 1;
								$scope.shortlistData.CLType='FavorSave';
								$http.post('/customer/shortlist',$scope.shortlistData)
									.then(function(r){
										SearchService.set(r.data);
										$state.go("app.shortlist");
								//console.log("$scope.shortlistData",$scope.shortlistData);
									},function(e){

									});
							}
						},function(e){
							$state.go("app.login");
						})

			}
			/*********************go to shortlist******************************************/


		}])


})();
