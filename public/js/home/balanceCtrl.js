/**
 * @Date:   2017-07-19T22:45:01+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-07-26T13:09:26+10:00
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
  }])
  ;
  app.controller('balanceCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.openDetails = function (size) {
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
  }])
  ;
