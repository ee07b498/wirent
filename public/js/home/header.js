/**
 * @Date:   2017-08-22T10:58:54+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-09-05T16:34:20+10:00
 */



;
(function() {
  'use strict';
  angular.module('andy')
    .factory('readLetters', ['$http', '$q', 'SearchService', function($http, $q, SearchService) {
      return {
        query: function() {
          var deferred = $q.defer();
          $http({
            method: 'POST',
            url: '/customer/msg/notice',
            data: {
              CID: 1,
              msg_direct_comment: '% to customer'
            }
          }).success(function(data, status, header, config) {
            deferred.resolve(data);
          }).error(function(data, status, header, config) {
            deferred.reject(data);
          });
          return deferred.promise;
        }
      }
    }])
    // .run(['$anchorScroll', function($anchorScroll) {
    //   $anchorScroll.yOffset = -50;   // always scroll by 50 extra pixels
    // }])
    .service('BaseService', ['$state', '$http', function($state, $http, $localStorage) {

    }])
    .controller('WinCtrl', ['$anchorScroll', '$location', '$scope', '$stateParams', '$filter', '$state', '$window', '$http', 'UserService', 'readLetters', '$localStorage', 'SearchService', 'updateService', function($anchorScroll, $location, $scope, $stateParams, $filter, $state, $window, $http, UserService, readLetters, $localStorage, SearchService, updateService) {
      $localStorage.headerSetting = {};
      $scope.name = "Winning";
      // $scope.letternums = 0;
      $http.get('/customer/profile')
        .then(function(r) {
          console.log(r);
          if (r.data.customer_login_status == 1) {
            $scope.profile = true;
            /*********************obtain unread messages number***********************************/
            var promise = readLetters.query();
            promise.then(function(data) {
              console.log("===data===", data);
              $localStorage.headerSetting.letternums = data[0]['count(*)'];
              $scope.letternums = $localStorage.headerSetting.letternums;
            });
            $scope.letternums = $localStorage.headerSetting.letternums;

            /*********************obtain unread messages number***********************************/
          } else
            $scope.profile = false;
        });
      console.log($localStorage.landlord);
      $http.post('/landlord/profile', {
          'LLEmail': $localStorage.landlord
        })
        .then(function(r) {
          console.log(r);
          if (r.data.landlord_login_status == 1) {
            $scope.profile = true;
          } else {
            $scope.profile = false;
          }
        });

      $scope.profile = UserService.profile;
      console.log($scope.profile);
      $scope.logout = function() {
        $http.post('/customer/logout', {})
          .then(function() {
            location.href = '/';
          });
      }
      $scope.read_Letters = function(messages) {
        $http.get('/customer/profile')
          .then(function(r) {
            console.log("=============", r);
            if (r.data == "login") {
              $state.go("app.login");
            } else {
              $state.go("app.profile");
            }
          }, function(e) {
            $state.go("app.login");
          })

      }


      /*********************go to shortlist******************************************/
      $scope.go2Shortlist = function() {
        $http.get('/customer/profile')
          .then(function(r) {
            if (r.data == "login") {
              $state.go("app.login");
            } else {
              $scope.shortlistData = {};
              $scope.shortlistDelete = {};
              $scope.shortlistData.CID = 1;
              $scope.shortlistData.CLType = 'FavorSave';
              $http.post('/customer/shortlist', $scope.shortlistData)
                .then(function(r) {
                  SearchService.set(r.data);
                  $state.go("app.shortlist");
                  //console.log("$scope.shortlistData",$scope.shortlistData);
                }, function(e) {
                  console.log(e);
                });
            }
          }, function(e) {
            $state.go("app.login");
          })

      }
      /*********************go to shortlist end******************************************/
      /**************businessSection entry********************/
      var business = {};
      $scope.businessSearch = function(TPDetail) {
        business.TPDetail = TPDetail;
        business.TPServLoc = '';
        $http.post('/customer/filt_thirdparty', business)
          .then(function(r) {
            SearchService.set(r);
            updateService.set(TPDetail);
            console.log('r===>', r);
            if (r.data.length > 0) {
              $state.go('app.business');
            }
            //

          }, function(e) {

          });
      }
      // 	$scope.gotoAnchor = function(businessSection) {
      //   var newHash = businessSection;
      //   if ($location.hash() !== newHash) {
      //     // set the $location.hash to `newHash` and
      //     // $anchorScroll will automatically scroll to it
      //     $location.hash(businessSection);
      //   } else {
      //     // call $anchorScroll() explicitly,
      //     // since $location.hash hasn't changed
      //     $anchorScroll();
      //   }
      // };
    }])
})();
