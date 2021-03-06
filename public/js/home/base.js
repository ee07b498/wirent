/**
 * @Date:   2017-06-30T10:20:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-09-06T14:18:20+10:00
 */

'use strict';
angular.module('andy', [
    'ngAnimate',
    'angularCSS',
    'ui.router',
    'ui.bootstrap',
    'ngCookies',
    'ngStorage',
    'ngSanitize',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'ui.jq',
    'ngMap',
    'map',
    'mapshare'
  ])
  .config(function($interpolateProvider,
    $stateProvider,
    $urlRouterProvider) {
    $interpolateProvider.startSymbol('[:');
    $interpolateProvider.endSymbol(':]');
    $urlRouterProvider.otherwise('/app/home');
    $stateProvider
      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: '/partials/app.html',
      })
      .state('app.home', {
        url: '/home',
        //template:'<h1>homePage</h1>'
        templateUrl: '/partials/home.html', //localhost:8080/home.tpl
        controller: 'HomeController',
        resolve: {
          deps: ['$ocLazyLoad',
            function($ocLazyLoad) {
              return $ocLazyLoad.load('ui.select').then(
                function() {
                  return $ocLazyLoad.load('js/home/home.js');
                }
              );
            },
          ],
        },
      })
      .state('app.search', {
        url: '/search',
        templateUrl: '/partials/search.html',
        controller: 'searchController',
        resolve: {
          deps: ['$ocLazyLoad',
            function($ocLazyLoad) {
              return $ocLazyLoad.load('ui.select').then(
                function() {
                  return $ocLazyLoad.load('js/home/common.js');
                }
              );
            },
          ],
        },
      })
      // .state('app.googlemap', {
      //   url: '/googlemap',
      //   //template:'<h1>homePage</h1>'
      //   templateUrl: '/partials/googlemap.html', //localhost:8080/home.tpl
      // })
      .state('landlord', {
        url: '/landlord',
        //template:'<h1>homePage</h1>'
        templateUrl: '/partials/landlord_tpl/profileLandlord.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function($ocLazyLoad) {
              return $ocLazyLoad.load('angularFileUpload').then(
                function() {
                  return $ocLazyLoad.load('js/home/ll_controller/landlordProfile.js');
                }
              );
            }
          ]
        }
      })
      .state('landlord.profile', {
        url: '/profile?landlord',
        //template:'<h1>homePage</h1>'
        templateUrl: '/partials/landlord_tpl/profile.html', //localhost:8080/home.tpl
        resolve: {
          deps: ['$ocLazyLoad',
            function($ocLazyLoad) {
              return $ocLazyLoad.load('js/home/ll_controller/landlord.js');
            }
          ]
        }
      })
      .state('landlord.balance', {
        url: '/balance',
        templateUrl: '/partials/landlord_tpl/balance.html', //localhost:8080/home.tpl
        resolve: {
          deps: ['$ocLazyLoad',
            function($ocLazyLoad) {
              return $ocLazyLoad.load('js/home/ll_controller/balanceCtrl.js');
            }
          ]
        }
      })
      .state('landlord.contract', {
        url: '/contract',
        templateUrl: '/partials/landlord_tpl/contract.html', //localhost:8080/home.tpl
        resolve: {
          deps: ['$ocLazyLoad',
            function($ocLazyLoad) {
              return $ocLazyLoad.load('js/home/ll_controller/contractCtrl.js');
            }
          ]
        }
      })
      .state('landlord.propertyManagement', {
        url: '/propertyManagement',
        //template:'<h1>homePage</h1>'
        templateUrl: '/partials/landlord_tpl/propertyManagement.html', //localhost:8080/home.tpl
        controller: 'propertymgmCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function($ocLazyLoad) {
              return $ocLazyLoad.load('ui.select').then(
                function() {
                  return $ocLazyLoad.load('js/home/ll_controller/propertyManagement.js');
                }
              );
            },
          ],
        },
      })
      .state('landlord.update_propertyinfo', {
        url: '/update_propertyinfo',
        //template:'<h1>homePage</h1>'
        templateUrl: '/partials/landlord_tpl/update_propertyinfo.html', //localhost:8080/home.tpl
      })
      // landlord mail
      .state('landlord.mail', {
        abstract: true,
        url: '/mail',
        templateUrl: '/partials/landlord_tpl/mail.html',
        // use resolve to load other dependences
        resolve: {
          deps: ['uiLoad',
            function(uiLoad) {
              return uiLoad.load(['js/home/mail/mail.js',
                'js/home/mail/mail-service.js',
                'vendor/libs/moment.min.js'
              ]);
            }
          ]
        }
      })
      .state('landlord.mail.list', {
        url: '/inbox/{fold}',
        templateUrl: '/partials/landlord_tpl/mail.list.html'
      })
      .state('landlord.mail.detail', {
        url: '/?mailId&foldId',
        templateUrl: '/partials/landlord_tpl/mail.detail.html'
      })
      .state('landlord.mail.compose', {
        url: '/compose',
        templateUrl: '/partials/landlord_tpl/mail.new.html'
      })
      // customer
      .state('customer', {
        url: '/customer',
        templateUrl: '/partials/customer/profile_customer.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function($ocLazyLoad) {
              return $ocLazyLoad.load('angularFileUpload').then(
                function() {
                  return $ocLazyLoad.load('js/home/customerCtrl.js');
                }
              );
            }
          ]
        }
      })
      .state('customer.profile', {
        url: '/profile',
        templateUrl: '/partials/customer/profile.html'
      })
      .state('customer.myPayments', {
        url: '/mypament',
        templateUrl: '/partials/customer/myPament.html'
      })
      .state('customer.myContract', {
        url: '/mycontract',
        templateUrl: '/partials/customer/myContract.html'
      })
      .state('customer.maintenanceApply', {
        url: '/maintenanceApply',
        templateUrl: '/partials/customer/maintenance_apply.html'
      })
      .state('customer.maintenanceHistory', {
        url: '/maintenanceHistory',
        templateUrl: '/partials/customer/maintenance_history.html'
      })
      .state('customer.serviceApply', {
        url: '/serviceApply',
        templateUrl: '/partials/customer/service_apply.html'
      })
      .state('customer.serviceHistory', {
        url: '/serviceHistory',
        templateUrl: '/partials/customer/service_history.html'
      })
      //customer mail
      // mail
      .state('customer.mail', {
        abstract: true,
        url: '/mail',
        templateUrl: '/partials/customer/mail.html',
        // use resolve to load other dependences
        resolve: {
          deps: ['uiLoad',
            function(uiLoad) {
              return uiLoad.load(['js/home/mail/mail.js',
                'js/home/mail/maillist.js',
                'js/home/mail/maildetail.js',
                'js/home/mail/mailnew.js',
                'js/home/mail/mail-service.js',
                'vendor/libs/moment.min.js'
              ]);
            }
          ]
        }
      })
      .state('customer.mail.list', {
        url: '/inbox/{fold}',
        templateUrl: '/partials/customer/mail.list.html'
      })
      .state('customer.mail.detail', {
        url: '/{mailId:[0-9]{1,4}}',
        templateUrl: '/partials/customer/mail.detail.html'
      })
      .state('customer.mail.compose', {
        url: '/compose',
        templateUrl: '/partials/customer/mail.new.html'
      })
      .state('googlemap', {
        url: '/googlemap',
        //template:'<h1>homePage</h1>'
        templateUrl: '/partials/map.html', //localhost:8080/home.tpl
      })
      .state('googlemapShare', {
        url: '/googlemapShare',
        //template:'<h1>homePage</h1>'
        templateUrl: '/partials/mapshare.html', //localhost:8080/home.tpl
      })
      .state('app.signup', {
        url: '/signup',
        templateUrl: '/tpl/page/signup',
      })
      .state('app.login', {
        url: '/login',
        templateUrl: '/tpl/page/login',
      })
      .state('app.profile', {
        url: '/profile',
        templateUrl: '/tpl/page/profile',
      })
      .state('app.businessDetails', {
        url: '/businessDetails',
        templateUrl: '/partials/businessDetails.html',
      })
      .state('app.listpage', {
        url: '/listpage',
        templateUrl: '/partials/listpage.html',
        controller: 'listPageCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function($ocLazyLoad) {
              return $ocLazyLoad.load('ui.select').then(
                function() {
                  return $ocLazyLoad.load('js/home/listpage.js');
                }
              );
            },
          ],
        },
      })
      .state('app.listpageShare', {
        url: '/listpageShare',
        templateUrl: '/partials/listpage_share.html',
        controller: 'listPageShareCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function($ocLazyLoad) {
              return $ocLazyLoad.load('ui.select').then(
                function() {
                  return $ocLazyLoad.load('js/home/listpageShare.js');
                }
              );
            },
          ],
        },
      })
      .state('app.business', {
        url: '/business',
        templateUrl: '/partials/business.html',
      })
      .state('app.documentation', {
        url: '/documentation',
        templateUrl: '/partials/documentation.html',
      })
      .state('app.shortlist', {
        url: '/shortlist',
        templateUrl: '/tpl/page/shortlist',
      })
      .state('app.details', {
        url: '/details?id&name',
        templateUrl: '/partials/details.html',
      })
      .state('app.detailsShare', {
        url: '/detailsShare?id&name',
        templateUrl: '/partials/detailsShare.html',
      })
      .state('app.serviceTypes', {
        url: '/serviceTypes',
        templateUrl: '/partials/serviceTypes.html',
      })
      .state('app.guides', {
        url: '/guides',
        templateUrl: '/partials/guide.html',
      })
      .state('app.new', {
        url: '/new',
        templateUrl: '/partials/new.html',
      })
      .state('app.tips', {
        url: '/tips',
        templateUrl: '/partials/tips.html',
      })
      .state('app.newsDetail', {
        url: '/newsDetail',
        templateUrl: '/partials/newsDetail.html',
      })
      .state('app.contact', {
        url: '/contactus',
        templateUrl: '/partials/contact.html',
      })
      .state('app.trainmap', {
        url: '/trainmap',
        templateUrl: '/partials/trainmap.html',
      });
  });
