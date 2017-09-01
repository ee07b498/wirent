/**
 * @Date:   2017-07-14T16:43:33+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-28T15:46:37+10:00
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

app.controller('landlordUpdateInstanceCtrl', ['$scope', '$modalInstance', '$http', 'items', function($scope, $modalInstance, $http, items) {
  $scope.landlord_update_info = {}
  $scope.landlord_update_info = items;
  $scope.ok = function() {
    console.log($scope.landlord_update_info);
    $http.post('/staff/admin_landlord_update', $scope.landlord_update_info)
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

app.controller('landlordUpdatePasswordInstanceCtrl', ['$scope', '$modalInstance', '$http', 'items', function($scope, $modalInstance, $http, items) {
  $scope.staffInfo = items;
  $scope.staffPassword = {};
  $scope.authorError_nomatch = false;
  $scope.ok = function() {
    console.log($scope.staffInfo);
    if ($scope.staffPassword.newPassword !== "" && $scope.staffPassword.retypePassword !== "" && $scope.staffPassword.newPassword === $scope.staffPassword.retypePassword) {
      $scope.authorError_nomatch = false;
      $scope.staffInfo.LLPassword = $scope.staffPassword.retypePassword;
      console.log($scope.staffInfo);
      $http.post('/staff/admin_landlord_update', $scope.staffInfo)
        .then(function(response) {
          console.log("response", response);
        }, function(x) {
          console.log('Server Error');
        });
      $modalInstance.close();
    } else if ($scope.staffPassword.newPassword !== $scope.staffPassword.retypePassword) {
      $scope.authorError_nomatch = true;
    }

  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
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
  /***************add landlord user info*******************/
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
  /***************update landlord user info*******************/
  $scope.landlord_info_update = function(size, $index) {
    var modalInstance = $modal.open({
      templateUrl: 'landlordUpdate.html',
      controller: 'landlordUpdateInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.landLord_infos[$index];
        }
      }
    });
  };
  /*********************update landlord password*******************/
   $scope.landlord_update_password = function(size,$index){
     var modalInstance = $modal.open({
       templateUrl: 'landlordUpdatePassword.html',
       controller: 'landlordUpdatePasswordInstanceCtrl',
       size: size,
       resolve: {
         items: function() {
           return $scope.landLord_infos[$index];
         }
       }
     });
   }
}]);
