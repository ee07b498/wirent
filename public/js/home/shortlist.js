'use strict';
	angular.module('andy')
	.controller('ModalCancelCtrl', ['$http','$scope', '$modalInstance', 'items','utilConvertDateToString', function($http,$scope, $modalInstance,items,utilConvertDateToString) {
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
		.controller('ModalEquireCtrl', ['$http','$scope', '$modalInstance', 'items','utilConvertDateToString', function($http,$scope, $modalInstance,items,utilConvertDateToString) {
				$scope.contact = {};
				$scope.customer = {};
				$http.get('/customer/profile')
				.then(function(r) {
					console.log(r);
					if(r.data.customer_login_status){
						$scope.saveEnvelope = function(){
							$scope.customer.title = 'Contact';
							$scope.customer.CID = r.data.CID;
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

							});

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
					}
				});

			}])
		.controller('shortlistCtrl',['$scope','$http','$state','$modal','$log','SearchService',function($scope,$http,$state,$modal,$log,SearchService){
			// $scope.shortlistData=SearchService.get();
			 $scope.shortlistcheckdata = {};
			 $scope.shortlistDelete = {};
			$http.get('/customer/profile')
			.then(function(r) {
				console.log(r);
				if(r.data.customer_login_status){
					$scope.shortlistcheckdata.CID = r.data.CID;
					$scope.shortlistcheckdata.CLType = 'FavorSave';
					$http.post('/customer/shortlist', $scope.shortlistcheckdata)
							.then(function(r){
								$scope.shortlistData = r.data;
								console.log('r',r);
							},function(e){
								console.log("数据有误");
							});
				}

			});
			$scope.remove = function(key){
				$http.get('/customer/profile')
				.then(function(r) {
					console.log(r);
					if(r.data.customer_login_status){
						$scope.shortlistDelete.CID = r.data.CID;
						$scope.shortlistDelete.CLType="FavorSave";
						$scope.shortlistDelete.CLDetail= $scope.shortlistData[key][0].ER_ID;
		//				$scope.shortlistDelete.CLTime="";
						$http.post('/customer/shortlist/delete',$scope.shortlistDelete)
								.then(function(r){
									console.log("r=====>>"+r);
									/*********************************/
									var modalInstance = $modal.open({
										templateUrl: 'myModalCancel.html',
										controller: 'ModalCancelCtrl',
										size: 'sm',
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
									/**********************************/
									$state.reload();
								},function(e){
										console.log(e);
								});
					}
				});

			};
			/*********************sortby*********************************************/
			$scope.sortBy = function(orderName){
				alert(777);
				if(orderName==='ER_Price'){
					$scope.orderright = false;
					$scope.orderleft = true;
					$scope.sortPrice=!$scope.sortPrice;
				}else if(orderName==='ER_AvailableDate'){
					$scope.orderleft = false;
					$scope.orderright = true;
					$scope.sortDate=!$scope.sortDate;
				}

				$scope.reverse = ($scope.orderName === orderName) ? !$scope.reverse : false;
					$scope.orderName = orderName;
			//				$scope.orderName = order+'';
			}
			/*********************sortby ends*********************************************/

			/************************contactus modal starts*************************/
				$scope.items = ['item1', 'item2', 'item3'];
					$scope.open = function (size) {
						var modalInstance = $modal.open({
							templateUrl: 'myModalEnquire.html',
							controller: 'ModalEquireCtrl',
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
		}]);
