;(function()
{
	'use strict';
	angular.module('andy',['ui.router',
							'ui.bootstrap',
							'header',
							'user',
							'home',
							'ui.jq',
							'ui.load',
							'ngMap',
							'detail',
							'profile'
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
					templateUrl:'/partials/home.html' //localhost:8080/home.tpl
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
				.state('result',{
					url:'/result',
					templateUrl:'tpl/page/result'
				})
				.state('aboutus',{
					url:'/aboutus',
					templateUrl:'tpl/page/aboutus'
				})
				.state('news',{
					url:'/news',
					templateUrl:'tpl/page/news'
				})
				.state('contact',{
					url:'/contact',
					templateUrl:'tpl/page/contact'
				})
				.state('details', {
                  url: '/details',
                  templateUrl: 'tpl/page/details'
              })
				.state('app.shortlist', {
                  url: '/shortlist',
                  templateUrl: '/partials/shortlist.html'
              })
				.state('upload', {
                  url: '/upload',
                  templateUrl: 'tpl/page/upload'
              })
			
				
		})
		
	
})();
