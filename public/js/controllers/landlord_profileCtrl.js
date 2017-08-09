/**
 * @Date:   2017-07-24T13:55:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-09T18:01:41+10:00
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
app.controller('landlordPropertyAddInstanceCtrl', ['$scope', '$modalInstance', 'items', '$filter', function($scope, $modalInstance, items, $filter) {
  $scope.property_info = {};
  $scope.university = {};
  $scope.property_info.ER_ID = "";
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
  /*************************************************************************************/

  /**
   * getDateToString - convert date formate data into string data
   *
   * @param  {date} date   date
   * @param  {string} format format
   * @return {string}        string date
   */
  function getDateToString (date, format) {
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
    if (typeof $scope.property_info.ER_Feature === "string") {

    }else {
      // $scope.property_info.ER_Feature = _.map($scope.paxlist, 'name').join('; ');
    }
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
app.controller('landlord_profileCtrl', ['$scope', '$modal', '$http', '$log', '$stateParams', function($scope, $modal, $http, $log, $stateParams) {
  $scope.landLord_info = {};
  $scope.changePassword = {};
  $scope.properties = {};
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


  /////////////////////////////////////////////////////////////////////////
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

}]);
