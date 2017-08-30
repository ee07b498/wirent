/**
 * @Date:   2017-07-23T21:31:42+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-30T17:57:35+10:00
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
app.controller('billProduceInstanceCtrl', ['$scope', '$modalInstance', '$filter', 'items', 'properties', function($scope, $modalInstance, $filter, items, properties) {
  $scope.customer = items;
  $scope.propertyItem = {};
  $scope.dateSelect = {};
  $scope.properties = properties;
  $scope.propertyItem.address = properties[0].address;
  $scope.dateSelect.today = getDateToString(new Date(), 'yyyy-MM-dd');
  /**
   * datepicker - change the date
   *
   * here in the modal if we use $scope.opened for is open, which will
   * wrok only for the first time. Then add $parent.opened to is-opened
   * so, the datepicker will work correctly
   */
  $scope.today = function() {
    $scope.dateSelect.dt = getDateToString(new Date(), 'yyyy-MM-dd');
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dateSelect.dt = null;
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
    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };
  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  if (typeof $scope.dateSelect.dt === "string") {
    $scope.dateSelect.dt = $scope.dateSelect.dt.slice(0, 10);
  } else {
    $scope.dateSelect.dt = getDateToString($scope.dateSelect.dt, 'yyyy-MM-dd').slice(0, 10);
  }
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
  /**
   * getStringToDate - convert string date to date format
   *
   * @param  {String} string date string
   * @return {date}        date result
   */
  function getStringToDate(string) {
    if (angular.isString(string)) {
      return new Date(string.replace(/-/g, "-"));
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
    if (typeof $scope.dateSelect.dt === "string") {
      $scope.dateSelect.dt = $scope.dateSelect.dt.slice(0, 10);
      console.log($scope.dateSelect.dt);
    } else {
      $scope.dateSelect.dt = getDateToString($scope.dateSelect.dt, 'yyyy-MM-dd').slice(0, 10);
      console.log($scope.dateSelect.dt);
    }
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
    $modalInstance.close();
  }
}]);

app.controller('billAddInstanceCtrl', ['$scope', '$http', '$modalInstance', 'items', 'properties', '$filter', 'S3UploadImgService', function($scope, $http, $modalInstance, items, properties, $filter, S3UploadImgService) {
  $scope.customer = items;
  $scope.propertyItem = {};
  $scope.dateSelect = {};
  $scope.Bill = {};
  $scope.authorError = false;
  $scope.Bill.BillType = "";
  $scope.Bill.BillAmount = "";
  $scope.Bill.BillComment = "";
  $scope.Bill.BillCopy = "";
  $scope.Bill.BillReceipt = "";
  $scope.Bill.CID = items.CID;
  $scope.properties = properties;
  console.log(properties);
  $scope.propertyItem.address = properties[0].address;
  /**
   * datepicker - change the date
   *
   * here in the modal if we use $scope.opened for is open, which will
   * wrok only for the first time. Then add $parent.opened to is-opened
   * so, the datepicker will work correctly
   */
  $scope.today = function() {
    $scope.dateSelect.dt = getDateToString(new Date(), 'yyyy-MM-dd');
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dateSelect.dt = null;
  };

  // Disable weekend selection
  // $scope.disabled = function(date, mode) {
  //   return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
  // };
  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };
  $scope.initDate = new Date('2016-15-20');
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
  /**
   * getStringToDate - convert string date to date format
   *
   * @param  {String} string date string
   * @return {date}        date result
   */
  function getStringToDate(string) {
    if (angular.isString(string)) {
      return new Date(string.replace(/-/g, "-"));
    }
  }
  //upload Bill Copy
  $scope.uploadBillCopy = function(files) {
    $scope.BillCopy = files;
    if (files && files.length > 0) {
      angular.forEach($scope.BillCopy, function(file, key) {
        S3UploadImgService.Upload(file).then(function(result) {
          // Mark as success
          file.Success = true;
        }, function(error) {
          // Mark the error
          $scope.BillCopyError = error;
        }, function(progress) {
          // Write the progress as a percentage
          file.Progress = (progress.loaded / progress.total) * 100;
          if (file.Progress === 100) {
            $scope.Bill.BillCopy = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/" + file.name;

          }
        });
      });
    }
  };
  //upload Bill Receipt
  $scope.uploadBillReceipt = function(files) {
    $scope.BillReceipt = files;
    if (files && files.length > 0) {
      angular.forEach($scope.BillReceipt, function(file, key) {
        S3UploadImgService.Upload(file).then(function(result) {
          // Mark as success
          file.Success = true;
        }, function(error) {
          // Mark the error
          $scope.IDError = error;
        }, function(progress) {
          // Write the progress as a percentage
          file.Progress = (progress.loaded / progress.total) * 100;
          if (file.Progress === 100) {
            $scope.Bill.BillReceipt = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/" + file.name;
          }
        });
      });
    }
  };

  $scope.ok = function() {
    $scope.Bill.ER_ID = $scope.propertyItem.ER_ID;
    $scope.authorError = false;
    if (typeof $scope.dateSelect.dt === "string") {
      $scope.dateSelect.dt = $scope.dateSelect.dt;
    } else {
      $scope.dateSelect.dt = getDateToString($scope.dateSelect.dt, 'yyyy-MM-dd');
    }
    if ($scope.Bill.BillReceipt === "" || $scope.Bill.BillCopy === "") {
      $scope.authorError = true;
    }
    $scope.Bill.BillDate = $scope.dateSelect.dt;
    console.log($scope.Bill);
    /*************get all customers' informations***************/
    $http.post('/staff/admin_er_bill_insert', $scope.Bill)
      .then(function(response) {
        console.log(response.data);
      }, function(x) {
        console.log('Server Error');
      });
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
app.controller('billUpdateInstanceCtrl', ['$scope', '$http', '$modalInstance', 'items', '$filter', 'S3UploadImgService', function($scope, $http, $modalInstance, items, $filter, S3UploadImgService) {
  $scope.dateSelect = {};
  $scope.Bill = items;
  $scope.BillItem = {};
  $scope.authorError = false;
  /**
   * datepicker - change the date
   *
   * here in the modal if we use $scope.opened for is open, which will
   * wrok only for the first time. Then add $parent.opened to is-opened
   * so, the datepicker will work correctly
   */
  $scope.today = function() {
    $scope.dateSelect.dt = getDateToString(new Date(), 'yyyy-MM-dd');
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dateSelect.dt = null;
  };

  // Disable weekend selection
  // $scope.disabled = function(date, mode) {
  //   return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
  // };
  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };
  $scope.initDate = new Date('2016-15-20');
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
  /**
   * getStringToDate - convert string date to date format
   *
   * @param  {String} string date string
   * @return {date}        date result
   */
  function getStringToDate(string) {
    if (angular.isString(string)) {
      return new Date(string.replace(/-/g, "-"));
    }
  }
  //upload Bill Copy
  $scope.uploadBillCopy = function(files) {
    $scope.BillCopy = files;
    if (files && files.length > 0) {
      angular.forEach($scope.BillCopy, function(file, key) {
        S3UploadImgService.Upload(file).then(function(result) {
          // Mark as success
          file.Success = true;
        }, function(error) {
          // Mark the error
          $scope.BillCopyError = error;
        }, function(progress) {
          // Write the progress as a percentage
          file.Progress = (progress.loaded / progress.total) * 100;
          if (file.Progress === 100) {
            $scope.Bill.BillCopy = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/" + file.name;

          }
        });
      });
    }
  };
  //upload Bill Receipt
  $scope.uploadBillReceipt = function(files) {
    $scope.BillReceipt = files;
    if (files && files.length > 0) {
      angular.forEach($scope.BillReceipt, function(file, key) {
        S3UploadImgService.Upload(file).then(function(result) {
          // Mark as success
          file.Success = true;
        }, function(error) {
          // Mark the error
          $scope.IDError = error;
        }, function(progress) {
          // Write the progress as a percentage
          file.Progress = (progress.loaded / progress.total) * 100;
          if (file.Progress === 100) {
            $scope.Bill.BillReceipt = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/" + file.name;
          }
        });
      });
    }
  };

  $scope.ok = function() {
    $scope.authorError = false;
    if (typeof $scope.dateSelect.dt === "string") {
      $scope.dateSelect.dt = $scope.dateSelect.dt;
    } else {
      $scope.dateSelect.dt = getDateToString($scope.dateSelect.dt, 'yyyy-MM-dd');
    }
    if ($scope.Bill.BillReceipt === "" || $scope.Bill.BillCopy === "") {
      $scope.authorError = true;
    }
    if ($scope.Bill.BillComment) {
      $scope.Bill.BillComment = $scope.Bill.BillComment;
    } else {
      $scope.Bill.BillComment = "";
    }
    $scope.Bill.BillDate = $scope.dateSelect.dt;
    $scope.BillItem = $scope.Bill;
    delete $scope.BillItem["address"];
    console.log($scope.BillItem);
    /*************get all customers' informations***************/
    $http.post('/staff/admin_er_bill_update', $scope.BillItem)
      .then(function(response) {
        console.log(response.data);
      }, function(x) {
        console.log('Server Error');
      });
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);

app.controller('contractAddInstanceCtrl', ['$scope', '$modalInstance', '$filter', '$http', 'items', 'properties', 'S3UploadImgService', function($scope, $modalInstance, $filter, $http, items, properties, S3UploadImgService) {
  $scope.customer = items;
  $scope.propertyItem = {};
  $scope.dateSelect = {};
  $scope.Contract = {};
  $scope.authorError = false;
  $scope.Contract.CLType = "";
  $scope.Contract.CLDate = "2017-06-26";
  $scope.Contract.ContractFile = "";
  $scope.Contract.ContractComment = "";
  $scope.Contract.CID = items.CID;
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
    $scope.dateSelect.dt = getDateToString(new Date(), 'yyyy-MM-dd');
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dateSelect.dt = null;
  };

  // Disable weekend selection
  // $scope.disabled = function(date, mode) {
  //   return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
  // };
  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };
  $scope.initDate = new Date('2016-15-20');
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
  /**
   * getStringToDate - convert string date to date format
   *
   * @param  {String} string date string
   * @return {date}        date result
   */
  function getStringToDate(string) {
    if (angular.isString(string)) {
      return new Date(string.replace(/-/g, "-"));
    }
  }
  //upload Bill Copy
  $scope.uploadContract = function(files) {
    $scope.ContractFiles = files;
    if (files && files.length > 0) {
      angular.forEach($scope.ContractFiles, function(file, key) {
        S3UploadImgService.Upload(file).then(function(result) {
          // Mark as success
          file.Success = true;
        }, function(error) {
          // Mark the error
          $scope.ContractError = error;
        }, function(progress) {
          // Write the progress as a percentage
          file.Progress = (progress.loaded / progress.total) * 100;
          if (file.Progress === 100) {
            $scope.Contract.ContractFile = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/" + file.name;

          }
        });
      });
    }
  };

  $scope.ok = function() {
    angular.forEach(properties, function(value, key) {
      if (value.address == $scope.propertyItem.address) {
        $scope.Contract.ER_ID = value.ER_ID;
      }
    });
    $scope.authorError = false;
    if (typeof $scope.dateSelect.dt === "string") {
      $scope.dateSelect.dt = $scope.dateSelect.dt;
    } else {
      $scope.dateSelect.dt = getDateToString($scope.dateSelect.dt, 'yyyy-MM-dd');
    }
    if ($scope.Contract.ContractFile === "") {
      $scope.authorError = true;
    }
    $scope.Contract.CLDate = $scope.dateSelect.dt;
    console.log($scope.Contract);
    /*************get all customers' informations***************/
    $http.post('/staff/admin_customer_contract_insert', $scope.Contract)
      .then(function(response) {
        console.log(response.data);
      }, function(x) {
        console.log('Server Error');
      });
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

}]);
app.controller('serviceAddInstanceCtrl', ['$scope', '$modalInstance', '$filter', '$http', 'items', 'properties', 'S3UploadImgService', function($scope, $modalInstance, $filter, $http, items, properties, S3UploadImgService) {
  $scope.customer = items;
  $scope.propertyItem = {};
  $scope.dateSelect = {};
  $scope.Service = {};
  $scope.authorError = false;
  $scope.Service.ServiceType = "";
  $scope.Service.ServiceDate = "2017-06-26";
  $scope.Service.ServiceFile = "";
  $scope.Service.ServiceComment = "";
  $scope.Service.ServiceStat = "";
  $scope.Service.CID = items.CID;
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
    $scope.dateSelect.dt = getDateToString(new Date(), 'yyyy-MM-dd');
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dateSelect.dt = null;
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
    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };
  $scope.initDate = new Date('2016-15-20');
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
  /**
   * getStringToDate - convert string date to date format
   *
   * @param  {String} string date string
   * @return {date}        date result
   */
  function getStringToDate(string) {
    if (angular.isString(string)) {
      return new Date(string.replace(/-/g, "-"));
    }
  }
  //upload Bill Copy
  $scope.uploadService = function(files) {
    $scope.ServiceFiles = files;
    if (files && files.length > 0) {
      angular.forEach($scope.ServiceFiles, function(file, key) {
        S3UploadImgService.Upload(file).then(function(result) {
          // Mark as success
          file.Success = true;
        }, function(error) {
          // Mark the error
          $scope.ServiceError = error;
        }, function(progress) {
          // Write the progress as a percentage
          file.Progress = (progress.loaded / progress.total) * 100;
          if (file.Progress === 100) {
            $scope.Service.ServiceFile = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/" + file.name;

          }
        });
      });
    }
  };

  $scope.ok = function() {
    angular.forEach(properties, function(value, key) {
      if (value.address == $scope.propertyItem.address) {
        $scope.Service.ER_ID = value.ER_ID;
      }
    });
    $scope.authorError = false;
    if (typeof $scope.dateSelect.dt === "string") {
      $scope.dateSelect.dt = $scope.dateSelect.dt;
    } else {
      $scope.dateSelect.dt = getDateToString($scope.dateSelect.dt, 'yyyy-MM-dd');
    }
    if ($scope.Service.ServiceFile === "") {
      $scope.authorError = true;
    }
    $scope.Service.ServiceDate = $scope.dateSelect.dt;
    console.log($scope.Service);
    /*************get all customers' informations***************/
    $http.post('/staff/admin_customer_service_insert', $scope.Service)
      .then(function(response) {
        console.log(response.data);
      }, function(x) {
        console.log('Server Error');
      });
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
app.controller('serviceUpdateInstanceCtrl', ['$scope', '$modalInstance', '$filter', '$http', 'items', 'customerItem', 'S3UploadImgService', function($scope, $modalInstance, $filter, $http, items, customerItem, S3UploadImgService) {
  $scope.customer = customerItem;
  $scope.propertyItem = {};
  $scope.dateSelect = {};
  $scope.Service = {};
  $scope.authorError = false;
  $scope.Service.ServiceType = "";
  $scope.Service.ServiceDate = "2017-06-26";
  $scope.Service.ServiceFile = "";
  $scope.Service.ServiceComment = "";
  $scope.Service.ServiceStat = "";
  $scope.Service = items;
  console.log(items);
  /**
   * datepicker - change the date
   *
   * here in the modal if we use $scope.opened for is open, which will
   * wrok only for the first time. Then add $parent.opened to is-opened
   * so, the datepicker will work correctly
   */
  $scope.today = function() {
    $scope.dateSelect.dt = getDateToString(getStringToDate($scope.Service.ServiceDate), 'yyyy-MM-dd');
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dateSelect.dt = null;
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
    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };
  $scope.initDate = new Date('2016-15-20');
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
  /**
   * getStringToDate - convert string date to date format
   *
   * @param  {String} string date string
   * @return {date}        date result
   */
  function getStringToDate(string) {
    if (angular.isString(string)) {
      return new Date(string.replace(/-/g, "-"));
    }
  }
  //upload Bill Copy
  $scope.uploadService = function(files) {
    $scope.ServiceFiles = files;
    if (files && files.length > 0) {
      angular.forEach($scope.ServiceFiles, function(file, key) {
        S3UploadImgService.Upload(file).then(function(result) {
          // Mark as success
          file.Success = true;
        }, function(error) {
          // Mark the error
          $scope.ServiceError = error;
        }, function(progress) {
          // Write the progress as a percentage
          file.Progress = (progress.loaded / progress.total) * 100;
          if (file.Progress === 100) {
            $scope.Service.ServiceFile = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/" + file.name;

          }
        });
      });
    }
  };

  $scope.ok = function() {
    $scope.authorError = false;
    if (typeof $scope.dateSelect.dt === "string") {
      $scope.dateSelect.dt = $scope.dateSelect.dt;
    } else {
      $scope.dateSelect.dt = getDateToString($scope.dateSelect.dt, 'yyyy-MM-dd');
    }
    if ($scope.Service.ServiceFile === "") {
      $scope.authorError = true;
    }
    $scope.Service.ServiceDate = $scope.dateSelect.dt;
    /*************get all customers' informations***************/
    var serviceDataItem = {}
    serviceDataItem = $scope.Service;
    delete serviceDataItem["address"];
    console.log(serviceDataItem);
    $http.post('/staff/admin_customer_service_update', serviceDataItem)
      .then(function(response) {
        console.log(response.data);
      }, function(x) {
        console.log('Server Error');
      });
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);

app.controller('maintenanceAddInstanceCtrl', ['$scope', '$modalInstance', '$filter', '$http', 'items', 'properties', 'S3UploadImgService', function($scope, $modalInstance, $filter, $http, items, properties, S3UploadImgService) {
  $scope.customer = items;
  $scope.propertyItem = {};
  $scope.dateSelect = {};
  $scope.Maintenance = {};
  $scope.authorError = false;
  $scope.Maintenance.MType = "";
  $scope.Maintenance.MApplyDate = "2017-06-26";
  $scope.Maintenance.MApplyForm = "";
  $scope.Maintenance.MStat = "";
  $scope.Maintenance.CID = items.CID;
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
    $scope.dateSelect.dt = getDateToString(new Date(), 'yyyy-MM-dd');
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dateSelect.dt = null;
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
    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };
  $scope.initDate = new Date('2016-15-20');
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
  /**
   * getStringToDate - convert string date to date format
   *
   * @param  {String} string date string
   * @return {date}        date result
   */
  function getStringToDate(string) {
    if (angular.isString(string)) {
      return new Date(string.replace(/-/g, "-"));
    }
  }
  //upload Maintenance Application forms
  $scope.uploadMaintenance = function(files) {
    $scope.MaintenanceFiles = files;
    if (files && files.length > 0) {
      angular.forEach($scope.MaintenanceFiles, function(file, key) {
        S3UploadImgService.Upload(file).then(function(result) {
          // Mark as success
          file.Success = true;
        }, function(error) {
          // Mark the error
          $scope.ServiceError = error;
        }, function(progress) {
          // Write the progress as a percentage
          file.Progress = (progress.loaded / progress.total) * 100;
          if (file.Progress === 100) {
            $scope.Maintenance.MApplyForm = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/" + file.name;

          }
        });
      });
    }
  };

  $scope.ok = function() {
    angular.forEach(properties, function(value, key) {
      if (value.address == $scope.propertyItem.address) {
        $scope.Maintenance.ER_ID = value.ER_ID;
      }
    });
    $scope.authorError = false;
    if (typeof $scope.dateSelect.dt === "string") {
      $scope.dateSelect.dt = $scope.dateSelect.dt;
    } else {
      $scope.dateSelect.dt = getDateToString($scope.dateSelect.dt, 'yyyy-MM-dd');
    }
    if ($scope.Maintenance.MApplyForm === "") {
      $scope.authorError = true;
    }
    $scope.Maintenance.MApplyDate = $scope.dateSelect.dt;
    console.log($scope.Maintenance);
    /*************get all customers' informations***************/
    $http.post('/staff/admin_customer_service_insert', $scope.Maintenance)
      .then(function(response) {
        console.log(response.data);
      }, function(x) {
        console.log('Server Error');
      });
    $modalInstance.close();
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
app.controller('user_profileCtrl', ['$scope', '$http', '$modal', '$log', '$stateParams', '$filter', 'S3UploadImgService', function($scope, $http, $modal, $log, $stateParams, $filter, S3UploadImgService) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.customerItem = {};
  $scope.dateSelect = {};
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

  /**
   * datepicker - change the date
   *
   * here in the modal if we use $scope.opened for is open, which will
   * wrok only for the first time. Then add $parent.opened to is-opened
   * so, the datepicker will work correctly
   */
  $scope.today = function() {
    $scope.dateSelect.dt = getDateToString(getStringToDate($scope.customerItem.CLastContDate), 'yyyy-MM-dd');
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dateSelect.dt = null;
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
    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };
  $scope.initDate = new Date('2016-15-20');
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
  /**
   * getStringToDate - convert string date to date format
   *
   * @param  {String} string date string
   * @return {date}        date result
   */
  function getStringToDate(string) {
    if (angular.isString(string)) {
      return new Date(string.replace(/-/g, "-"));
    }
  }


  //upload photo ID
  $scope.uploadPhotoID = function(files) {
    $scope.IDFiles = files;
    if (files && files.length > 0) {
      angular.forEach($scope.IDFiles, function(file, key) {
        S3UploadImgService.Upload(file).then(function(result) {
          // Mark as success
          file.Success = true;
        }, function(error) {
          // Mark the error
          $scope.IDError = error;
        }, function(progress) {
          // Write the progress as a percentage
          file.Progress = (progress.loaded / progress.total) * 100;
          if (file.Progress === 100) {
            $scope.customerItem.CIDProfile = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/" + file.name;

          }
        });
      });
    }
  };
  //upload photo ID
  $scope.uploadIncomeFiles = function(files) {
    $scope.IncomeFiles = files;
    if (files && files.length > 0) {
      angular.forEach($scope.IncomeFiles, function(file, key) {
        S3UploadImgService.Upload(file).then(function(result) {
          // Mark as success
          file.Success = true;
        }, function(error) {
          // Mark the error
          $scope.IncomeError = error;
        }, function(progress) {
          // Write the progress as a percentage
          file.Progress = (progress.loaded / progress.total) * 100;
          if (file.Progress === 100) {
            $scope.customerItem.CIncomeProfile = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/" + file.name;

          }
        });
      });
    }
  };
  //upload photo ID
  $scope.uploadSavingFiles = function(files) {
    $scope.SavingFiles = files;
    if (files && files.length > 0) {
      angular.forEach($scope.SavingFiles, function(file, key) {
        S3UploadImgService.Upload(file).then(function(result) {
          // Mark as success
          file.Success = true;
        }, function(error) {
          // Mark the error
          $scope.SavingError = error;
        }, function(progress) {
          // Write the progress as a percentage
          file.Progress = (progress.loaded / progress.total) * 100;
          if (file.Progress === 100) {
            $scope.customerItem.CSavingProfile = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/" + file.name;
            console.log($scope.etPicInsert);
          }
        });
      });
    }
  };

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
  $scope.Bills = {};
  $scope.billData = {};
  $scope.billData.CID = $stateParams.CID;
  $scope.billData.ER_ID = 0;
  $scope.billData.BillType = "";
  $scope.billData.BillDateMin = "2000-08-17";
  $scope.billData.BillDateMax = "2117-08-17";
  $http.post('/staff/admin_bill_check', $scope.billData)
    .then(function(response) {
      $scope.Bills = response.data;
      /*********************get the properties**************************/
      $http.post('/staff/admin_customer_er_check', {
          'CID': $stateParams.CID
        })
        .then(function(response) {
          $scope.customerProperties = response.data;
          angular.forEach($scope.customerProperties, function(value, key) {
            for (var i = 0; i < $scope.Bills.length; i++) {
              if ($scope.Bills[i].ER_ID === value.ER_ID) {
                $scope.Bills[i].address = value.address;
              }
            }
          });
          console.log("customer er list", response);
        }, function(x) {
          console.log('Server Error');
        });
      console.log("$scope.billData", response);
    }, function(x) {
      console.log('Server Error');
    });

  ///////////////////////////////admin customer contract check/////////////////////////////////////////////////////
  $scope.Contracts = {};
  $scope.contractData = {};
  $scope.contractData.CID = $stateParams.CID;
  $scope.contractData.ER_ID = 0;
  $scope.contractData.CLType = "";
  $scope.contractData.CLDateMin = "2000-08-17";
  $scope.contractData.CLDateMax = "2117-08-17";
  $scope.contractData.ContractComment = "";
  console.log($scope.contractData);
  $http.post('/staff/admin_customer_contract_check', $scope.contractData)
    .then(function(response) {
      $scope.Contracts = response.data;
      console.log(response);
      /*********************get the properties**************************/
      $http.post('/staff/admin_customer_er_check', {
          'CID': $stateParams.CID
        })
        .then(function(response) {
          $scope.customerProperties = response.data;
          angular.forEach($scope.customerProperties, function(value, key) {
            for (var i = 0; i < $scope.Contracts.length; i++) {
              if ($scope.Contracts[i].ER_ID === value.ER_ID) {
                $scope.Contracts[i].address = value.address;
              }
            }
          });
          console.log("customer er list", response);
        }, function(x) {
          console.log('Server Error');
        });
      console.log("$scope.billData", response);
    }, function(x) {
      console.log('Server Error');
    });


  /////////////////////////service check///////////////////////////
  $scope.Services = {};
  $scope.serviceData = {};
  $scope.serviceData.CID = $stateParams.CID;
  $scope.serviceData.ER_ID = 0;
  $scope.serviceData.ServiceType = "";
  $scope.serviceData.ServiceStat = "";
  $scope.serviceData.ServiceDateMin = "2000-08-17";
  $scope.serviceData.ServiceDateMax = "2117-08-17";
  $http.post('/staff/admin_customer_service_check', $scope.serviceData)
    .then(function(response) {
      $scope.Services = response.data;
      /*********************get the properties**************************/
      $http.post('/staff/admin_customer_er_check', {
          'CID': $stateParams.CID
        })
        .then(function(response) {
          $scope.customerProperties = response.data;
          angular.forEach($scope.customerProperties, function(value, key) {
            for (var i = 0; i < $scope.Services.length; i++) {
              if ($scope.Services[i].ER_ID === value.ER_ID) {
                $scope.Services[i].address = value.address;
              }
            }
          });
          console.log("customer er list", response);
        }, function(x) {
          console.log('Server Error');
        });
      console.log("$scope.serviceData", response);
    }, function(x) {
      console.log('Server Error');
    });
  /////////////////////////maintenance check///////////////////////////
  $scope.Maintenances = {};
  $scope.maintenanceData = {};
  $scope.maintenanceData.CID = $stateParams.CID;
  $scope.maintenanceData.ER_ID = 0;
  $scope.maintenanceData.MType = "";
  $scope.maintenanceData.MStat = "";
  $scope.maintenanceData.MApplyDateMin = "2000-08-17";
  $scope.maintenanceData.MApplyDateMax = "2117-08-17";
  $http.post('/staff/admin_customer_maintenance_check', $scope.maintenanceData)
    .then(function(response) {
      $scope.Maintenances = response.data;
      /*********************get the properties**************************/
      $http.post('/staff/admin_customer_er_check', {
          'CID': $stateParams.CID
        })
        .then(function(response) {
          $scope.customerProperties = response.data;
          angular.forEach($scope.customerProperties, function(value, key) {
            for (var i = 0; i < $scope.Maintenances.length; i++) {
              if ($scope.Maintenances[i].ER_ID === value.ER_ID) {
                $scope.Maintenances[i].address = value.address;
              }
            }
          });
          console.log("customer er list", response);
        }, function(x) {
          console.log('Server Error');
        });
      console.log("$scope.maintenanceData", response);
    }, function(x) {
      console.log('Server Error');
    });

  ////////////////////////////////////////////////////////////////////

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
          return $scope.customerItem;
        },
        properties: function() {
          return $scope.customerProperties;
        }
      }
    });
  };
  $scope.updateBill = function(size, $index) {
    var modalInstance = $modal.open({
      templateUrl: 'billUpdate.html',
      controller: 'billUpdateInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.Bills[$index];
        },
        properties: function() {
          return $scope.customerProperties;
        }
      }
    });
  };
  $scope.deleteBill = function(index) {
    var deleteData = {};
    deleteData.BLID = $scope.Bills[index].BLID;
    $http.post('/staff/admin_er_bill_delete', deleteData)
      .then(function(response) {
        console.log("response", response);
      }, function(x) {
        console.log('Server Error');
      });
  }


  $scope.contract_add = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'contractAdd.html',
      controller: 'contractAddInstanceCtrl',
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

  $scope.contract_delete = function(index) {
    var contractDeleteData = {};
    console.log($scope.Contracts[index]);
    contractDeleteData.ER_ID = $scope.Contracts[index].ER_ID;
    contractDeleteData.CLType = $scope.Contracts[index].CLType;
    contractDeleteData.CID = $scope.Contracts[index].CID;
    contractDeleteData.CLDate = $scope.Contracts[index].CLDate;
    $http.post('/staff/admin_customer_contract_delete', contractDeleteData)
      .then(function(response) {
        console.log("customer er list", response);
      }, function(x) {
        console.log('Server Error');
      });
  };

  $scope.service_add = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'serviceAdd.html',
      controller: 'serviceAddInstanceCtrl',
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

  $scope.service_update = function(size, index) {
    var modalInstance = $modal.open({
      templateUrl: 'serviceUpdate.html',
      controller: 'serviceUpdateInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.Services[index];
        },
        customerItem: function(){
          return $scope.customerItem;
        }
      }
    });
  };

  $scope.service_delete = function(index) {
    var serviceDeleteData = {};
    serviceDeleteData.SLID = $scope.Services[index].SLID;
    $http.post('/staff/admin_customer_service_delete', serviceDeleteData)
      .then(function(response) {
        console.log("response", response);
      }, function(x) {
        console.log('Server Error');
      });
  };

  $scope.maintenance_add = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'maintenanceAdd.html',
      controller: 'maintenanceAddInstanceCtrl',
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
