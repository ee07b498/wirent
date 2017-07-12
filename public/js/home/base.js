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
      .state('app.googlemap', {
        url: '/googlemap',
        //template:'<h1>homePage</h1>'
        templateUrl: '/partials/googlemap.html', //localhost:8080/home.tpl
      })
      .state('app.landlord', {
        url: '/landlord',
        //template:'<h1>homePage</h1>'
        templateUrl: '/partials/profileLandlord.html', //localhost:8080/home.tpl
        redirectTo: 'app.landlord.profile'
      })
      .state('app.landlord.profile', {
        url: '/landlord/profile',
        //template:'<h1>homePage</h1>'
        templateUrl: '/partials/landlord_tpl/profile.html', //localhost:8080/home.tpl
      })
      .state('app.landlord.balance', {
        url: '/landlord/balance',
        //template:'<h1>homePage</h1>'
        templateUrl: '/partials/landlord_tpl/balance.html', //localhost:8080/home.tpl
      })
      .state('app.landlord.progress', {
        url: '/landlord/progress',
        //template:'<h1>homePage</h1>'
        templateUrl: '/partials/landlord_tpl/progress.html', //localhost:8080/home.tpl
        resolve: {
          deps: ['$ocLazyLoad',
            function($ocLazyLoad) {
              return $ocLazyLoad.load('ui.select').then(
                function() {
                  return $ocLazyLoad.load('js/home/propmgm.js');
                }
              );
            },
          ],
        },
      })
      .state('app.landlord.update_propertyinfo', {
        url: '/landlord/update_propertyinfo',
        //template:'<h1>homePage</h1>'
        templateUrl: '/partials/landlord_tpl/update_propertyinfo.html', //localhost:8080/home.tpl
      })
      // mail
    .state('app.landlord.mail', {
        abstract: true,
        url: '/landlord/mail',
        templateUrl: '/partials/landlord_tpl/mail.html',
        // use resolve to load other dependences
        resolve: {
            deps: ['uiLoad',
              function( uiLoad ){
                return uiLoad.load( ['js/home/mail/mail.js',
                                     'js/home/mail/maillist.js',
                                     'js/home/mail/maildetail.js',
                                     'js/home/mail/mailnew.js',
                                     'js/home/mail/mail-service.js',
                                     'vendor/libs/moment.min.js'] );
            }]
        }
    })
    .state('app.landlord.mail.list', {
        url: '/inbox/{fold}',
        templateUrl: '/partials/landlord_tpl/mail.list.html'
    })
    .state('app.landlord.mail.detail', {
        url: '/{mailId:[0-9]{1,4}}',
        templateUrl: '/partials/landlord_tpl/mail.detail.html'
    })
    .state('app.landlord.mail.compose', {
        url: '/compose',
        templateUrl: '/partials/landlord_tpl/mail.new.html'
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
      .state('user', {
        url: '/user/:id',
        templateUrl: '/tpl/page/user',
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
