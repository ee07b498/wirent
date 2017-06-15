;(function(){
	'use strict';
	angular.module('andy')
		.controller('prpMgmCtrl',['$scope','$http','profileService',function($scope,$http,profileService){
			profileService.propMgm();
		}])
})();
