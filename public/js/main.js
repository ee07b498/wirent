/**
 * @Date:   2017-06-30T10:20:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-29T17:33:21+10:00
 */
'use strict';

/* Controllers */

angular.module('app')
  .factory('getDataCommonService', function () {
    var savedData = {};

    function set(data,id) {
    savedData.id = id;
    savedData.data = data;
    }

    function get() {
    return savedData;
    }

    return {
    set: set,
    get: get,
    };

  })
  .service('S3UploadImgService', ['$q', function ($q) {
     // Us standard region
    //  AWS.config.region = 'us-east-1';
     AWS.config.region = 'ap-southeast-2';
     AWS.config.update({ accessKeyId: 'AKIAIJNVRWANKL3NCD7Q', secretAccessKey: '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' });

     var bucket = new AWS.S3({ params: { Bucket: 'property-img-upload-test/img', maxRetries: 10 }, httpOptions: { timeout: 360000 } });
     this.Progress = 0;
     this.Upload = function (file) {
         var deferred = $q.defer();

         var params = { Bucket: 'property-img-upload-test/img', Key: file.name, ContentType: file.type, Body: file };
         var options = {
             // Part Size of 10mb
             partSize: 10 * 1024 * 1024,
             queueSize: 1,
             // Give the owner of the bucket full control
             ACL: 'bucket-owner-full-control'
         };
         var uploader = bucket.upload(params, options, function (err, data) {
             if (err) {
                 deferred.reject(err);
             }
             deferred.resolve();
         });
         uploader.on('httpUploadProgress', function (event) {
             deferred.notify(event);
         });

         return deferred.promise;
     };
 }])
 .service('S3UploadFileService', ['$q', function ($q) {
    // Us standard region
    // AWS.config.region = 'us-east-1';
    AWS.config.region = 'ap-southeast-2';
    AWS.config.update({ accessKeyId: 'AKIAIJNVRWANKL3NCD7Q', secretAccessKey: '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' });

    var bucket = new AWS.S3({ params: { Bucket: 'property-img-upload-test/img', maxRetries: 10 }, httpOptions: { timeout: 360000 } });
    this.Progress = 0;
    this.Upload = function (file) {
        var deferred = $q.defer();

        var params = { Bucket: 'property-img-upload-test/img', Key: file.name, ContentType: file.type, Body: file };
        var options = {
            // Part Size of 10mb
            partSize: 10 * 1024 * 1024,
            queueSize: 1,
            // Give the owner of the bucket full control
            ACL: 'bucket-owner-full-control'
        };
        var uploader = bucket.upload(params, options, function (err, data) {
            if (err) {
                deferred.reject(err);
            }
            deferred.resolve();
        });
        uploader.on('httpUploadProgress', function (event) {
            deferred.notify(event);
        });

        return deferred.promise;
    };
}])
  .controller('AppCtrl', ['$scope', '$state', '$http','$translate', '$localStorage', '$window',
    function($scope, $state, $http, $translate, $localStorage, $window) {
      // add 'ie' classes to html
      $http.get('/staff/profile')
      .then(function(response) {
        console.log("response", response);

        if ( typeof(response.data.SUserName) != 'undefined' && response.data.SUserName != null) {
          // $state.go('app.staff.staff_profile');
        }else{
          // location.href = '/admin#/access/signin';
            $state.go("access.signin");
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });


      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

      // config
      $scope.app = {
        name: 'Win',
        version: '1.3.3',
        // for chart colors
        color: {
          primary: '#7266ba',
          info: '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger: '#f05050',
          light: '#e8eff0',
          dark: '#3a3f51',
          black: '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false
        }
      }

      // save settings to local storage
      if (angular.isDefined($localStorage.settings)) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function() {
        if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      // angular translate
      $scope.lang = {
        isopen: false
      };
      $scope.langs = {
        en: 'English',
        de_DE: 'German',
        it_IT: 'Italian'
      };
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      function isSmartDevice($window) {
        // Adapted from http://www.detectmobilebrowsers.com
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

    }
  ]);
