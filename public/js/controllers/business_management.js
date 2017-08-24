/**
 * @Date:   2017-07-14T16:43:33+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-24T17:34:21+10:00
 */



'use strict'
app.controller('businessAddInstanceCtrl', ['$scope', '$modalInstance', '$http', function($scope, $modalInstance, $http) {
  $scope.business_add_info = {}
  $scope.business_add_info.$TPName = '';
  $scope.business_add_info.TPPassword = '';
  $scope.business_add_info.TPDetail = '';
  $scope.business_add_info.TPDescription = '';
  $scope.business_add_info.TPLogo = '';
  $scope.business_add_info.TPAds = '';
  $scope.business_add_info.TPPhone = '';
  $scope.business_add_info.TPEmail = '';
  $scope.business_add_info.TPLink = '';
  $scope.business_add_info.TPServLoc = '';
  $scope.ok = function() {
    console.log($scope.business_add_info);
    $http.post('/staff/admin_thirdparty_insert', $scope.business_add_info)
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

app.controller('businessUpdateInstanceCtrl', ['$scope', '$modalInstance', '$http', 'items', function($scope, $modalInstance, $http, items) {
  $scope.business_update_info = {}
  $scope.business_update_info = items;
  $scope.ok = function() {
    console.log($scope.business_update_info);
  /*  $http.post('/staff/admin_landlord_update', $scope.business_update_info)
      .then(function(response) {
        console.log("response", response);
      }, function(x) {
        console.log('Server Error');
      });*/
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);

app.controller('businessUpdatePasswordInstanceCtrl', ['$scope', '$modalInstance', '$http', 'items', function($scope, $modalInstance, $http, items) {
  $scope.businessInfo = items;
  $scope.businessPassword = {};
  // $scope.businessPassword.newPassword = "";
  // $scope.businessPassword.retypePassword = "";
  $scope.authorError_nomatch = false;
  $scope.update_business_password = function() {
    console.log($scope.businessInfo);
    if ($scope.businessPassword.newPassword !== "" && $scope.businessPassword.retypePassword !== "" && $scope.businessPassword.newPassword === $scope.businessPassword.retypePassword) {
      $scope.authorError_nomatch = false;
      $scope.businessInfo.TPPassword = $scope.businessPassword.retypePassword;
      console.log($scope.businessInfo);
      $http.post('/staff/admin_landlord_update', $scope.businessInfo)
        .then(function(response) {
          console.log("response", response);
        }, function(x) {
          console.log('Server Error');
        });
      $modalInstance.close();
    } else if ($scope.businessPassword.newPassword !== $scope.businessPassword.retypePassword) {
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

app.controller('businessManagement', ['$scope', '$modal', '$log', '$http', 'getDataCommonService', function($scope, $modal, $log, $http, getDataCommonService) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.inputStr = "";
  $scope.business_infos = {};
  $scope.business = {};
  $scope.business.TPDetail = "";
  $scope.business.TPServLoc = "";
  /*$http.post('/staff/admin_thirdparty_filt_check', $scope.business)
    .then(function(response) {
      console.log("response", response);
      $scope.business_infos = response.data;
    }, function(x) {
      console.log('Server Error');
    });*/
    ////////////////////////////get all the business////////////////////////////////////////
  $http.post('/staff/admin_thirdparty_name_check', {"$TPName":$scope.inputStr})
    .then(function(response) {
      console.log("response", response);
      $scope.business_infos = response.data;
    }, function(x) {
      console.log('Server Error');
    });
  $scope.business_check = function() {
    $scope.business_infos = {};
    $http.post('/staff/admin_thirdparty_name_check', {"$TPName":$scope.inputStr})
      .then(function(response) {
        console.log("response", response);
      }, function(x) {
        console.log('Server Error');
      });
  }
//=====================pass data to profile page==================================================
  $scope.passdata = function(index){
      getDataCommonService.set($scope.business_infos[index], 'business')
  }
  /***************add landlord user info*******************/
  $scope.open = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'businessAdd.html',
      controller: 'businessAddInstanceCtrl',
      size: size
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  /***************update business info*******************/
  $scope.businessUpdate = function(size, $index) {
    var modalInstance = $modal.open({
      templateUrl: 'businessUpdate.html',
      controller: 'businessUpdateInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.business_infos[$index];
        }
      }
    });
  };
  /*********************update business password*******************/
   $scope.business_password_update = function(size,$index){
     var modalInstance = $modal.open({
       templateUrl: 'businessUpdatePassword.html',
       controller: 'businessUpdatePasswordInstanceCtrl',
       size: size,
       resolve: {
         items: function() {
           return $scope.business_infos[$index];
         }
       }
     });
   }

}]);
