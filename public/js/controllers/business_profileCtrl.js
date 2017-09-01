/**
 * @Date:   2017-07-24T13:55:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-31T17:49:44+10:00
 */
'use strict'

/*app.controller('propertyDetailsInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
  $scope.propertyItem = {};
  $scope.propertyItem = items;
  $scope.ok = function() {
    console.log($scope.propertyItem);
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);*/
app.controller('promotionUpdteInstanceCtrl', ['$scope', '$http', '$filter', '$modalInstance', 'items', function($scope, $http, $filter, $modalInstance, items) {
  $scope.promotion_update = {};
  $scope.business_info = {};
  $scope.dateSelect = {};
  $scope.business_info = items;
  /**
   * datepicker - change the date
   *
   * here in the modal if we use $scope.opened for is open, which will
   * wrok only for the first time. Then add $parent.opened to is-opened
   * so, the datepicker will work correctly
   */
  /*datepicker*/
  $scope.today = function() {
    $scope.dateSelect.dt = getDateToString(new Date(), "yyyy-MM-dd");
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dateSelect.dt = null;
  };
  $scope.today = function() {
    $scope.dateSelect.dt2 = getDateToString(new Date(), "yyyy-MM-dd");
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dateSelect.dt2 = null;
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
  $scope.open2 = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened2 = true;
  };
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };

  $scope.initDate = getDateToString(new Date, 'yyyy-MM-dd');
  $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
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
  /*************************************************************************************/
  $scope.promotion_update.TPID = items.TPID;
  $scope.business_promotion_update = function() {
    if (typeof $scope.dateSelect.dt === "string") {
      $scope.promotion_update.StartDate = $scope.dateSelect.dt;
    } else {
      $scope.promotion_update.StartDate = getDateToString($scope.dateSelect.dt, 'yyyy-MM-dd');
    }

    if (typeof $scope.dateSelect.dt2 === "string") {
      $scope.promotion_update.EndDate = $scope.dateSelect.dt2;
    } else {
      $scope.promotion_update.EndDate = getDateToString($scope.dateSelect.dt2, 'yyyy-MM-dd');
    }
    console.log($scope.promotion_update);
    $http.post('/staff/admin_thirdparty_promotion_update', $scope.promotion_update)
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
app.controller('promotionAddInstanceCtrl', ['$scope', '$modalInstance', 'items', '$filter', '$http', function($scope, $modalInstance, items, $filter, $http) {
  $scope.dateSelect = {};
  $scope.promotionAdd = {};
  $scope.business_info = {};
  $scope.business_info = items;
  /**
   * datepicker - change the date
   *
   * here in the modal if we use $scope.opened for is open, which will
   * wrok only for the first time. Then add $parent.opened to is-opened
   * so, the datepicker will work correctly
   */
  /*datepicker*/
  $scope.today = function() {
    $scope.dateSelect.dt = getDateToString(new Date(), "yyyy-MM-dd");
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dateSelect.dt = null;
  };
  $scope.today = function() {
    $scope.dateSelect.dt2 = getDateToString(new Date(), "yyyy-MM-dd");
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dateSelect.dt2 = null;
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
  $scope.open2 = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened2 = true;
  };
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };

  $scope.initDate = getDateToString(new Date, 'yyyy-MM-dd');
  $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
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
  /*************************************************************************************/

  $scope.promotionAdd.TPID = items.TPID;
  $scope.business_promotion_add = function() {
    if (typeof $scope.dateSelect.dt === "string") {
      $scope.promotionAdd.StartDate = $scope.dateSelect.dt;
    } else {
      $scope.promotionAdd.StartDate = getDateToString($scope.dateSelect.dt, 'yyyy-MM-dd');
    }

    if (typeof $scope.dateSelect.dt2 === "string") {
      $scope.promotionAdd.EndDate = $scope.dateSelect.dt2;
    } else {
      $scope.promotionAdd.EndDate = getDateToString($scope.dateSelect.dt2, 'yyyy-MM-dd');
    }
    $http.post('/staff/admin_thirdparty_promotion_insert', $scope.promotionAdd)
      .then(function(response) {
        console.log("response", response);
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


app.controller('business_profileCtrl', ['$scope', '$modal', '$http', '$log', '$localStorage', '$stateParams', 'getDataCommonService', function($scope, $modal, $http, $log, $localStorage, $stateParams, getDataCommonService) {
  $scope.business_info = {};
  $scope.promotions = {};
  $scope.changePassword = {};
  $scope.properties = {};
  $scope.propertyDetails = {};
  $scope.authorError = false;
  $scope.inputStr = "";
  $scope.items = {};


  /////////////////////////get all the business///////////////////////////////////////
  if (JSON.stringify(getDataCommonService.get()) != "{}") {
    $localStorage.settings = getDataCommonService.get().data;
    console.log('$localStorage.settings', $localStorage.settings);
    $scope.business_info = $localStorage.settings;
  } else {
    $scope.business_info = $localStorage.settings;
    console.log('$localStorage.settings other conditions', $localStorage.settings);
  }

  console.log($scope.business_info);

  //////////////////change password///////////////////////
  $scope.update_staff_password = function() {
    console.log($scope.changePassword);
    $scope.authorError = false;
    if ($scope.changePassword.newPassword !== "" && $scope.changePassword.retypePassword !== "" && $scope.changePassword.newPassword === $scope.changePassword.retypePassword) {
      $scope.business_info.TPPassword = $scope.changePassword.retypePassword;
      console.log($scope.business_info);
      $http.post('/staff/admin_thirdparty_update', $scope.business_info)
        .then(function(response) {
          $localStorage.settings = $scope.business_info;
          console.log("response", response);
        }, function(x) {
          console.log('Server Error');
        });
    } else if ($scope.changePassword.newPassword !== $scope.changePassword.retypePassword) {
      $scope.authorError = true;
    }
  };
  //upload Bill Copy
  $scope.uploadAdsLogo = function(files) {
    $scope.AdsLogo = files;
    if (files && files.length > 0) {
      angular.forEach($scope.AdsLogo, function(file, key) {
        S3UploadImgService.Upload(file).then(function(result) {
          // Mark as success
          file.Success = true;
        }, function(error) {
          // Mark the error
          $scope.AdsLogoError = error;
        }, function(progress) {
          // Write the progress as a percentage
          file.Progress = (progress.loaded / progress.total) * 100;
          if (file.Progress === 100) {
            $scope.business_info.TPLogo = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/" + file.name;

          }
        });
      });
    }
  };
  //////////////////////profile update///////////////////////////////
  $scope.update_business_profile = function() {
    $http.post('/staff/admin_thirdparty_update', $scope.business_info)
      .then(function(response) {
        console.log("response", $scope.business_info);
        $localStorage.settings = $scope.business_info;
      }, function(x) {
        console.log('Server Error');
      });
  }
  ///////////////////////////property check///////////////////////////////////////////////
  $http.post('/staff/admin_thirdparty_promotion_check', {
      'TPID': $scope.business_info.TPID
    })
    .then(function(response) {
      console.log("response", response);
      $scope.promotions = response.data;
    }, function(x) {
      console.log('Server Error');
    });


  //////////////////////////show the details about the property///////////////////////////////////////////////
  /*  $scope.openDetails = function(size, $index) {
      var modalInstance = $modal.open({
        templateUrl: 'propertyDetails.html',
        controller: 'propertyDetailsInstanceCtrl',
        size: size,
        resolve: {
          items: function() {
            return $scope.propertyDetails[$index];
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        $scope.selected = selectedItem;
      }, function() {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };*/
  /*********************添加整租房产信息************************************/
  $scope.landlord_propertyAdd = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'landlordPropertyAdd.html',
      controller: 'landlordPropertyAddInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.landLord_info;
        }
      }
    });
  };

  /************************details edit***********************************/
  $scope.promotion_update = function(size, $index) {
    var modalInstance = $modal.open({
      templateUrl: 'promotionUpdte.html',
      controller: 'promotionUpdteInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.business_info;
        },
        promotions: function(){
          return $scope.promotions;
        }
      }
    });
  };
  //==========================add promotion==================================================
  $scope.promotionAdd = function(size, $index) {
    var modalInstance = $modal.open({
      templateUrl: 'promotionAdd.html',
      controller: 'promotionAddInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.business_info;
        }
      }
    });
  }

}]);
