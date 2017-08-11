/**
 * @Date:   2017-07-12T12:15:07+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-11T11:02:16+10:00
 */

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
      $http.post('/staff/admin_landlord_check', {'str':$scope.str})
        .then(function(response) {
          console.log("response", response);
          $scope.landlords = response.data;
          angular.forEach($scope.entireProperties, function(value, key) {
              for (var i = 0; i < $scope.landlords.length; i++) {
                if (value.LLID == $scope.landlords[i].LLID ) {
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
///////////////////////////////////property details////////////////////////////////////////
$scope.openDetails = function(size,$index) {
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
});
