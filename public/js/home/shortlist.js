;(function(){
	'use strict';
	angular.module('shortlist',[])
		.controller('shortlistCtrl',['$scope','$http',function($scope,$http){
//			alert("shortlist");
			$scope.shortlistData = {};
			$scope.shortlistDelete={};
			$scope.shortlistData.CID = 0;
			$scope.shortlistData.CLType='FavorSave';
			$http.post('/customer/shortlist',$scope.shortlistData)
						.then(function(r){
							$scope.shortlistData = r.data;
//							console.log("$scope.shortlistData",$scope.shortlistData);
						},function(e){
							
						});
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
