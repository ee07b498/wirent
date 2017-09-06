/**
 * @Date:   2017-07-11T11:20:25+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-09-06T13:50:38+10:00
 */
'use strict'
app.controller('propertyAddInstanceCtrl', ['$scope', '$http', '$modalInstance', '$filter', 'items', '$timeout', 'getDataCommonService', function($scope, $http, $modalInstance, $filter, items, $timeout, getDataCommonService) {

  $scope.property_info = {};
  $scope.university = {};
  $scope.dateSelect = {};
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
  // $scope.property_info.ER_Stat = "";
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
    $scope.dateSelect.dt = getDateToString(new Date(), "yyyy-MM-dd");
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
  $scope.property_info.LLID = items.LLID;



  $scope.ok = function() {
    console.log(items);
    console.log("$scope.university", $scope.university);
    $scope.property_info.ER_AvailableDate = getDateToString($scope.dateSelect.dt, "yyyy-MM-dd");
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
    console.log($scope.property_info);
    $http.post('/landlord/insert', $scope.property_info)
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
app.controller('propertyUpdateInstanceCtrl', ['$scope', '$http', '$modalInstance', '$filter', '$timeout', 'propertyItem', function($scope, $http, $modalInstance, $filter, $timeout, propertyItem) {
  $scope.propertyItem = {};
  // $scope.property_info.LLID = items.LLID;
  $scope.university = {};
  $scope.dateSelect = {};
  $scope.propertyItem = propertyItem;
  /**
   * datepicker - change the date
   *
   * here in the modal if we use $scope.opened for is open, which will
   * wrok only for the first time. Then add $parent.opened to is-opened
   * so, the datepicker will work correctly
   */
  $scope.today = function() {
    $scope.dateSelect.dt = getDateToString(getStringToDate($scope.propertyItem.ER_AvailableDate), "yyyy-MM-dd");
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
    console.log("$scope.university", $scope.university);
    if (typeof $scope.dateSelect.dt === "string") {
      $scope.propertyItem.ER_AvailableDate = $scope.dateSelect.dt;
    }else {
      $scope.propertyItem.ER_AvailableDate = getDateToString($scope.dateSelect.dt, "yyyy-MM-dd");
    }
    console.log($scope.propertyItem);
    $http.post('/landlord/update', $scope.propertyItem)
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
app.controller('propertymgmCtrl', ['$scope', '$http', '$localStorage', '$modal', '$log', '$timeout', '$stateParams', 'getDataCommonService', function($scope, $http, $localStorage, $modal, $log, $timeout, $stateParams, getDataCommonService) {
  $scope.properties = {};
  $scope.landlordInfo = {};

  /***********pagination starts********************/
  $scope.maxSize = 5;
  // $scope.totalItems = $scope.customers.length;
  $scope.currentPage = 1;
  $scope.itemsPerPage = 10;
  /***********pagination starts********************/

  if (JSON.stringify(getDataCommonService.get()) != "{}") {
    $localStorage.properties = getDataCommonService.get().data;
    $scope.properties = $localStorage.properties;
    $scope.totalItems = $scope.properties.length;
  } else {
    $scope.properties = $localStorage.properties;
    $scope.totalItems = $scope.properties.length;
  }
  $scope.propertyItems = {};
  $http.post('/landlord/profile', {
      'LLEmail': $localStorage.landlord
    })
    .then(function(r) {
      console.log(r);
      if (r.data.landlord_login_status == 1) {
        $scope.landlordInfo = r.data;
        var PropertiesData = [];
        $http.post('/staff/admin_er_check', {
          'inputStr': ''
        }).then(function(r) {
          angular.forEach(r.data, function(value, key) {
            if (value.LLID === $scope.landlordInfo.LLID) {
              PropertiesData[PropertiesData.length] = value;
            }
          });
          $scope.propertyItems = PropertiesData;
            console.log($scope.propertyItems);
        });

      }
    });

  $scope.open = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'propertyAdd.html',
      controller: 'propertyAddInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.landlordInfo;
        }
      }
    });
  };
  $scope.update_property = function(size, index) {
    var modalInstance = $modal.open({
      templateUrl: 'propertyUpdate.html',
      controller: 'propertyUpdateInstanceCtrl',
      size: size,
      resolve: {
        /*items: function() {
          return $scope.landlordInfo;
        },*/
        propertyItem: function() {
          return $scope.propertyItems[index];
        }
      }
    });
  }

}]);
