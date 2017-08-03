/**
 * @Date:   2017-07-14T11:45:22+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-02T10:18:58+10:00
 */



'use strict'
app.controller('positionAddInstanceCtrl', ['$scope', '$http','$modalInstance', 'items', function($scope,$http, $modalInstance, items) {
  //  $scope.items = items;
  //  $scope.selected = {
  //    item: $scope.items[0]
  //  };
  $scope.SRankName = "";
  var rankrights = {};
  rankrights.SRankName =  $scope.SRankName;
   $scope.ok = function () {
     $http.post('/staff/rankrights_add',rankrights)
       .then(function(r)
       {
         console.log('rankrights',rankrights);
         console.log("r",r);
       },function(e){
          console.log("position add failed!");
       });
     $modalInstance.close();
   };

   $scope.cancel = function () {
     $modalInstance.dismiss('cancel');
   };
 }])
 ;
 app.controller('positionManagement', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
   $scope.items = ['item1', 'item2', 'item3'];
   $scope.open = function (size) {
     var modalInstance = $modal.open({
       templateUrl: 'positionAdd.html',
       controller: 'positionAddInstanceCtrl',
       size: size,
       resolve: {
         items: function () {
           return $scope.items;
         }
       }
     });

     modalInstance.result.then(function (selectedItem) {
       $scope.selected = selectedItem;
     }, function () {
       $log.info('Modal dismissed at: ' + new Date());
     });
   };
 }])
 ;
