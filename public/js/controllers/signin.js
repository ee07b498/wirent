/**
 * @Date:   2017-06-30T10:20:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-07-28T10:56:03+10:00
 */



'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      $http.post('/staff/login', {user_name: $scope.user.email, password: $scope.user.password})
      .then(function(response) {
        console.log("response", response);
        if ( response.data === "1" ) {

          $state.go('app.dashboard-v1');
        }else{
          $scope.authError = 'Email or Password not right';
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
  }])
;
