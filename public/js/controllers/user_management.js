'use strict'
app.controller('userAddInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
   $scope.items = items;
   $scope.selected = {
     item: $scope.items[0]
   };

   $scope.ok = function () {
     $modalInstance.close($scope.selected.item);
   };

   $scope.cancel = function () {
     $modalInstance.dismiss('cancel');
   };
 }])
 ;
 app.controller('userManagement', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
   $scope.items = ['item1', 'item2', 'item3'];
   $scope.open = function (size) {
     var modalInstance = $modal.open({
       templateUrl: 'userAdd.html',
       controller: 'userAddInstanceCtrl',
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
