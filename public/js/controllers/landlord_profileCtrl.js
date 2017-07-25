/**
 * @Date:   2017-07-24T13:55:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-07-25T16:59:53+10:00
 */



 'use strict'
 app.controller('propertyDetailsInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
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
  }]);
  app.controller('landlordPropertyAddInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
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
   }]);
  app.controller('landlord_profileCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'propertyDetails.html',
        controller: 'propertyDetailsInstanceCtrl',
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
    $scope.landlord_propertyAdd = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'landlordPropertyAdd.html',
        controller: 'landlordPropertyAddInstanceCtrl',
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
