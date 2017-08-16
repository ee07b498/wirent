/**
 * @Date:   2017-07-23T21:31:42+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-16T10:41:50+10:00
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
app.controller('billProduceInstanceCtrl', ['$scope', '$modalInstance', 'items', 'properties', function($scope, $modalInstance, items, properties) {
  $scope.customer = items;
  $scope.propertyItem = {};
  $scope.properties = properties;
  $scope.propertyItem.address = properties[0].address;
  /**
   * datepicker - change the date
   *
   * here in the modal if we use $scope.opened for is open, which will
   * wrok only for the first time. Then add $parent.opened to is-opened
   * so, the datepicker will work correctly
   */
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = !$scope.opened;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };
  $scope.initDate = new Date('2017-5-20');
  $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  /**
   * getDateToString - convert date formate data into string data
   *
   * @param  {date} date   date
   * @param  {string} format format
   * @return {string}        string date
   */
  function getDateToString(date, format) {
    if (angular.isDate(date) && angular.isString(format)) {
      return $filter('date')(date, format);
    }
  }

  $scope.ok = function() {
    // $scope.customer.BillDate =  getDateToString($scope.dt, "yyyy-MM-dd");
    console.log($scope.items);
    console.log($scope.customer);
    $modalInstance.close();
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

app.controller('billAddInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
  $scope.items = items;
  $scope.ok = function() {
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
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
  $scope.update_customer_info = function() {
    console.log($scope.customerItem);
    $http.post('/staff/admin_landlord_update', $scope.customerItem)
      .then(function(response) {
        console.log("response", response);
      }, function(x) {
        console.log('Server Error');
      });
  }
  //////////////////customer entire rental check///////////////////////
  $http.post('/staff/admin_customer_er_check', {
      'CID': $stateParams.CID
    })
    .then(function(response) {
      $scope.customerProperties = response.data;
      console.log("customer er list", response);
    }, function(x) {
      console.log('Server Error');
    });
  ///////////////////////////////admin customer bil check/////////////////////////////////////////////////////
  $scope.Bill = {};
  $scope.billData = {};
  $scope.billData.CID = $stateParams.CID;
  $scope.billData.ER_ID = 0;
  $scope.billData.BillType = "";
  $scope.billData.BillDateMin = "2000-08-17";
  $scope.billData.BillDateMax = "2117-08-17";
  $http.post('/staff/admin_bill_check',$scope.billData)
    .then(function(response) {
      $scope.Bill = response.data;
      console.log("$scope.billData", response);
    }, function(x) {
      console.log('Server Error');
    });

  /////////////////////////service check///////////////////////////
  $scope.Service = {};
  $scope.serviceData = {};
  $scope.serviceData.CID = $stateParams.CID;
  $scope.serviceData.ER_ID = 0;
  $scope.serviceData.ServiceType = "";
  $scope.serviceData.ServiceStat = "";
  $scope.serviceData.ServiceDateMin = "2000-08-17";
  $scope.serviceData.ServiceDateMax = "2117-08-17";
  $http.post('/staff/admin_customer_service_check', $scope.serviceData)
    .then(function(response){
      $scope.Service = response.data;
      console.log("$scope.serviceData", response);
    }, function(x) {
      console.log('Server Error');
    });
    /////////////////////////maintenance check///////////////////////////
    $scope.Maintenance = {};
    $scope.maintenanceData = {};
    $scope.maintenanceData.CID = $stateParams.CID;
    $scope.maintenanceData.ER_ID = 0;
    $scope.maintenanceData.MType = "";
    $scope.maintenanceData.MStat = "";
    $scope.maintenanceData.MApplyDateMin = "2000-08-17";
    $scope.maintenanceData.MApplyDateMax = "2117-08-17";
    $http.post('/staff/admin_customer_service_check', $scope.maintenanceData)
      .then(function(response){
        console.log("$scope.maintenanceData", response);
      }, function(x) {
        console.log('Server Error');
      });

    ////////////////////////////////////////////////////////////////////
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
          return $scope.customerItem;
        },
        properties: function() {
          return $scope.customerProperties;
        }
      }
    });
  };
  /***********add bill********************/
  $scope.addBill = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'billAdd.html',
      controller: 'billAddInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
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
  /***********add inspection info********************/
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
  };

}]);
