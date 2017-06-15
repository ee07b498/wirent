;(function() {
	'use strict';
	angular.module('andy')
		.controller('fixCtrl',['$scope','$window',function($scope,$window){
			$scope.go2Top = function(){
				$(window).scrollTop(0,0);
			}
			
		}])
})();
