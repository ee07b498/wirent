'use strict'
angular.module('andy')
  .controller('landlordCtrl',function($state){
    $state.go('app.landlord.profile');
    console.log(123);
  });
