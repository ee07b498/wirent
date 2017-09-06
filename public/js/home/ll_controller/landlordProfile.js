/**
 * @Date:   2017-07-26T09:34:10+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-09-06T09:29:44+10:00
 */

 'use strict'
 angular.module('andy')
   .controller('landlordCtrl',function($state){
     $state.go('landlord.profile');
    //  console.log(123);
   });
