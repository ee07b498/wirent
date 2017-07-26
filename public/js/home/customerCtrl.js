/**
 * @Date:   2017-07-26T16:05:10+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-07-26T16:05:22+10:00
 */



 'use strict'
 angular.module('andy')
   .controller('customerCtrl',function($state){
     $state.go('customer.profile');
     console.log(123);
   });
