/**
 * @Date:   2017-08-15T14:20:59+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-16T15:25:48+10:00
 */
'use strict'
app.controller('updateShareRoomInstanceCtrl', ['$scope', '$http', '$modalInstance', 'items', function($scope, $http, $modalInstance, items) {
  $scope.ShareRoomData ={};
  $scope.ShareRoomData.ER_ID = items;
  $scope.ShareRoomData.SRArea = "";
  $scope.ShareRoomData.SRStat = "";
  $scope.ShareRoomData.SRAvailableDate = "";
  $scope.ShareRoomData.SRPrice = "";
  $scope.ShareRoomData.SRName = "";
  /**
   * datepicker - change the date
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

  $scope.ok = function() {
    console.log($scope.staff_data);
  /*  $http.post('/staff/staff_register', $scope.staff_data)
      .then(function(response) {
        console.log("response", response);
      }, function(x) {
        console.log('Server Error');
      });*/
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
app.controller('SharePropertyCtrl', function($scope, $http, $state, $modal, $log, $timeout) {
  ///////////////////////////share room property check///////////////////////////////////////////////
  $scope.ShareProperties = {};
    $http.get('/staff/admin_sr_list_check')
        .then(function(response) {
      $scope.ShareProperties = response.data;
      console.log("response", response);
    }, function(x) {
      console.log('Server Error');
    });


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
  ////////////////////////update share room informations////////////////////////////////////
   $scope.update_shareRoom = function(size, ER_ID) {
     var modalInstance = $modal.open({
       templateUrl: 'updateShareRoom.html',
       controller: 'updateShareRoomInstanceCtrl',
       size: size,
       resolve: {
         items: function() {
           return ER_ID;
         }
       }
     });
   };

});
