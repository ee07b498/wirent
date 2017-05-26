;(function() {
	'use strict';
	angular.module('business', []).controller('businessCtrl', ['$scope','$http','$cookies','$rootScope','$localStorage','SearchService', function($scope,$http,$cookies,$rootScope,$localStorage,SearchService) {
		var businessData = {};
		if(JSON.stringify(SearchService.get()) != "{}"){
		 	$localStorage.businessData = SearchService.get().data;
		 	console.log('$localStorage.businessData ',$localStorage.businessData);
		 	businessData = $localStorage.businessData ;
		 }else{
		 	businessData = $localStorage.businessData;
		 	console.log('$localStorage.businessData ',$localStorage.businessData);
		 }
		angular.forEach(businessData, function(data,index,array){
		//data等价于array[index]
//		console.log(data.TPLink+'='+array[index].TPLink);
//		console.log(data.TPLink=='');
			if(data.TPLink!=''){
				data.links = true;
			}
			else {
				data.links = false;
			}
		});
		$scope.serviceData = businessData;
		  
	}])
})();