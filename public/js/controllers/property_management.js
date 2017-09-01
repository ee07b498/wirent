/**
 * @Date:   2017-07-12T12:15:07+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-29T10:50:23+10:00
 */
'use strict'
app.controller('entirePropertyAddInstanceCtrl', ['$scope', '$modalInstance', 'items', '$filter', '$http', function($scope, $modalInstance, items, $filter, $http) {
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
//===================add pictures to entire properties====================================
app.controller('propertyPicAddInstanceCtrl', ['$scope', '$http', '$modalInstance', 'items', 'S3UploadImgService', function($scope, $http, $modalInstance, items, S3UploadImgService) {
  // console.log(items);
  $scope.etPicInsert = {};
  $scope.etPicInsert.ER_ID = items.ER_ID;
  $scope.etPicInsert.SRID = 0;
  $scope.etPicInsert.PicFile = "";
  $scope.etPicInsert.PicDescription = "";
  $scope.uploadFiles = function (files) {
      $scope.Files = files;
      if (files && files.length > 0) {
          angular.forEach($scope.Files, function (file, key) {
              S3UploadImgService.Upload(file).then(function (result) {
                  // Mark as success
                  file.Success = true;
              }, function (error) {
                  // Mark the error
                  $scope.Error = error;
              }, function (progress) {
                  // Write the progress as a percentage
                  file.Progress = (progress.loaded / progress.total) * 100;
                  if (file.Progress === 100) {
                    $scope.etPicInsert.PicFile = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/"+file.name;
                    // console.log($scope.etPicInsert);
                    $http.post('/staff/admin_pic_insert', $scope.etPicInsert)
                      .then(function(response) {
                        console.log("response", response);
                        /**************关闭当前modal********************/
                        $modalInstance.close();
                      }, function(x) {
                        console.log('Server Error');
                      });

                  }
              });
          });
      }
  };
}]);
/******************property update*********************************************************/
app.controller('propertyDetailsUpdateInstanceCtrl', ['$scope', '$http', '$modalInstance', 'items', function($scope, $http, $modalInstance, items) {
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
    delete $scope.propertyItem["landlord"];
    console.log($scope.propertyItem);
    $scope.propertyItem.ER_InspRep = "F://abc/dg";
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

//property details check
app.controller('propertyDetailsInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
  $scope.propertyItem = {};
  $scope.propertyItem = items;
  $scope.ok = function() {
    $modalInstance.close();
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);

// entire form check modal
app.controller('entireFormCheckInstanceCtrl', ['$scope', '$http', '$modalInstance', 'items', function($scope, $http, $modalInstance, items) {
  $scope.propertyForm = {};
  $scope.entire_form = {};
  $scope.entire_form.ER_ID = items;
  $scope.ok = function() {
    console.log(items);
    $http.post('/staff/admin_er_form_check', $scope.entire_form)
      .then(function(response) {
        console.log("response", response);
        $scope.propertyForm = response.data;
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

app.controller('propertyManagementCtrl', function($scope, $http, $state, $modal, $log, $timeout) {
  $scope.inputStr = "";
  $scope.str = "";
  $scope.entireProperties = {};
  $scope.landlords = {};
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
  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  ///////////////////////////property check///////////////////////////////////////////////
  $http.post('/staff/admin_er_check', {
      'inputStr': $scope.inputStr
    })
    .then(function(response) {
      console.log("response", response);
      $scope.entireProperties = response.data;
      ////////////////////////landlord check///////////////////////////////////////////////////
      $http.post('/staff/admin_landlord_check', {
          'str': $scope.str
        })
        .then(function(response) {
          console.log("response", response);
          $scope.landlords = response.data;
          angular.forEach($scope.entireProperties, function(value, key) {
            for (var i = 0; i < $scope.landlords.length; i++) {
              if (value.LLID == $scope.landlords[i].LLID) {
                value.landlord = $scope.landlords[i];
              }
            }
          });
        }, function(x) {
          console.log('Server Error');
        });
    }, function(x) {
      console.log('Server Error');
    });
  //===========================entire form check====================================================
  $scope.entireForm = function(size,ER_ID) {
    var modalInstance = $modal.open({
      templateUrl: 'entireFormCheck.html',
      controller: 'entireFormCheckInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return ER_ID;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  ///////////////////////////////////property details////////////////////////////////////////
  $scope.openDetails = function(size, $index) {
    var modalInstance = $modal.open({
      templateUrl: 'propertyDetails.html',
      controller: 'propertyDetailsInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.entireProperties[$index];
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  //================== add pictures for properties======================================================================================
  $scope.property_pic_add = function(size, index) {
    var modalInstance = $modal.open({
      templateUrl: 'propertyPicAdd.html',
      controller: 'propertyPicAddInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.entireProperties[index];
        }
      }
    });
  }
  //////////////////////add new property//////////////////////////////////////
  $scope.entire_property_Add = function(size, obj) {
    var modalInstance = $modal.open({
      templateUrl: 'entirePropertyAdd.html',
      controller: 'entirePropertyAddInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return obj;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  /**************************update property details***********************************/
  $scope.property_details_update = function(size, $index) {
    var modalInstance = $modal.open({
      templateUrl: 'propertyDetailsUpdate.html',
      controller: 'propertyDetailsUpdateInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.entireProperties[$index];
        }
      }
    });
  };
  /**********************delete the property****************************************/
  $scope.property_delete = function(ER_ID) {
    console.log(ER_ID);
    $http.post('/staff/admin_landlord_er_delete', {
        'ER_ID': ER_ID
      })
      .then(function(response) {
        console.log("response", response);
        /**************关闭当前modal********************/
        $modalInstance.close();
      }, function(x) {
        console.log('Server Error');
      });
  }

});
