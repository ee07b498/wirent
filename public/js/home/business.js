/**
 * @Date:   2017-09-05T13:32:53+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-09-07T17:31:37+10:00
 */



;(function () {
  'use strict';
  angular.module('andy').controller('businessCtrl', ['$scope', '$http', '$cookies', '$rootScope', '$localStorage','$window', 'SearchService', 'updateService','pagerService', function ($scope, $http, $cookies, $rootScope, $localStorage,$window, SearchService, updateService,pagerService) {
    var businessData = {};
    var datafromhome = {};
     $(window).scrollTop(0,0);
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

    /**************************************商家专区 starts****************************************************/
      var business = {};
      $scope.businessSearch = function(TPDetail){
       business.TPDetail = TPDetail;
       business.TPServLoc = '';
       business.status = -1;
       $http.post('/customer/filt_thirdparty', business)
        .then(function(r) {
         SearchService.set(r);
         updateService.set(TPDetail);
         console.log('r===>', r);
         $scope.serviceData = r.data;
         businessData = r.data;
         console.log(r.data.length);
         var len = businessData.length;
         vm.dummyItems = _.range(1, len+1); // dummy array of items to be paged
         vm.pager = {};
         vm.setPage = setPage;
         initController();
        }, function(e) {

        });
      }
    /**************************************商家专区 ends****************************************************/


   /***************pagination starts*************************/
    var vm = this;
    var len = businessData.length;
    vm.dummyItems = _.range(1, len+1); // dummy array of items to be paged
    vm.pager = {};
    vm.setPage = setPage;
    initController();
    function initController() {
        // initialize to page 1
        vm.setPage(1);
    }
    function setPage(page) {
        if (page < 1 || page > vm.pager.totalPages) {
            return;
        }
        // get pager object from service
        vm.pager = pagerService.GetPager(vm.dummyItems.length, page,3);
        // get current page of items
        console.log(vm.pager);
        $scope.serviceData = businessData.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
    }

   /***************pagination ends***********************************/
  }])
})();
