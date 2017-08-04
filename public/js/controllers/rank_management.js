/**
 * @Date:   2017-08-02T11:22:51+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-04T12:08:31+10:00
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
  $scope.rankright_authError = false;
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
//rankname_select
  $scope.rankname_select = function($index) {
    // var element = $element.find(".rankname")[$index];
    for (var k = 0; k < $scope.ranktable.rankname.length; k++) {
      $scope.rankname_checkvalue[k] = false;
    }
    $scope.rankname_checkvalue[$index] = !$scope.rankname_checkvalue[$index];
    $scope.ranktable.current = $index;
    console.log($scope.ranktable.rankname[$index].SRank);
    $http.post('/staff/rankright',{"SRank":$scope.ranktable.rankname[$index].SRank})
      .then(function(response) {
        $scope.ranktable.rankrights = response.data;

      }, function(x) {
        console.log('Server Error');
      });
  }
// rankname delete
  $scope.rankname_delete = function($index){
    $http.post('/staff/delete_rankname',{"SRankName":$scope.ranktable.rankname[$index].SRankName})
      .then(function(response) {
        console.log("response", response);
      }, function(x) {
        console.log('Server Error');
      });
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

  /******************************************************************
   ************************right name********************************
   *****************************************************************/
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

   $scope.rightname_select = function($index) {
     // var element = $element.find(".rankname")[$index];
     for (var l = 0; l < $scope.ranktable.rightname.length; l++) {
       $scope.rightname_checkvalue[l] = false;
     }
     $scope.rightname_checkvalue[$index] = !$scope.rightname_checkvalue[$index];
     $scope.ranktable.right_name =  $scope.ranktable.rightname[$index].Right_Name;
     console.log($scope.rightname_checkvalue);
   }

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
// add rights for rank
   $scope.rankrights_add = function(){
     console.log($scope.ranktable.rankrights);
     console.log($scope.ranktable.right_name);
      $scope.rankright_authError = false;
     for (var m = 0; m < $scope.ranktable.rankrights.length; m++) {
       if ($scope.ranktable.right_name == $scope.ranktable.rankrights[m].Right_Name) {
         $scope.rankright_authError = true;
         return;
       }
     }
     if (!$scope.rankright_authError) {
       $http.post('/staff/add_rankrights',{"SRankName":$scope.ranktable.rankname[$scope.ranktable.current].SRankName,"Right_Name":$scope.ranktable.right_name})
         .then(function(response) {
           console.log("response", response);
         }, function(x) {
           console.log('Server Error');
         });
     }
   }
   //delete rights from rank
   $scope.rankrights_delete = function($index){
     $http.post('/staff/delete_rankrights',{"SRankName":$scope.ranktable.rankname[$scope.ranktable.current].SRankName,"Right_Name":$scope.ranktable.rankrights[$index].Right_Name})
       .then(function(response) {
         console.log("response", response);
       }, function(x) {
         console.log('Server Error');
       });
   }
}]);
