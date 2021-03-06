/**
 * @Date:   2017-07-14T15:36:32+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-15T10:44:31+10:00
 */



'use strict'
app.controller('staffAddInstanceCtrl', ['$scope', '$http', '$modalInstance', 'ranknames', function($scope, $http, $modalInstance, ranknames) {
  $scope.ranknames = ranknames;
  $scope.staff_data = {};
  $scope.staff_data.rankname = ranknames[0].SRankName;
  $scope.ok = function() {
    console.log($scope.staff_data);
    $http.post('/staff/staff_register', $scope.staff_data)
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
/********************update staff info except password************************/
app.controller('staffUpdateInstanceCtrl', ['$scope', '$http', '$modalInstance', 'ranknames', 'staffInfo', function($scope, $http, $modalInstance, ranknames, staffInfo) {
  $scope.ranknames = ranknames;
  $scope.staffInfo = staffInfo;
  $scope.staffInfo.SRankName = staffInfo.SRankName;
  $scope.ok = function() {
    console.log($scope.staffInfo);
    $http.post('/staff/admin_staff_update', $scope.staffInfo)
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
app.controller('staffUpdatePasswordInstanceCtrl', ['$scope', '$http', '$modalInstance', 'staffInfo', function($scope, $http, $modalInstance, staffInfo) {
  $scope.staffInfo = staffInfo;
  $scope.staffPassword = {};
  $scope.authorError_nomatch = false;
  $scope.ok = function() {
    console.log($scope.staffInfo);
    if ($scope.staffPassword.newPassword !== "" && $scope.staffPassword.retypePassword !== "" && $scope.staffPassword.newPassword === $scope.staffPassword.retypePassword) {
      $scope.authorError_nomatch = false;
      $scope.staffInfo.SPassWord = $scope.staffPassword.retypePassword;
      console.log($scope.staffInfo);
      $http.post('/staff/admin_staff_update', $scope.staffInfo)
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
}]);
app.controller('staffManagement', ['$scope', '$http', '$modal', '$log', function($scope, $http, $modal, $log) {
  var ranknames = {};
  $scope.ranknames = {};
  $scope.staff_check = {};
  $scope.stafflist = {};
  /**********************rankname check********************************/
  $http.get('/staff/rankname')
    .then(function(response) {
      console.log("response", response);
      $scope.ranknames = response.data;
    }, function(x) {
      console.log('Server Error');
    });

  /********************staff list **********************************/
  $http.get('/staff/profile')
    .then(function(response) {
      // for (var i = 0; i < $scope.ranknames.length; i++) {
      //   if ($scope.ranknames[i].SRank = response.data.SRank) {
      //         $scope.staff_check.SRankName = $scope.ranknames[i].SRankName;
      //         return;
      //   }
      // }
      $scope.staff_check.SRankName = "";
      $scope.staff_check.SLoginStat = 0;
      $scope.staff_check.SWorkStat = "";
      $scope.staff_check.SCurrLoc = "";
      $http.post('/staff/staff_filt_check')
        .then(function(response) {
          $scope.stafflist = response.data;
          console.log("staff_filt_check", response);
          /*for (var i = 0; i < response.data.length; i++) {
            for (var j = 0; j < $scope.ranknames.length; j++) {
              if ($scope.ranknames[j].SRank = response.data[i].SRank) {
                     $scope.stafflist[i].SRankName = $scope.ranknames[j].SRankName;
              }
            }
         }*/
        }, function(x) {
          console.log('Server Error');
        });
    }, function(x) {
      console.log('Server Error');
    });

  /**
   * scope - add staff_info
   *
   * @param  {String} size size of modal
   * @return {type}      description
   */
  $scope.open = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'staffAdd.html',
      controller: 'staffAddInstanceCtrl',
      size: size,
      resolve: {
        ranknames: function() {
          return $scope.ranknames;
        }
      }
    });

  };

  /**
   * scope - add staff_info
   *
   * @param  {String} size size of modal
   * @return {type}      description
   */
  $scope.update_staffinfo = function(size, $index) {
    var modalInstance = $modal.open({
      templateUrl: 'staffUpdate.html',
      controller: 'staffUpdateInstanceCtrl',
      size: size,
      resolve: {
        ranknames: function() {
          return $scope.ranknames;
        },
        staffInfo: function() {
          return $scope.stafflist[$index];
        }
      }
    });
  };
  /**
   * scope - update password
   *
   * @param  {String} size size of modal
   * @return {type}      description
   */
  $scope.update_staff_password = function(size, $index) {
    var modalInstance = $modal.open({
      templateUrl: 'staffUpdatePassword.html',
      controller: 'staffUpdatePasswordInstanceCtrl',
      size: size,
      resolve: {
        staffInfo: function() {
          return $scope.stafflist[$index];
        }
      }
    });
  };



}]);
