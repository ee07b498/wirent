/**
 * @Date:   2017-07-24T13:41:38+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-09T14:00:54+10:00
 */

'use strict'
app.controller('staff_profileCtrl', ['$scope', '$http', '$modal', '$log', '$stateParams', function($scope, $http, $modal, $log, $stateParams) {
  $scope.staff_info = {};
  $scope.staff_info_mod = {};
  $scope.ranknames = {};
  $scope.changePassword = {};
  $scope.authorError = false;

  $scope.staff_info.SComment = $stateParams.SComment;
  $scope.staff_info.SCurrLoc = $stateParams.SCurrLoc;
  $scope.staff_info.SEmail = $stateParams.SEmail;
  $scope.staff_info.SLoginStat = $stateParams.SLoginStat;
  $scope.staff_info.SName = $stateParams.SName;
  $scope.staff_info.SPassWord = $stateParams.SPassWord;
  $scope.staff_info.SPhone = $stateParams.SPhone;
  $scope.staff_info.SRank = $stateParams.SRank;
  $scope.staff_info.SRankName = $stateParams.SRankName;
  $scope.staff_info.SUserName = $stateParams.SUserName;
  $scope.staff_info.SWorkStat = $stateParams.SWorkStat;
  $scope.staff_info.StaffID = $stateParams.StaffID;
  console.log($scope.staff_info);
  $scope.staff_info_mod = $scope.staff_info;
  console.log($scope.staff_info_mod);
  /**********************rankname check**********************8*/
  $http.get('/staff/rankname')
    .then(function(response) {
      console.log("response", response);
      $scope.ranknames = response.data;
    }, function(x) {
      console.log('Server Error');
    });
    //////////////////change password///////////////////////
  $scope.update_staff_password = function() {
    console.log($scope.changePassword);
    if ($scope.changePassword.newPassword !== "" && $scope.changePassword.retypePassword !== "" && $scope.changePassword.newPassword === $scope.changePassword.retypePassword) {
      $scope.staff_info_mod.SPassWord = $scope.changePassword.retypePassword;
      console.log($scope.staff_info_mod);
      $http.post('/staff/admin_staff_update', $scope.staff_info_mod)
        .then(function(response) {
          console.log("response", response);
        }, function(x) {
          console.log('Server Error');
        });
    } else if ($scope.changePassword.newPassword !== $scope.changePassword.retypePassword) {
      $scope.authorError = true;
    }
  };
  ////////////////////////update profile/////////////////////////////
  $scope.update_staff_profile = function() {

    $http.post('/staff/admin_staff_update', $scope.staff_info_mod)
      .then(function(response) {
        console.log("response", response);
      }, function(x) {
        console.log('Server Error');
      });
  }
}]);
