/**
 * @Date:   2017-06-30T10:20:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-07-26T10:27:43+10:00
 */



;(function(){
	'use strict';
	angular.module('andy')
		.controller('prpMgmCtrl',['$scope','$http','profileService',function($scope,$http,profileService){
			profileService.propMgm();
		}])
})();
