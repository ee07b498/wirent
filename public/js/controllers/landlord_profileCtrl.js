/**
 * @Date:   2017-07-24T13:55:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-15T15:59:42+10:00
 */
'use strict'

app.controller('propertyDetailsInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
  $scope.propertyItem = {};
  $scope.propertyItem = items;
  $scope.ok = function() {
    console.log($scope.propertyItem);
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
app.controller('propertyFormsInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
  $scope.propertyForm = {};
  $scope.propertyItems = [];
  $scope.propertyItem = {};
  $scope.propertyForm.er_including = false,
    $scope.propertyForm.facility = "",
    $scope.propertyForm.train_station = "",
    $scope.propertyForm.bus_stop = "",
    $scope.propertyForm.ferry = "",
    $scope.propertyForm.light_rail = "",
    $scope.propertyForm.shops = "",
    $scope.propertyForm.school = "",
    $scope.propertyForm.others = "",
    $scope.propertyForm.description_en = "",
    $scope.propertyForm.description_ch = "",
    $scope.propertyForm.description_zh = "",
    $scope.propertyForm.comment = "";
  for (var i = 0; i < items.length; i++) {
    $scope.propertyItem.ER_ID = items[i].ER_ID;
    $scope.propertyItem.address = items[i].ER_No + " " + items[i].ER_St + " " + items[i].ER_Suburb + "," + items[i].ER_Region;
    $scope.propertyItems.push($scope.propertyItem);
    $scope.propertyItem = {};
  }
  $scope.propertyItem.address = $scope.propertyItems[0].address;
  $scope.ok = function() {
    angular.forEach($scope.propertyItems, function(value, key) {
      if (value.address === $scope.propertyItem.address) {
        $scope.propertyForm.ER_ID = value.ER_ID;
      }
    });
    console.log($scope.propertyItem.address);
    console.log($scope.propertyItems);
    console.log($scope.propertyForm);
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
app.controller('propertyDetailsInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
  $scope.propertyItem = {};
  $scope.propertyItem = items;
  $scope.ok = function() {
    console.log($scope.propertyItem);
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
app.controller('propertyDetailsEditInstanceCtrl', ['$scope', '$http', '$modalInstance', 'items', function($scope, $http, $modalInstance, items) {
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

  $scope.ok = function() {

    console.log($scope.propertyItem);
    $http.post('/staff/admin_landlord_er_update', $scope.propertyItem)
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
app.controller('landlordPropertyAddInstanceCtrl', ['$scope', '$modalInstance', 'items', '$filter', '$http', function($scope, $modalInstance, items, $filter, $http) {
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
app.controller('landlord_profileCtrl', ['$scope', '$modal', '$http', '$log', '$stateParams', function($scope, $modal, $http, $log, $stateParams) {
  $scope.landLord_info = {};
  $scope.changePassword = {};
  $scope.properties = {};
  $scope.propertyDetails = {};
  $scope.authorError = false;
  $scope.landLord_info.LLEmail = $stateParams.LLEmail;
  $scope.landLord_info.LLID = $stateParams.LLID;
  $scope.landLord_info.LLName = $stateParams.LLName;
  $scope.landLord_info.LLPassword = $stateParams.LLPassword;
  $scope.landLord_info.LLPhone = $stateParams.LLPhone;
  $scope.landLord_info.LLCellphone = $stateParams.LLCellphone;
  console.log($scope.landLord_info);
  $scope.items = {};



  //////////////////change password///////////////////////
  $scope.update_staff_password = function() {
    console.log($scope.changePassword);
    $scope.authorError = false;
    if ($scope.changePassword.newPassword !== "" && $scope.changePassword.retypePassword !== "" && $scope.changePassword.newPassword === $scope.changePassword.retypePassword) {
      $scope.landLord_info.LLPassword = $scope.changePassword.retypePassword;
      console.log($scope.landLord_info);
      $http.post('/staff/admin_landlord_update', $scope.landLord_info)
        .then(function(response) {
          console.log("response", response);
        }, function(x) {
          console.log('Server Error');
        });
    } else if ($scope.changePassword.newPassword !== $scope.changePassword.retypePassword) {
      $scope.authorError = true;
    }
  };
  //////////////////////profile update///////////////////////////////
  $scope.update_landlord_profile = function() {
    $http.post('/staff/admin_landlord_update', $scope.landLord_info)
      .then(function(response) {
        console.log("response", response);
      }, function(x) {
        console.log('Server Error');
      });
  }
  ///////////////////////////property check///////////////////////////////////////////////
  $http.post('/staff/admin_landlord_er_check', {
      'LLID': $scope.landLord_info.LLID
    })
    .then(function(response) {
      console.log("response", response);
      $scope.properties = response.data;
    }, function(x) {
      console.log('Server Error');
    });


  //////////////////////////show the details about the property///////////////////////////////////////////////
  $scope.openDetails = function(size, $index) {
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
  };
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

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  /************************details edit***********************************/
  $scope.details_Edit = function(size, $index) {
    var modalInstance = $modal.open({
      templateUrl: 'propertyDetailsEdit.html',
      controller: 'propertyDetailsEditInstanceCtrl',
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
  };
  /*****************admin entire properties check*****************************/
  $scope.inputStr = "";
  $http.post('/staff/admin_er_check', $scope.inputStr)
    .then(function(response) {
      $scope.propertyDetails = response.data;
      console.log("response", response);
    }, function(x) {
      console.log('Server Error');
    });
  /*****************admin er form add***********************************************************/
  $scope.landlord_propertyFormAdd = function(size) {
    var modalInstance = $modal.open({
      templateUrl: 'propertyForms.html',
      controller: 'propertyFormsInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.properties;
        }
      }
    });
  }
  /**************admin landlord entire property delete**********************************************************/

  $scope.er_delete = function(ER_ID) {
    console.log(ER_ID);
    $http.post('/staff/admin_landlord_er_delete', {'ER_ID':ER_ID})
      .then(function(response) {
        console.log("response", response);
        /**************关闭当前modal********************/
        $modalInstance.close();
      }, function(x) {
        console.log('Server Error');
      });
  }

}]);
