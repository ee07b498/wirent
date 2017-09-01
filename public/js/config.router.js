/**
 * @Date:   2017-06-30T10:20:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-09-01T14:09:38+10:00
 */



'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {

          $urlRouterProvider
              .otherwise('/app/dashboard-v1');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html'
              })
              .state('app.dashboard-v1', {
                  url: '/dashboard-v1',
                  templateUrl: 'tpl/app_dashboard_v1.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('angularBootstrapNavTree').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/property_management.js');
                              }
                          );
                        }
                      ]
                  }
              })
              .state('app.property_add', {
                  url: '/property_add',
                  templateUrl: 'tpl/property/property-add.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                                 return $ocLazyLoad.load('js/controllers/file-upload.js');
                      }]
                  }
              })
              .state('app.share_property_list', {
                  url: '/share_property_list',
                  templateUrl: 'tpl/property/share_property_list.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('js/controllers/share_propertyCtrl.js');
                      }]
                  }
              })
              .state('app.buy_property_list', {
                  url: '/buy_property_list',
                  templateUrl: 'tpl/property/buy_property_list.html'
              })
              .state('app.share_property_add', {
                  url: '/share_property_add',
                  templateUrl: 'tpl/property/share_property_add.html'
              })
              .state('app.staff', {
                  url: '/staff',
                  template: '<div ui-view class="fade-in-up"></div>'
              })
              .state('app.staff.position_management', {
                  url: '/position_management',
                  templateUrl: 'tpl/staff/position_management.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('js/controllers/position_management.js');
                      }]
                  }
              })
              .state('app.staff.role_management', {
                  url: '/role_management',
                  templateUrl: 'tpl/staff/role_management.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('js/controllers/role_management.js');
                      }]
                  }
              })
              .state('app.staff.rank_management', {
                  url: '/rank_management',
                  templateUrl: 'tpl/staff/rank_management.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('js/controllers/rank_management.js');
                      }]
                  }
              })
              .state('app.staff.staff_management', {
                  url: '/staff_management',
                  templateUrl: 'tpl/staff/staff_management.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('js/controllers/staff_management.js');
                      }]
                  }
              })
              .state('app.staff.salesdepartment', {
                  url: '/sales_department',
                  templateUrl: 'tpl/staff/sales_department.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('js/controllers/sales_department.js');
                      }]
                  }
              })
              .state('app.staff.rentaldepartment', {
                  url: '/rental_department',
                  templateUrl: 'tpl/staff/rental_department.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('js/controllers/rental_management.js');
                      }]
                  }
              })
              .state('app.staff.staff_profile', {
                  url: '/staff_profile?StaffID&SWorkStat&SUserName&SRankName&SRank&SPhone&SPassWord&SName&SLoginStat&SEmail&SCurrLoc&SComment',
                  templateUrl: 'tpl/staff/staff_profile.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('js/controllers/staff_profileCtrl.js');
                      }]
                  }
              })
              .state('app.staff.contact', {
                  url: '/contact',
                  templateUrl: 'tpl/apps_contact.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/app/contact/contact.js'] );
                      }]
                  }
              })
              .state('app.customer', {
                  url: '/customer',
                  template: '<div ui-view class="fade-in-up"></div>'
              })
              .state('app.customer.user', {
                  url: '/user_management',
                  templateUrl: 'tpl/customer/user_management.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('js/controllers/user_management.js');
                      }]
                  }
              })
              .state('app.customer.landlord', {
                  url: '/landlord_management',
                  templateUrl: 'tpl/customer/landlord_management.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('js/controllers/landlord_management.js');
                      }]
                  }
              })
              .state('app.customer.business', {
                  url: '/business_management',
                  templateUrl: 'tpl/customer/business_management.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('js/controllers/business_management.js');
                      }]
                  }
              })
              .state('app.customer.userprofile', {
                  url: '/user_profile?CID',
                  templateUrl: 'tpl/customer/user_profile.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('js/controllers/user_profileCtrl.js');
                      }]
                  }
              })
              .state('app.customer.landlordprofile', {
                  url: '/landlord_profile?LLEmail&LLID&LLName&LLPassword&LLPhone&LLCellphone',
                  templateUrl: 'tpl/customer/landlord_profile.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('js/controllers/landlord_profileCtrl.js');
                      }]
                  }
              })
              .state('app.customer.businessprofile', {
                  url: '/business_profile?id',
                  templateUrl: 'tpl/customer/business_profile.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('js/controllers/business_profileCtrl.js');
                      }]
                  }
              })
              .state('app.customer.addPic', {
                  url: '/add_pic',
                  templateUrl: 'tpl/customer/add_pic_landlord.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('angularFileUpload').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/file-upload.js');
                              }
                          );
                      }]
                  }
              })
              // pages
              .state('app.page', {
                  url: '/page',
                  template: '<div ui-view class="fade-in-down"></div>'
              })
              .state('app.page.profile', {
                  url: '/profile',
                  templateUrl: 'tpl/page_profile.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad){
                          return uiLoad.load('js/controllers/property_detailsCtrl.js');
                      }]
                  }
              })
              // others
              .state('lockme', {
                  url: '/lockme',
                  templateUrl: 'tpl/page_lockme.html'
              })
              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })
              .state('access.signin', {
                  url: '/signin',
                  templateUrl: 'tpl/page_signin.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/signin.js'] );
                      }]
                  }
              })
              .state('access.signup', {
                  url: '/signup',
                  templateUrl: 'tpl/page_signup.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/signup.js'] );
                      }]
                  }
              })
              .state('access.forgotpwd', {
                  url: '/forgotpwd',
                  templateUrl: 'tpl/page_forgotpwd.html'
              })
              .state('access.404', {
                  url: '/404',
                  templateUrl: 'tpl/page_404.html'
              })

              // fullCalendar
              .state('app.calendar', {
                  url: '/calendar',
                  templateUrl: 'tpl/app_calendar.html',
                  resolve: {
                      deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                          return uiLoad.load(
                            ['vendor/jquery/fullcalendar/fullcalendar.css',
                              'vendor/jquery/fullcalendar/theme.css',
                              'vendor/jquery/jquery-ui-1.10.3.custom.min.js',
                              'vendor/libs/moment.min.js',
                              'vendor/jquery/fullcalendar/fullcalendar.min.js',
                              'js/app/calendar/calendar.js']
                          ).then(
                            function(){
                              return $ocLazyLoad.load('ui.calendar');
                            }
                          )
                      }]
                  }
              })

              // mail
              .state('app.mail', {
                  abstract: true,
                  url: '/mail',
                  templateUrl: 'tpl/mail.html',
                  // use resolve to load other dependences
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/app/mail/mail.js',
                                               'js/app/mail/mail-service.js',
                                               'vendor/libs/moment.min.js'] );
                      }]
                  }
              })
              .state('app.mail.list', {
                  url: '/inbox/{fold}',
                  templateUrl: 'tpl/mail.list.html'
              })
              .state('app.mail.detail', {
                  url: '/?mailId&foldId',
                  templateUrl: 'tpl/mail.detail.html'
              })
              .state('app.mail.compose', {
                  url: '/compose',
                  templateUrl: 'tpl/mail.new.html'
              })

              .state('layout', {
                  abstract: true,
                  url: '/layout',
                  templateUrl: 'tpl/layout.html'
              })
              .state('layout.fullwidth', {
                  url: '/fullwidth',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_fullwidth.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_fullwidth.html'
                      }
                  },
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/vectormap.js'] );
                      }]
                  }
              })
              .state('layout.mobile', {
                  url: '/mobile',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_mobile.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_mobile.html'
                      }
                  }
              })
              .state('layout.app', {
                  url: '/app',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_app.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_fullwidth.html'
                      }
                  },
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/tab.js'] );
                      }]
                  }
              })
      }
    ]
  );
