;(function(){
	'use strict';
	angular.module('profile',['ui.bootstrap'])
		.controller('ProfileController',[
					'$scope',
					'$stateParams',
					function($scope,$stateParams){
						alert("123");
							 //datepicker
						$scope.today = function() {
					      $scope.dt = new Date();
					    };
					    $scope.today();
					
					    $scope.clear = function () {
					      $scope.dt = null;
					    };
					
					    // Disable weekend selection
					    /*$scope.disabled = function(date, mode) {
					      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
					    };*/
					
					    $scope.toggleMin = function() {
					      $scope.minDate = $scope.minDate ? null : new Date();
					    };
					    $scope.toggleMin();
					
					    $scope.open = function($event) {
					    	alert("123");
					      $event.preventDefault();
					      $event.stopPropagation();
					
					      $scope.opened = true;
					    };
					
					    $scope.dateOptions = {
					      formatYear: 'yy',
					      startingDay: 1,
					      class: 'datepicker'
					    };
					
					    $scope.initDate = new Date('2016-15-20');
					    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
					    $scope.format = $scope.formats[0];
		}])
	
})();