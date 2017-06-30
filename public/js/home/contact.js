'use strict'
angular.module('andy')
  .controller('contactCtrl',['$scope',function($scope){
    // property types
  $scope.myService = 'Apartment';
  $scope.serviceTypes = [{ id: 1, service:'move'}, { id: 2,service:'painting'},
    { id: 3, service:'storage'},{ id: 4,service:'handyman'},{ id: 5,service:'cleaning'},
    { id: 6,service:'appliances'},{ id: 7,service:'take away'},{ id: 8,service:'free post'}];
  }])
