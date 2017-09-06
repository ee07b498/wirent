/**
 * @Date:   2017-08-15T14:20:59+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-09-06T13:11:14+10:00
 */
'use strict'
app.controller('updateShareRoomInstanceCtrl', ['$scope', '$http', '$filter', '$modalInstance', 'items', function($scope, $http, $filter, $modalInstance, items) {
  $scope.ShareRoomData = {};
  $scope.dateSelect = {};
  $scope.ShareRoomData.SRArea = "";
  $scope.ShareRoomData.SRStat = "";
  $scope.ShareRoomData.SRAvailableDate = "2017-06-26";
  $scope.ShareRoomData.SRPrice = "";
  $scope.ShareRoomData.SRName = "";
  $scope.ShareRoomData = items;
  /**
   * datepicker - change the date
   *
   * here in the modal if we use $scope.opened for is open, which will
   * wrok only for the first time. Then add $parent.opened to is-opened
   * so, the datepicker will work correctly
   */
  $scope.today = function() {
    $scope.dateSelect.dt = getDateToString(getStringToDate($scope.ShareRoomData.SRAvailableDate), 'yyyy-MM-dd');
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

  $scope.ok = function() {
    var ShareRoomData = {};
    ShareRoomData = $scope.ShareRoomData;
    delete ShareRoomData["address"];
    delete ShareRoomData["LLName"];
    $http.post('/staff/admin_sr_update', ShareRoomData)
      .then(function(response) {
        console.log("response", response);
      }, function(x) {
        console.log('Server Error');
      });
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
// entire form check modal
app.controller('shareRoomFormInstanceCtrl', ['$scope', '$http', '$modalInstance', 'items', 'address', function($scope, $http, $modalInstance, items, address) {
  $scope.shareRoomForm = items[0];
  console.log($scope.shareRoomForm);
  $scope.edit = false;
  $scope.address = address;
  $scope.Edit = function() {
    $scope.edit = true;
  };
  $scope.Save = function() {
    $scope.edit = false;
    console.log($scope.shareRoomForm);
    $http.post('/staff/admin_sr_form_update', $scope.shareRoomForm)
      .then(function(response) {
        console.log("response", response);
      }, function(x) {
        console.log('Server Error');
      });
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
//add pictues to share room
app.controller('propertyPicAddInstanceCtrl', ['$scope', '$http', '$modalInstance', 'items', 'S3UploadImgService', function($scope, $http, $modalInstance, items, S3UploadImgService) {
  $scope.etPicInsert = {};
  // console.log(items);
  $scope.etPicInsert.ER_ID = items.ER_ID;
  $scope.etPicInsert.SRID = items.SRID;
  $scope.etPicInsert.PicFile = "";
  $scope.etPicInsert.PicDescription = "";
  $scope.uploadFiles = function(files) {
    $scope.Files = files;
    if (files && files.length > 0) {
      angular.forEach($scope.Files, function(file, key) {
        S3UploadImgService.Upload(file).then(function(result) {
          // Mark as success
          file.Success = true;
        }, function(error) {
          // Mark the error
          $scope.Error = error;
        }, function(progress) {
          // Write the progress as a percentage
          file.Progress = (progress.loaded / progress.total) * 100;
          if (file.Progress === 100) {
            $scope.etPicInsert.PicFile = "https://s3-ap-southeast-2.amazonaws.com/property-img-upload-test/img/" + file.name;
            console.log($scope.etPicInsert);
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
app.controller('SharePropertyCtrl', function($scope, $http, $state, $modal, $log, $timeout) {
  ///////////////////////////share room property check///////////////////////////////////////////////
  $scope.ShareProperties = {};
  /***********pagination starts********************/
  $scope.maxSize = 5;
  // $scope.totalItems = $scope.customers.length;
  $scope.currentPage = 1;
  $scope.itemsPerPage = 10;
  /***********pagination ends********************/
  $http.get('/staff/admin_sr_list_check')
    .then(function(response) {
      $scope.ShareProperties = response.data;
      $scope.totalItems = $scope.ShareProperties.length;
      console.log("response", response);
    }, function(x) {
      console.log('Server Error');
    });
  //=====================================================
  $scope.shareForm = function(size, address, SRID) {
    $scope.shareRoomForm = {};
    $scope.share_form = {};
    $scope.share_form.SRID = SRID;
    $http.post('/staff/admin_sr_form_check', $scope.share_form)
      .then(function(response) {
        console.log("response", response);
        $scope.shareRoomForm = response.data;
        var modalInstance = $modal.open({
          templateUrl: 'shareRoomForm.html',
          controller: 'shareRoomFormInstanceCtrl',
          size: size,
          resolve: {
            items: function() {
              return $scope.shareRoomForm;
            },
            address: function() {
              return address;
            }
          }
        });
      }, function(x) {
        console.log('Server Error');
      });
  };

  ///////////////////////////////////property details////////////////////////////////////////
  /*$scope.openDetails = function(size,$index) {
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
  };*/
  //================== add pictures for share room properties======================================================================================
  $scope.property_pic_add = function(size, index) {
    var modalInstance = $modal.open({
      templateUrl: 'propertyPicAdd.html',
      controller: 'propertyPicAddInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.ShareProperties[index];
        }
      }
    });
  }
  ////////////////////////update share room informations////////////////////////////////////
  $scope.update_shareRoom = function(size, $index) {
    var modalInstance = $modal.open({
      templateUrl: 'updateShareRoom.html',
      controller: 'updateShareRoomInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.ShareProperties[$index];
        }
      }
    });
  };

});
