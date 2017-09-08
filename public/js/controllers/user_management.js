/**
 * @Date:   2017-07-14T16:27:20+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-09-08T13:05:16+10:00
 */



'use strict'
//add costomer Controller
app.controller('userAddInstanceCtrl', ['$scope', '$modalInstance', '$http', function($scope, $modalInstance, $http) {
  $scope.Customer = {};
  $scope.ok = function() {
    $http.post('/staff/admin_customer_insert', $scope.Customer)
      .then(function(response) {
        console.log("response", response);
        $modalInstance.close();
      }, function(x) {
        console.log('Server Error');
      });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
//update costomer Controller
app.controller('updateCustomerInstanceCtrl', ['$scope', '$modalInstance', '$filter', '$http', 'items', 'S3UploadImgService', 'S3UploadFileService', function($scope, $modalInstance, $filter, $http, items, S3UploadImgService, S3UploadFileService) {
  $scope.customerItem = items;
  $scope.dateSelect = {};
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
    $scope.opened = !$scope.opened;
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
  //===========================================================================================
  //==                                                                                     ====
  //==                                files upload section                                 ====
  //==                                                                                     ====
  //===========================================================================================
//upload profile image
  $scope.uploadProfileImg = function (files) {
      $scope.ImgFiles = files;
      if (files && files.length > 0) {
          angular.forEach($scope.ImgFiles, function (file, key) {
              S3UploadImgService.Upload(file).then(function (result) {
                  // Mark as success
                  file.Success = true;
              }, function (error) {
                  // Mark the error
                  $scope.ImgError = error;
              }, function (progress) {
                  // Write the progress as a percentage
                  file.Progress = (progress.loaded / progress.total) * 100;
                  if (file.Progress === 100) {
                    $scope.customerItem.CPhoto = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/"+file.name;
                    console.log($scope.etPicInsert);
                  }
              });
          });
      }
  };

  //upload photo ID
  $scope.uploadPhotoID = function (files) {
      $scope.IDFiles = files;
      if (files && files.length > 0) {
          angular.forEach($scope.IDFiles, function (file, key) {
              S3UploadImgService.Upload(file).then(function (result) {
                  // Mark as success
                  file.Success = true;
              }, function (error) {
                  // Mark the error
                  $scope.IDError = error;
              }, function (progress) {
                  // Write the progress as a percentage
                  file.Progress = (progress.loaded / progress.total) * 100;
                  if (file.Progress === 100) {
                    $scope.customerItem.CIDProfile = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/"+file.name;

                  }
              });
          });
      }
  };
  //upload photo ID
  $scope.uploadIncomeFiles = function (files) {
      $scope.IncomeFiles = files;
      if (files && files.length > 0) {
          angular.forEach($scope.IncomeFiles, function (file, key) {
              S3UploadImgService.Upload(file).then(function (result) {
                  // Mark as success
                  file.Success = true;
              }, function (error) {
                  // Mark the error
                  $scope.IncomeError = error;
              }, function (progress) {
                  // Write the progress as a percentage
                  file.Progress = (progress.loaded / progress.total) * 100;
                  if (file.Progress === 100) {
                    $scope.customerItem.CIncomeProfile = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/"+file.name;

                  }
              });
          });
      }
  };
  //upload photo ID
  $scope.uploadSavingFiles = function (files) {
      $scope.SavingFiles = files;
      if (files && files.length > 0) {
          angular.forEach($scope.SavingFiles, function (file, key) {
              S3UploadImgService.Upload(file).then(function (result) {
                  // Mark as success
                  file.Success = true;
              }, function (error) {
                  // Mark the error
                  $scope.SavingError = error;
              }, function (progress) {
                  // Write the progress as a percentage
                  file.Progress = (progress.loaded / progress.total) * 100;
                  if (file.Progress === 100) {
                    $scope.customerItem.CSavingProfile = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/"+file.name;
                    console.log($scope.etPicInsert);
                  }
              });
          });
      }
  };


  $scope.update_customer_info = function() {
    if (typeof $scope.dateSelect.dt === "string") {
      $scope.customerItem.CLastContDate = $scope.dateSelect.dt;
    } else {
      $scope.customerItem.CLastContDate = getDateToString($scope.dateSelect.dt, 'yyyy-MM-dd');
    }
    $http.post('/staff/admin_customer_update', $scope.customerItem)
      .then(function(response) {

        $modalInstance.close();
      }, function(x) {
        console.log('Server Error');
      });
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
app.controller('userManagementCtrl', ['$scope', '$modal', '$log', '$http', function($scope, $modal, $log, $http) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.customers = {};
  $scope.inputStr = "";

  $http.post('/staff/admin_customer_check', $scope.inputStr)
    .then(function(response) {
      $scope.customers = response.data;
      $scope.totalItems = $scope.customers.length;
      console.log(response.data);
    }, function(x) {
      console.log('Server Error');
    });

  /***********pagination starts********************/
  $scope.maxSize = 5;
  // $scope.totalItems = $scope.customers.length;
  $scope.currentPage = 1;
  $scope.itemsPerPage = 10;
  /***********pagination starts********************/

  $scope.open = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'userAdd.html',
      controller: 'userAddInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });
  };
  /***************************update customer item*****************************************/
  $scope.updateCustomerItem = function(size, $index) {
    var modalInstance = $modal.open({
      templateUrl: 'updateCustomer.html',
      controller: 'updateCustomerInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.customers[$index];
        }
      }
    });
  }
  /*******************delete user item*******************************/
  $scope.deleteUserItem = function(CID) {
    $http.post('/staff/admin_customer_delete', {
        'CID': CID
      })
      .then(function(response) {
        console.log(response);
      }, function(x) {
        console.log('Server Error');
      });
  }


}]);
