/**
 * @Date:   2017-07-14T16:27:20+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-15T16:52:01+10:00
 */



'use strict'
//add costomer Controller
app.controller('userAddInstanceCtrl', ['$scope', '$modalInstance', '$http', function($scope, $modalInstance, $http) {
  $scope.Customer = {};

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

   $scope.ok = function () {
     $http.post('/staff/admin_customer_insert', $scope.Customer)
       .then(function(response) {
         console.log("response", response);
         $modalInstance.close();
       }, function(x) {
         console.log('Server Error');
       });

   };

   $scope.cancel = function () {
     $modalInstance.dismiss('cancel');
   };
 }]);
 //update costomer Controller
 app.controller('updateCustomerInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
   $scope.items = items;
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
     console.log("111");
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
     }, function(x) {
       console.log('Server Error');
     });


   $scope.open = function (size) {
     var modalInstance = $modal.open({
       templateUrl: 'userAdd.html',
       controller: 'userAddInstanceCtrl',
       size: size,
       resolve: {
         items: function () {
           return $scope.items;
         }
       }
     });
   };
/***************************update customer item*****************************************/
$scope.updateCustomerItem = function(size, $index){
  var modalInstance = $modal.open({
    templateUrl: 'updateCustomer.html',
    controller: 'updateCustomerInstanceCtrl',
    size: size,
    resolve: {
      items: function () {
        return  $scope.customers[$index];
      }
    }
  });
}
   /*******************delete user item*******************************/
    $scope.deleteUserItem = function(CID){
      $http.post('/staff/admin_customer_delete', {'CID':CID})
        .then(function(response) {
          console.log(response);
        }, function(x) {
          console.log('Server Error');
        });
    }
 }])
 ;
