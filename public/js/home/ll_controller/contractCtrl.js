/**
 * @Date:   2017-07-19T22:45:01+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-09-06T11:46:57+10:00
 */
 'use strict'
 app.controller('inpectionMsgInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
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
  }]);
  app.controller('contractCtrl', ['$scope', '$modal', '$http', '$log','$localStorage', 'getDataCommonService', function($scope, $modal, $http, $log, $localStorage, getDataCommonService) {
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.properties = getDataCommonService.get().data;
    $scope.contractParams = {};
    $scope.inspectionParams = {};
    if(JSON.stringify(getDataCommonService.get()) != "{}"){
       $localStorage.contracts = getDataCommonService.get().data;
       $scope.properties = $localStorage.contracts;
      }else{
       $scope.properties = $localStorage.contracts;
     }
     console.log($scope.properties);
     $scope.contract_ER_ID = $scope.properties[0].ER_ID;
     $scope.contractParams.CID = 0;
     $scope.contractParams.ER_ID = $scope.properties[0].ER_ID;
     $scope.contractParams.CLType = "";
     $scope.contractParams.CLDateMin = "1999-06-26";
     $scope.contractParams.CLDateMax = "2999-06-26";
     $scope.contractParams.ContractComment = "";
     $http.post('/landlord/stat_on', $scope.contractParams)
       .then(function(r) {
         console.log(r);
       });
     $scope.getContract = function(){
       alert("222");
       $scope.contractParams.ER_ID = $scope.contract_ER_ID;
       console.log($scope.contractParams);
       $http.post('/landlord/stat_on', $scope.contractParams)
         .then(function(r) {
           console.log(r);
         });
     }

     $http.post('/landlord/profile', {
         'LLEmail': $localStorage.landlord
       })
       .then(function(r) {
         console.log(r);
         if (r.data.landlord_login_status == 1) {
           $scope.landlordInfo = r.data;
         }
       });
       $scope.inspection_msg = function(size){
         $scope.inspectionParams.LLID = $scope.landlordInfo.LLID;
         $scope.inspectionParams.ER_ID = $scope.contractParams.ER_ID;
         $http.post('/landlord/stat_pre', $scope.inspectionParams)
           .then(function(r) {
             console.log(r);
             var modalInstance = $modal.open({
               templateUrl: 'inpectionMsg.html',
               controller: 'inpectionMsgInstanceCtrl',
               size: size,
               resolve: {
                 items: function () {
                   return r.data;
                 }
               }
             });
           });
       }

  }])
  ;
