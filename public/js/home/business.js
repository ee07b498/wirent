;(function () {
  'use strict';
  angular.module('andy').controller('businessCtrl', ['$scope', '$http', '$cookies', '$rootScope', '$localStorage', 'SearchService', 'updateService', function ($scope, $http, $cookies, $rootScope, $localStorage, SearchService, updateService) {
    var businessData = {};
    var datafromhome = {};
    $scope.datafromhome = '';
    if (JSON.stringify(SearchService.get()) != '{}') {
      $localStorage.businessData = SearchService.get().data;
      console.log('$localStorage.businessData ', $localStorage.businessData);
      businessData = $localStorage.businessData;
     } else {
      businessData = $localStorage.businessData;
      console.log('$localStorage.businessData ', $localStorage.businessData);
    }

     if (JSON.stringify(updateService.get()) != '{}') {
      $localStorage.datafromhome = updateService.get();
      datafromhome = $localStorage.datafromhome;
      console.log('updateService.get()', updateService.get());
    }else {
      datafromhome = $localStorage.datafromhome;
      console.log('$localStorage.datafromhome', datafromhome);
    }

   $scope.datafromhome = datafromhome;
    angular.forEach(businessData, function (data, index, array) {
    //data等价于array[index]
  //		console.log(data.TPLink+'='+array[index].TPLink);
  //		console.log(data.TPLink=='');
     if(data.TPLink!=''){
      data.links = true;
     }
     else {
      data.links = false;
     }
    });
   $scope.serviceData = businessData;

  }])
})();
