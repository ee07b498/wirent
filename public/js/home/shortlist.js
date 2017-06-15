;(function(){
	'use strict';
	angular.module('andy')
		.controller('shortlistCtrl',['$scope','$http','SearchService',function($scope,$http,SearchService){
			$scope.shortlistData=SearchService.get();
			$scope.remove = function(key){
				alert("remove");
				$scope.shortlistDelete.CID = 0;
				$scope.shortlistDelete.CLType="FavorSave";
				$scope.shortlistDelete.CLDetail= key;
//				$scope.shortlistDelete.CLTime="";
				$http.post('/customer/shortlist/delete',$scope.shortlistDelete)
						.then(function(r){
//							$scope.shortlistData = r.data;
							console.log("$scope.shortlistDelete",r);
						},function(e){
							
						});
			}
		}])
})();
