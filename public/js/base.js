;(function()
{
	'use strict';
	angular.module('andy',['ui.router',
							'ui.bootstrap',
							'common',
							'ui.jq',
							'question',
							'user',
							'ui.load',
							'answer'])
		.config(function($interpolateProvider,
								$stateProvider,
								$urlRouterProvider)
		{
			$interpolateProvider.startSymbol('[:');
			$interpolateProvider.endSymbol(':]');
			$urlRouterProvider.otherwise('/home');
			$stateProvider
				.state('home',{
					url:'/home',
					//template:'<h1>homePage</h1>'
					templateUrl:'/tpl/page/home' //localhost:8080/home.tpl
				})
				.state('signup',{
					url:'/signup',
					templateUrl:'/tpl/page/signup'
				})
				.state('login',{
					url:'/login',
					templateUrl:'/tpl/page/login'
				})
				.state('question.detail',{
					url:'/detail/:id',
					templateUrl:'tpl/page/question_detail'
				})
				.state('profile',{
					url:'/profile',
					templateUrl:'tpl/page/profile'
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
		})
		 .directive('uiToggleClass', ['$timeout', '$document', function($timeout, $document) {
			return {
			  restrict: 'AC',
			  link: function(scope, el, attr) {
				el.on('click', function(e) {
				  e.preventDefault();
				  var classes = attr.uiToggleClass.split(','),
					  targets = (attr.target && attr.target.split(',')) || Array(el),
					  key = 0;
				  angular.forEach(classes, function( _class ) {
					var target = targets[(targets.length && key)];            
					( _class.indexOf( '*' ) !== -1 ) && magic(_class, target);
					$( target ).toggleClass(_class);
					key ++;
				  });
				  $(el).toggleClass('active');

				  function magic(_class, target){
					var patt = new RegExp( '\\s' + 
						_class.
						  replace( /\*/g, '[A-Za-z0-9-_]+' ).
						  split( ' ' ).
						  join( '\\s|\\s' ) + 
						'\\s', 'g' );
					var cn = ' ' + $(target)[0].className + ' ';
					while ( patt.test( cn ) ) {
					  cn = cn.replace( patt, ' ' );
					}
					$(target)[0].className = $.trim( cn );
				  }
				});
			  }
			};
		}])
		 .service('BaseService',['$state','$http',function($state,$http){
		 
		 	
		 }])
		.controller('AppCtrl',['$scope','UserService','BaseService','$window','$http',function($scope,$window,UserService,BaseService,$http){
		$scope.name = "Winning";
//		$scope.profile = false;
		
		
		
		$http.get('/customer/profile')
						.then(function(r){
							console.log(r);
//							if(r['data']['customer_login_status'])
//							$scope.profile = true;	
//							else 
//							$scope.profile = false;
							$scope.profile = r;	
						})
//		console.log($scope.profile );
		$scope.logout = function(){
					 alert("logout");
					 $http.post('/customer/logout',{})
						.then(function(){
							location.href = '/';
						});
				}
		
	}])			
	
})();
