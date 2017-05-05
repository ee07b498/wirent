;
(function() {
	'use strict';
	angular.module('header',[])
		.service('BaseService', ['$state', '$http', function($state, $http) {

		}])
		.controller('WinCtrl', ['$scope', '$window', '$http','UserService',  function($scope, $window, $http,UserService) {
			$scope.name = "Winning";
			
			
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
		}])
})();