/**
 * @Date:   2017-07-24T13:55:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-23T15:44:52+10:00
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
app.controller('promotionUpdteInstanceCtrl', ['$scope', '$http', '$modalInstance', 'items', function($scope, $http, $modalInstance, items) {
  $scope.propertyItem = {};
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
  $scope.initDate = getStringToDate($scope.propertyItem.ER_AvailableDate);
  $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.propertyItem = items;

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

  $scope.business_promotion_update = function() {

    console.log($scope.propertyItem);
    $http.post('/staff/admin_thirdparty_promotion_update', $scope.propertyItem)
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
  $scope.property_info = {};
  $scope.university = {};
  $scope.property_info.ER_No = "";
  $scope.property_info.ER_St = "";
  $scope.property_info.ER_Suburb = "";
  $scope.property_info.ER_Region = "";
  $scope.property_info.ER_Area = "";
  $scope.property_info.ER_BedRoom = "";
  $scope.property_info.ER_BathRoom = "";
  $scope.property_info.ER_Kitchen = "";
  $scope.property_info.ER_Parking = "";
  $scope.property_info.ER_Price = "";
  $scope.property_info.ER_Stat = "";
  // $scope.property_info.ER_AvailableDate = "";
  // $scope.property_info.LLID = "";
  $scope.property_info.ER_InspRep = "";
  $scope.property_info.ER_Description = "";
  $scope.property_info.ER_Type = "";
  $scope.property_info.ER_Feature = "";
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
  $scope.initDate = new Date('2016-5-20');
  $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  /*************************************************************************************/

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
  $scope.property_info.LLID = items.LLID;
  $scope.property_info.ER_AvailableDate = getDateToString($scope.dt, "yyyy-MM-dd");


  $scope.ok = function() {
    console.log(items);
    console.log("$scope.university", $scope.university);
    console.log($scope.property_info);
    /*********************process the data of features***************************/
    if (typeof $scope.property_info.ER_Feature === "string") {

    } else {
      // $scope.property_info.ER_Feature = _.map($scope.paxlist, 'name').join('; ');
      var str = "";
      for (var i = 0; i < $scope.property_info.ER_Feature.length; i++) {
        if (i === $scope.property_info.ER_Feature.length - 1) {
          str += $scope.property_info.ER_Feature[i];
        } else {
          str += $scope.property_info.ER_Feature[i] + ";";
        }
      }
      $scope.property_info.ER_Feature = str;
      console.log($scope.property_info.ER_Feature);
    }
    /*********************process the data of description end***************************/
    if (typeof $scope.property_info.ER_Description === "string") {

    } else {
      // $scope.property_info.ER_Feature = _.map($scope.paxlist, 'name').join('; ');
      var str = "";
      for (var i = 0; i < $scope.property_info.ER_Description.length; i++) {

        if (i === $scope.property_info.ER_Description.length - 1) {
          if ($scope.property_info.ER_Description[i] === "university") {
            str += $scope.property_info.ER_Description[i] + ";" + $scope.university.selected;
          } else {
            str += $scope.property_info.ER_Description[i];
          }
        } else {
          if ($scope.property_info.ER_Description[i] === "university") {
            str += $scope.property_info.ER_Description[i] + ";" + $scope.university.selected + ";";
          } else {
            str += $scope.property_info.ER_Description[i] + ";";
          }
        }
      }
      $scope.property_info.ER_Description = str;
      console.log($scope.property_info.ER_Description);
    }
    $http.post('/staff/admin_landlord_er_insert', $scope.property_info)
      .then(function(response) {
        console.log("response", response);

        /**************关闭当前modal********************/
        $modalInstance.close();
      }, function(x) {
        console.log('Server Error');
      });


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
  if(JSON.stringify(getDataCommonService.get()) != "{}"){
     $localStorage.settings = getDataCommonService.get().data;
     console.log('$localStorage.settings',$localStorage.settings);
     $scope.business_info = $localStorage.settings;
    }else{
     $scope.business_info = $localStorage.settings;
     console.log('$localStorage.settings other conditions',$localStorage.settings);
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
          return $scope.propertyDetails[$index];
        }
      }
    });
  };
  //==========================add promotion==================================================
   $scope.promotionAdd = function(size,$index){
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
