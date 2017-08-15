/**
 * @Date:   2017-07-14T16:43:33+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-09T16:48:34+10:00
 */



'use strict'
app.controller('landlordAddInstanceCtrl', ['$scope', '$modalInstance', '$http', function($scope, $modalInstance, $http) {
  $scope.landlord_add_info = {}

  $scope.ok = function() {
    console.log($scope.landlord_add_info);
    $http.post('/staff/admin_landlord_insert', $scope.landlord_add_info)
      .then(function(response) {
        console.log("response", response);
      }, function(x) {
        console.log('Server Error');
      });
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
app.controller('landlordManagement', ['$scope', '$modal', '$log', '$http', function($scope, $modal, $log, $http) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.inputStr = "";
  $scope.landLord_infos = {};
  $http.post('/staff/admin_landlord_check', $scope.inputStr)
    .then(function(response) {
      console.log("response", response);
      $scope.landLord_infos = response.data;
    }, function(x) {
      console.log('Server Error');
    });
  $scope.landlords_check = function() {
    /*$http.post('/staff/admin_landlord_check', $scope.inputStr)
      .then(function(response) {
        console.log("response", response);
        $scope.landLord_infos = response.data;
      }, function(x) {
        console.log('Server Error');
      });*/
  }


  $scope.open = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'landlordAdd.html',
      controller: 'landlordAddInstanceCtrl',
      size: size
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}]);
