;(function()
{
	'use strict';
	angular.module('andy',[
							 'ngAnimate',
							 'angularCSS',
							'ui.router',
							'ui.bootstrap',
							'ngCookies',
							'ngStorage',
							'ngSanitize',
							'oc.lazyLoad',
							'header',
							'user',
							'home',
							'ui.jq',
							'ui.load',
							'map',
							'ngMap',
							'detail',
							'profile',
							'shortlist',
							'listpage',
							'lunbo'
							])
		.config(function($interpolateProvider,
								$stateProvider,
								$urlRouterProvider)
		{
			$interpolateProvider.startSymbol('[:');
			$interpolateProvider.endSymbol(':]');
			$urlRouterProvider.otherwise('/app/home');
			$stateProvider
				 .state('app', {
	                  abstract: true,
	                  url: '/app',
	                  templateUrl: '/partials/app.html'
	             })
				.state('app.home',{
					url:'/home',
					//template:'<h1>homePage</h1>'
					templateUrl:'/partials/search.html' //localhost:8080/home.tpl
				})
				.state('app.googlemap',{
					url:'/googlemap',
					//template:'<h1>homePage</h1>'
					templateUrl:'/partials/googlemap.html' //localhost:8080/home.tpl
				})
				.state('app.signup',{
					url:'/signup',
					templateUrl:'/partials/signup.html'
				})
				.state('app.login',{
					url:'/login',
					templateUrl:'/partials/login.html'
				})
				.state('app.profile',{
					url:'/profile',
					templateUrl:'/partials/profile.html'
				})
				.state('user',{
					url:'/user/:id',
					templateUrl:'/tpl/page/user'
				})
				.state('app.search',{
					url:'/search',
					templateUrl:'/partials/search.html'
				})
				.state('app.businessDetails',{
					url:'/businessDetails',
					templateUrl:'/partials/businessDetails.html'
				})
				.state('app.listpage',{
					url:'/listpage',
					templateUrl:'/partials/listpage.html',
					controller: 'listPageCtrl',
                  	resolve: {
	                      deps: ['$ocLazyLoad',
	                        function( $ocLazyLoad ){
	                          return $ocLazyLoad.load('ui.select').then(
	                              function(){
	                                  return $ocLazyLoad.load('js/home/listpage.js');
	                              }
	                          );
	                      }]
                  	}
				})
				.state('app.business',{
					url:'/business',
					templateUrl:'/partials/business.html'
				})
				.state('app.documentation', {
                  url: '/documentation',
                  templateUrl: '/partials/documentation.html'
              })
				.state('app.shortlist', {
                  url: '/shortlist',
                  templateUrl: '/partials/shortlist.html'
              })
				.state('app.details', {
                  url: '/details',
                  templateUrl: '/partials/details.html'
              })
				.state('app.serviceTypes',{
					url:'/serviceTypes',
					templateUrl:'/partials/serviceTypes.html'
				})
				.state('app.guides',{
					url:'/guides',
					templateUrl:'/partials/guide.html'
				})
				.state('app.new',{
					url:'/new',
					templateUrl:'/partials/new.html'
				})
				.state('app.newsDetail',{
					url:'/newsDetail',
					templateUrl:'/partials/newsDetail.html'
				})
				
		})
		
	
})();
