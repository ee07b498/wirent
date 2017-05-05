;(function(){
	'use strict';
	angular.module('ngMap').controller('MyCtrl',function($scope,$log,NgMap) {
				var vm = this;
				NgMap.getMap().then(function(map) {
					console.log('map', map);
					vm.map = map;
				});

				vm.clicked = function() {
					alert('Clicked a link inside infoWindow');
				};

				vm.shops = [{
						id: 'foo',
						name: 'FOO SHOP',
						position: 'sydney australia'
					},
					{
						id: 'bar',
						name: 'BAR SHOP',
						position: '9/20 harbourne road kingsford australia'
					}
				];
				vm.shop = vm.shops[0];
				
				vm.showDetail = function(e, shop) {
					vm.shop = shop;
					vm.map.showInfoWindow('foo-iw', shop.id);
				};

				vm.hideDetail = function() {
					vm.map.hideInfoWindow('foo-iw');
				};
				
				
			})
		.service('googleService',['$scope',function($scope){
			var me = this;
			me.data = {};
			
//				alert("fixed header");
			
		}])
})();
