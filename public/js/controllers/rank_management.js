/**
 * @Date:   2017-08-02T11:22:51+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-03T16:19:22+10:00
 */
'use strict';

app.controller('rankManagementCtrl', ['$scope', '$element', '$http', function($scope, $element, $http) {
  $scope.ranktable = {};
  $scope.rankname_flag = [];
  $scope.rankname_editable = false;
  $scope.rankname_authError = false;
  $scope.rankname_checkvalue = [];
  $scope.rightname_checkvalue = [];
  $scope.rightname_flag = [];
  $scope.rightname_editable = false;
  $scope.rightname_authError = false;
  /*rankname check*/
  $http.get('/staff/rankname')
    .then(function(response) {
      console.log("response", response);
      $scope.ranktable.rankname = response.data;
      for (var i = 0; i < $scope.ranktable.rankname.length; i++) {
        $scope.rankname_checkvalue.push(false);
        $scope.rankname_flag.push(false);
      }
    }, function(x) {
      console.log('Server Error');
    });

  /*rightname check*/
  $http.get('/staff/rightname')
    .then(function(response) {
      console.log("response", response);
      $scope.ranktable.rightname = response.data;
      for (var j = 0; j < $scope.ranktable.rightname.length; j++) {
        $scope.rightname_checkvalue.push(false);
        $scope.rightname_flag.push(false);
      }
    }, function(x) {
      console.log('Server Error');
    });
  $scope.rankname_select = function($index) {
    // var element = $element.find(".rankname")[$index];
    for (var k = 0; k < $scope.ranktable.rankname.length; k++) {
      $scope.rankname_checkvalue[k] = false;
    }
    $scope.rankname_checkvalue[$index] = !$scope.rankname_checkvalue[$index];
    console.log($scope.rankname_checkvalue);
  }

  $scope.rightname_select = function($index) {
    // var element = $element.find(".rankname")[$index];
    $scope.rightname_checkvalue[$index] = !$scope.rightname_checkvalue[$index];
    console.log($scope.rightname_checkvalue);
  }
  $scope.rankname_delete = function($index){
    console.log(123);
  }
  $scope.rightname_delete = function($index){
    console.log(1234);
  }
  $scope.rankname_add = function(){
      if (!$scope.rankname_editable) {
        $scope.rankname_flag[$scope.ranktable.rankname.length] = true;
        $scope.ranktable.rankname.push({SRankName:""});
        console.log($scope.rankname_flag);
        $scope.rankname_editable = true;
      }
  }
  $scope.rankname_save = function(){
    console.log($scope.ranktable.rankname[$scope.ranktable.rankname.length-1]);
    if ($scope.ranktable.rankname[$scope.ranktable.rankname.length-1].SRankName !=="") {
      $http.post('/staff/add_rankname',{"SRankName":$scope.ranktable.rankname[$scope.ranktable.rankname.length-1].SRankName})
        .then(function(response) {
          console.log("response", response);
          $scope.rankname_editable = false;
          $scope.rankname_flag[$scope.ranktable.rankname.length-1] = false;
        }, function(x) {
          console.log('Server Error');
        });
    }else {
      $scope.rankname_authError = true;
    }

  }
  /**
   * right name
   */
   $scope.rightname_delete = function($index){
     console.log(1234);
   }
   $scope.rightname_add = function(){
       if (!$scope.rightname_editable) {
         $scope.rightname_flag[$scope.ranktable.rightname.length] = true;
         $scope.ranktable.rightname.push({"Right_Name":""});
         console.log($scope.rightname_flag);
         $scope.rightname_editable = true;
       }
   }
   $scope.rightname_save = function(){
     console.log($scope.ranktable.rightname[$scope.ranktable.rightname.length-1]);
     if ($scope.ranktable.rightname[$scope.ranktable.rightname.length-1].Right_Name !=="") {
       $http.post('/staff/add_rightname',{"Right_Name":$scope.ranktable.rightname[$scope.ranktable.rightname.length-1].Right_Name})
         .then(function(response) {
           console.log("response", response);
           $scope.rightname_editable = false;
           $scope.rightname_flag[$scope.ranktable.rightname.length-1] = false;
         }, function(x) {
           console.log('Server Error');
         });
     }else {
       $scope.rightname_authError = true;
     }

   }
}]);
