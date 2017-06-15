;(function() {
	'use strict';
	var app = angular.module('andy');
	app.controller('MapCtrl', ['$scope', '$element', function($scope, $element) {
		angular.element(".subway-map").subwayMap({
			debug: true
		});
	}]);
})();