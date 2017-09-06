/**
 * @Date:   2017-07-07T13:46:13+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-09-05T16:35:07+10:00
 */



'use strict'
angular.module('andy')
  .controller('landlordProfileCtrl',function($stateParams, $scope, $http, getDataCommonService){
    $scope.landlord = {};
    $scope.changePassword = {};
    $scope.authorError = false;
    $http.post('/landlord/profile', {'LLEmail':$stateParams.landlord})
      .then(function(r)
      {
        console.log(r);
        if (r.data.landlord_login_status == 1) {
          $scope.landlord = r.data;
          $http.post('/landlord/check',{'LLID':$scope.landlord.LLID})
            .then(function(response) {
              console.log("response", response);
              getDataCommonService.set(response.data, 'properties');
            }, function(x) {
              console.log('Server Error');
            });
        }

      },function(){
        console.log("ERROR!");
      })

      //////////////////update profile///////////////////////
      $scope.update_Profile = function() {
          $http.post('/landlord/profile/update', $scope.landlord)
            .then(function(response) {
              console.log("response", response);
            }, function(x) {
              console.log('Server Error');
            });
      };
      //////////////////change password///////////////////////
      $scope.update_password = function() {
        $scope.authorError = false;
        if ($scope.changePassword.newPassword !== "" && $scope.changePassword.retypePassword !== "" && $scope.changePassword.newPassword === $scope.changePassword.retypePassword) {
          $scope.landlord.LLPassword = $scope.changePassword.retypePassword;
          console.log($scope.landlord);
          $http.post('/landlord/profile/update', $scope.landlord)
            .then(function(response) {
              console.log("response", response);
            }, function(x) {
              console.log('Server Error');
            });
        } else if ($scope.changePassword.newPassword !== $scope.changePassword.retypePassword) {
          $scope.authorError = true;
        }
      };


  });
