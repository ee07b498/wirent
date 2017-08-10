/**
 * @Date:   2017-07-23T21:31:42+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-10T17:10:15+10:00
 */
'use strict'
app.controller('propertyDetailsInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function() {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
app.controller('billProduceInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function() {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

  /**
   * print bill
   *
   **/
  $scope.printBill = function(div) {
    var printContents = document.getElementById(div);
    var popupWin = window.open('', '_blank', 'width=880,height=800,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no,top=200,bottom=200');
    popupWin.window.focus();
    popupWin.document.open();
    popupWin.document.write('<!DOCTYPE html><html><head><title>TITLE OF THE PRINT OUT</title>' +
      '<link rel="stylesheet" type="text/css" href="/fonts/css/font-awesome.min.css" />' +
      '<link rel="stylesheet" type="text/css"  href="/font/flaticon.css" />' +
      '	<link rel="stylesheet" href="/css/bootstrap.css" type="text/css" />' +
      '<link rel="stylesheet" type="text/css"  href="css/winning/app.css" />' +
      '<link rel="stylesheet" type="text/css" media="print" href="css/winning/print.css" />' +
      '<script src="vendor/angular/angular.js"></script>' +
      '</head><body onload="window.print(); "><div>');
    popupWin.document.write(printContents.innerHTML);
    popupWin.document.write('</div></body></html>');
    popupWin.focus();
    popupWin.document.close();
  }
}]);
app.controller('contractAddInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function() {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
app.controller('serviceAddInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function() {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
app.controller('maintenanceAddInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function() {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
app.controller('inspectionAddInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function() {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
app.controller('user_profileCtrl', ['$scope', '$http', '$modal', '$log', '$stateParams', function($scope, $http, $modal, $log, $stateParams) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.customerItem = {};
  $scope.changePassword = {};
  $scope.customerProperties = {};
  $scope.authorError = false;
  /*************get all customers' informations***************/
  $http.post('/staff/admin_customer_check', $scope.inputStr)
    .then(function(response) {
      angular.forEach(response.data, function(value, key) {
        if (value.CID == $stateParams.CID) {
          $scope.customerItem = value;
          console.log(value);
        }
      });

    }, function(x) {
      console.log('Server Error');
    });
    //////////////////change password///////////////////////
    $scope.update_customer_password = function() {
      console.log($scope.changePassword);
      $scope.authorError = false;
      if ($scope.changePassword.newPassword !== "" && $scope.changePassword.retypePassword !== "" && $scope.changePassword.newPassword === $scope.changePassword.retypePassword) {
        $scope.customerItem.CPassword = $scope.changePassword.retypePassword;
        console.log($scope.customerItem);
        $http.post('/staff/admin_landlord_update', $scope.customerItem)
          .then(function(response) {
            console.log("response", response);
          }, function(x) {
            console.log('Server Error');
          });
      } else if ($scope.changePassword.newPassword !== $scope.changePassword.retypePassword) {
        $scope.authorError = true;
      }
    };
    //////////////////update customer info///////////////////////
    $scope.update_customer_info = function(){
      $http.post('/staff/admin_landlord_update', $scope.customerItem)
        .then(function(response) {
          console.log("response", response);
        }, function(x) {
          console.log('Server Error');
        });
    }
      //////////////////customer entire rental check///////////////////////
      $http.post('/staff/admin_customer_er_check', {'CID': $stateParams.CID})
        .then(function(response) {
          $scope.customerProperties = response.data;
          console.log("customer er list", response);
        }, function(x) {
          console.log('Server Error');
        });


  $scope.open = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'propertyDetails.html',
      controller: 'propertyDetailsInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  /**
   * produce bill
   **/
  $scope.openInvoice = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'billProduce.html',
      controller: 'billProduceInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.contract_add = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'contractAdd.html',
      controller: 'contractAddInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.service_add = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'serviceAdd.html',
      controller: 'serviceAddInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.maintenance_add = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'maintenanceAdd.html',
      controller: 'maintenanceAddInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.service_add = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'serviceAdd.html',
      controller: 'serviceAddInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.inspection_add = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'inspectionAdd.html',
      controller: 'inspectionAddInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

}]);
