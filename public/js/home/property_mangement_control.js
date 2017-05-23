;(function(){
	'use strict';
	angular.module('prpmgmctrl',['profile'])
		.controller('prpMgmCtrl',['$scope','$http','profileService',function($scope,$http,profileService){
			profileService.propMgm();
		}])
})();
