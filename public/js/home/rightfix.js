;(function() {
	'use strict';
	angular.module('andy')
	.controller('ModalContactCtrl', ['$http','$scope', '$modalInstance', '$log', 'items','utilConvertDateToString', function($http,$scope, $modalInstance,$log,items,utilConvertDateToString) {
			$scope.contact = {};
			$scope.customer = {};
		$scope.saveEnvelope = function(){
			alert('1010');
			$scope.customer.title = 'Contact';
			$scope.customer.CID = 1;
			$scope.customer.createTime = utilConvertDateToString.getDateToString(new Date(),"yyyy-MM-dd HH:mm:ss");
			$scope.customer.IdReceiver= 3;
			$scope.customer.content = $scope.contact.name +';'+$scope.contact.email +';'+$scope.contact.phone +';'+$scope.contact.message;
			$scope.customer.msg_direct_comment='Customer to Staff';
			console.log("me.customer",$scope.customer);
		$http.post('/customer/msg/write', $scope.customer)
			.then(function(r){
				console.log('r===>',r);
				/*if (r.status===200)
				{
					me.signup_data = {};
					$state.go('app.login');
				}*/
//				$modalInstance.dismiss('cancel');
			},function(e){

			})

		}

		$scope.items = items;
			$scope.selected = {
				item: $scope.items[0]
			};
			$scope.ok = function () {
				$modalInstance.close($scope.selected.item);
			};

			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};
		}])
		.controller('ModalFeedbackCtrl', ['$http','$scope', '$log','$modalInstance', 'items','utilConvertDateToString', function($http,$scope,$log, $modalInstance,items,utilConvertDateToString) {
				$scope.contact = {};
				$scope.customer = {};
			$scope.saveEnvelope = function(){
				$scope.customer.title = 'Contact';
				$scope.customer.CID = 1;
				$scope.customer.createTime = utilConvertDateToString.getDateToString(new Date(),"yyyy-MM-dd HH:mm:ss");
				$scope.customer.IdReceiver= 3;
				$scope.customer.content = $scope.contact.name +';'+$scope.contact.email +';'+$scope.contact.phone +';'+$scope.contact.message;
				$scope.customer.msg_direct_comment='Customer to Staff';
				console.log("me.customer",$scope.customer);
			$http.post('/customer/msg/write', $scope.customer)
				.then(function(r){
					console.log('r===>',r);
					/*if (r.status===200)
					{
						me.signup_data = {};
						$state.go('app.login');
					}*/
	//				$modalInstance.dismiss('cancel');
				},function(e){

				})

			}

			$scope.items = items;
				$scope.selected = {
					item: $scope.items[0]
				};
				$scope.ok = function () {
					$modalInstance.close($scope.selected.item);
				};

				$scope.cancel = function () {
					$modalInstance.dismiss('cancel');
				};
			}])
		.controller('fixCtrl',['$scope','$window','$modal','$log','wechatService',function($scope,$window,$modal,$log,wechatService){
			$scope.go2Top = function(){
				$(window).scrollTop(0,0);
			};
/************************wechat show ends*********************************/
			$scope.wechatShow = function(){
					if(angular.element('.elevator-weixin-box').css('opacity')==='0'){
						angular.element('.elevator-weixin-box').css(
							{
								'display': 'block',
						    'visibility': 'visible',
						    'opacity': '1',
						    'filter': 'alpha(opacity=100)',
						    'max-width': 'none',
						    '-webkit-transform': 'scale(1)',
						    '-ms-transform': 'scale(1)',
						    'transform': 'scale(1)'
						});
					}else {
						angular.element('.elevator-weixin-box').css(
							{
								'position': 'absolute',
						    'width': '172px',
						    'height': '212px',
						    'bottom': '-99px',
						    'right': '0',
						    '-webkit-transition': 'opacity .25s,transform .3s',
						    '-moz-transition':' opacity .25s,transform .3s',
						    'transition': 'opacity .25s,transform .3s',
						    'opacity': '0',
						    'filter': 'alpha(opacity=0)',
						    'max-width': '0',
						    '-webkit-transform': 'scale(.01)',
						    '-ms-transform': 'scale(.01)',
						    'transform': 'scale(.01)',
						    '-webkit-transform-origin':' 100% 95%',
						    '-ms-transform-origin': '100% 95%',
						    'transform-origin': '100% 95%',
						    'background': 'url(../../img/wechat.webp) no-repeat'
						});
					}
			}
			/**********broadcast listening the message from footer**********/
			$scope.$on('wechat', function(event,value) {
					console.log(value);
					if (value) {
						$scope.hiddenright = true;
						angular.element('.elevator-weixin-box').css(
							{
								'display': 'block',
						    'visibility': 'visible',
						    'opacity': '1',
						    'filter': 'alpha(opacity=100)',
						    'max-width': 'none',
						    '-webkit-transform': 'scale(1)',
						    '-ms-transform': 'scale(1)',
						    'transform': 'scale(1)'
						});
					}else {
						angular.element('.elevator-weixin-box').css(
							{
								'position': 'absolute',
						    'width': '172px',
						    'height': '212px',
						    'bottom': '-99px',
						    'right': '0',
						    '-webkit-transition': 'opacity .25s,transform .3s',
						    '-moz-transition':' opacity .25s,transform .3s',
						    'transition': 'opacity .25s,transform .3s',
						    'opacity': '0',
						    'filter': 'alpha(opacity=0)',
						    'max-width': '0',
						    '-webkit-transform': 'scale(.01)',
						    '-ms-transform': 'scale(.01)',
						    'transform': 'scale(.01)',
						    '-webkit-transform-origin':' 100% 95%',
						    '-ms-transform-origin': '100% 95%',
						    'transform-origin': '100% 95%',
						    'background': 'url(../../img/wechat.webp) no-repeat'
						});
					}

			});
/************************wechat show ends*********************************/

			$scope.items = ['item1', 'item2', 'item3'];
			$scope.open = function (size) {//'sm','lg',''
	      var modalInstance = $modal.open({
	        templateUrl: 'myModalContact.html',
	        controller: 'ModalContactCtrl',
	        size: size,
	        resolve: {
	          items: function () {
	            return $scope.items;
	          }
	        }
	      });

	      modalInstance.result.then(function (selectedItem) {
	        $scope.selected = selectedItem;
	      }, function () {
	        $log.info('Modal dismissed at: ' + new Date());
	      });
	    };
			$scope.feedback = function (size) {//'sm','lg',''
	      var modalInstance = $modal.open({
	        templateUrl: 'myModalFeedback.html',
	        controller: 'ModalContactCtrl',
	        size: size,
	        resolve: {
	          items: function () {
	            return $scope.items;
	          }
	        }
	      });

	      modalInstance.result.then(function (selectedItem) {
	        $scope.selected = selectedItem;
	      }, function () {
	        $log.info('Modal dismissed at: ' + new Date());
	      });
	    };

		}])
})();
