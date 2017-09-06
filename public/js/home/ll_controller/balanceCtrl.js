/**
 * @Date:   2017-07-19T22:45:01+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-09-05T17:21:04+10:00
 */
 'use strict'
 app.controller('propertyDetailsInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
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
  }])
  ;
  app.controller('balanceCtrl', ['$scope', '$modal', '$log', '$http', '$localStorage', 'getDataCommonService', function($scope, $modal, $log, $http, $localStorage, getDataCommonService) {
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.properties = getDataCommonService.get().data;
    $scope.balanceParams = {};
    if(JSON.stringify(getDataCommonService.get()) != "{}"){
       $localStorage.balances = getDataCommonService.get().data;
       $scope.properties = $localStorage.balances;
      }else{
       $scope.properties = $localStorage.balances;
     }
     console.log($scope.properties);
     $scope.balance_ER_ID = $scope.properties[0].ER_ID;
     $scope.balanceParams.CID = 0;
     $scope.balanceParams.ER_ID = $scope.properties[0].ER_ID;
     $scope.balanceParams.BillType = "";
     $scope.balanceParams.BillDateMin = "1999-06-26";
     $scope.balanceParams.BillDateMax = "2999-06-26";
     $http.post('/landlord/balance', $scope.balanceParams)
       .then(function(r) {
         console.log(r);
       });
     $scope.getBalance = function(){
       $scope.balanceParams.ER_ID = $scope.balance_ER_ID;
       $http.post('/landlord/balance', $scope.balanceParams)
         .then(function(r) {
           console.log(r);
         });
     }
    $scope.openDetails = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'propertyDetails.html',
        controller: 'propertyDetailsInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }])
  ;
