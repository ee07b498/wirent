'use strict';

/* Controllers */

angular.module('andy')
	.factory('indexService', function () {
    var savedData = {};

    function set(data) {
      savedData = data;
    }

    function get() {
      return savedData;
    }

    return {
      set: set,
      get: get,
    };

		})
	.factory('readData', ['$http', '$q', function ($http, $q) {
    return {
      query: function () {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: '/customer/hotrent',
        }).success(function (data, status, header, config) {
          deferred.resolve(data);
        }).error(function (data, status, header, config) {
          deferred.reject(data);
        });

        return deferred.promise;
      },
    };
		}, ])
	.factory('SearchService', function () {
		var savedData = {};

		function set(data) {
    savedData = data;
		}

		function get() {
    return savedData;
		}

		return {
    set: set,
    get: get,
		};

})
	.factory('hotRentService', function () {
		var savedData = {};

		function set(data) {
    savedData = data;
		}

		function get() {
    return savedData;
		}

		return {
    set: set,
    get: get,
		};

})
	.factory('updateService', function () {
		var savedData = {};

		function set(data) {
    savedData = data;
		}

		function get() {
    return savedData;
		}

		return {
    set: set,
    get: get,
		};

})
	.filter('propsFilter', function () {
		    return function (items, props) {
		        var out = [];

		        if (angular.isArray(items)) {
		          items.forEach(function (item) {
		            var itemMatches = false;

		            var keys = Object.keys(props);
		            for (var i = 0; i < keys.length; i++) {
		              var prop = keys[i];
		              var text = props[prop].toLowerCase();
		              if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
		                itemMatches = true;
		                break;
		              }
		            }

		            if (itemMatches) {
		              out.push(item);
		            }
		          });
		        } else {
		          // Let the output be the input untouched
		          out = items;
		        }

		        return out;
		    };
		})
		.directive('animatesearch', ['$timeout', function($timeout) {
			return {
				restrict: 'EA',
				templateUrl: '/partials/mydirectives/directive-search.html',
				//			   css: 'css/winning/new.css',
				scope: {
					tips : '=',
					features : '=',
					boxshow : '=',
					openmodal : "&"
				},
				controller: function($scope) {
//					$scope.openmodal();
				},
				link: function(scope, element, attr) {
//					scope.openmodal();
					scope.tips=false;
					scope.features=false;
					scope.boxshow=true;
					/*点击事件*/
					scope.clickEvent = function(event) {
						var left = 0;
						var opacity=0;
//						left = left + 63 * event;
						if(event == 0) {
							left = 0;
							opacity=1;
							scope.tips=false;
							scope.features=false;
							scope.boxshow=true;
							element.find("i").css({'opacity': 1,'left': left + 90 + 'px'});
						} else if(event == 1) {
							left = 90;
							opacity=1;
							scope.tips=true;
							scope.features=false;
							scope.boxshow=true;
							element.find("i").css({'opacity': 1,'left': left + 90 + 'px'});
						}
						 else if(event == 2) {
							left = 130;
							opacity=1;
							scope.tips=false;
							scope.features=false;
							scope.boxshow=true;
							element.find("i").css({'opacity': 1,'left': left + 56 + 'px'});
						}
						  else if(event == 3) {
							left = 186;
							opacity=1;
							scope.tips=true;
							scope.features=false;
							scope.boxshow=false;
							element.find("i").css({'opacity': 0,'left': left + 56 + 'px'});
						}
						   else if(event == 4) {
							left = 256;
							opacity=1;
							scope.tips=false;
							scope.features=true;
							scope.boxshow=false;
							element.find("i").css({'opacity': 0,'left': left + 56 + 'px'});
						}
						 else if(event == 5) {
						 	left = 334;
						 	opacity=1;
							scope.tips=false;
							scope.features=false;
							scope.boxshow=true;
							element.find("i").css({'opacity': 1,'left': left + 56 + 'px'});
						}
						element.find("li").removeClass("selected");
						element.find("li").eq(event).addClass("selected");
						/*element.find("i").css({
							'left': left + 56 + 'px'
						});*/
					};
				}
			}
		}])
		.directive('animatesearch1', ['$timeout', function($timeout) {
			return {
				restrict: 'EA',
				templateUrl: '/partials/mydirectives/directive-search.html',
				//			   css: 'css/winning/new.css',
				scope: {
					tips1 : '=',
					features1 : '=',
					boxshow1 : '=',
					openmodal : "&"
				},
				controller: function($scope) {
//					$scope.openmodal();
				},
				link: function(scope, element, attr) {
//					scope.openmodal();
					scope.tips1=false;
					scope.features1=false;
					scope.boxshow1=true;
					/*点击事件*/
					scope.clickEvent = function(event) {
						var left = 0;
						var opacity=0;
//						left = left + 63 * event;
						if(event == 0) {
							left = 0;
							opacity=1;
							scope.tips1=false;
							scope.features1=false;
							scope.boxshow1=true;
							element.find("i").css({'opacity': 1,'left': left + 90 + 'px'});
						} else if(event == 1) {
							left = 90;
							opacity=1;
							scope.tips1=true;
							scope.features1=false;
							scope.boxshow1=true;
							element.find("i").css({'opacity': 1,'left': left + 90 + 'px'});
						}
						 else if(event == 2) {
							left = 130;
							opacity=1;
							scope.tips1=false;
							scope.features1=false;
							scope.boxshow1=true;
							element.find("i").css({'opacity': 1,'left': left + 56 + 'px'});
						}
						  else if(event == 3) {
							left = 186;
							opacity=1;
							scope.tips1=true;
							scope.features1=false;
							scope.boxshow1=false;
							element.find("i").css({'opacity': 0,'left': left + 56 + 'px'});
						}
						   else if(event == 4) {
							left = 256;
							opacity=1;
							scope.tips1=false;
							scope.features1=true;
							scope.boxshow1=false;
							element.find("i").css({'opacity': 0,'left': left + 56 + 'px'});
						}
						 else if(event == 5) {
						 	left = 334;
						 	opacity=1;
							scope.tips1=false;
							scope.features1=false;
							scope.boxshow1=true;
							element.find("i").css({'opacity': 1,'left': left + 56 + 'px'});
						}
						element.find("li").removeClass("selected");
						element.find("li").eq(event).addClass("selected");
						/*element.find("i").css({
							'left': left + 56 + 'px'
						});*/
					};
				}
			}
		}])
		.directive('selectSearch', function($compile) {
			return {
				restrict: 'AE',
				scope: {
					datas: '=',
					x: '=',
					searchField: '=bind',
					getData: "&",
					change: "&"
				},
				controller: function($scope) {
					$scope.getData();
					$scope.change();
				},
				template: '<input type = "test"' +
					'class="input-lg form-control" autocomplete="off" name="inputStr" data-val="true" data-val-required="Please choose a location to search." ng-minlength="2"  placeholder="Search by suburb, region, postcode or address" type="text"' +
					'ng-change="changeKeyValue(searchField)" ng-keyup="getData({val:searchField})" ng-model="searchField" ' +
					' value="{{searchField}}" style="width:414px; height:55px;border:none"/>' +
					'<div  ng-hide="hidden" style = "position:absolute; top:55px; z-index: 1000;">' +
					'   <select style = "width:413px; border:none;border-bottom-left-radius:2px;border-bottom-right-radius:4px; overflow-x:hidden;" ng-change="change(x)" ng-model="x" multiple>' +
					'       <option ng-repeat="data in datas track by $index" style="padding-left:16px;padding-bottom:10px">{{data}}</option>' +
					'   </select>' +
					'</div>',
				//    replace: true,  overflow-y:hidden;remove the y-direction overflow-hidden
				link: function($scope, elem, attr, ctrl) {
					$scope.getData();
					$scope.change();
					$scope.tempdatas = $scope.datas; //下拉框选项副本
					$scope.hidden = true; //选择框是否隐藏
					$scope.searchField = ''; //文本框数据
					//将下拉选的数据值赋值给文本框
					$scope.change = function(x) {
						$scope.searchField = x;
						$scope.hidden = true;
					}
					//获取的数据值与下拉选逐个比较，如果包含则放在临时变量副本，并用临时变量副本替换下拉选原先的数值，如果数据为空或找不到，就用初始下拉选项副本替换
					$scope.changeKeyValue = function(v) {

						var newDate = []; //临时下拉选副本
						//如果包含就添加
						angular.forEach($scope.datas, function(data, index, array) {
							if((data + "").indexOf(v) >= 0) {
								newDate.unshift(data);
							}
						});
						//用下拉选副本替换原来的数据
						$scope.datas = newDate;
						//下拉选展示
						$scope.hidden = false;
						//如果不包含或者输入的是空字符串则用初始变量副本做替换
						if($scope.datas.length == 0 || '' == v) {
							$scope.datas = $scope.tempdatas;
						}
						console.log($scope.datas);
					}
				}
			};
		})
		.directive('selectSearch1', function($compile) {
			return {
				restrict: 'AE',
				scope: {
					datas1: '=',
					x1: '=',
					searchField1: '=bind',
					getData1: "&",
					change1: "&"
				},
				controller: function($scope) {
					$scope.getData1();
					$scope.change1();
				},
				template: '<input type = "test"' +
					'class="input-lg form-control" autocomplete="off" name="inputStr" data-val="true" data-val-required="Please choose a location to search." ng-minlength="2"  placeholder="Search by suburb, region, postcode or address" type="text"' +
					'ng-change="changeKeyValue1(searchField1)" ng-keyup="getData1({val:searchField1})" ng-model="searchField1" ' +
					' value="{{searchField1}}" style="width:414px; height:55px;border:none"/>' +
					'<div  ng-hide="hidden" style = "position:absolute; top:55px; z-index: 1000;">' +
					'   <select style = "width:413px; border:none;border-bottom-left-radius:2px;border-bottom-right-radius:4px; overflow-x:hidden;" ng-change="change1(x1)" ng-model="x1" multiple>' +
					'       <option ng-repeat="data in datas1 track by $index" style="padding-left:16px;padding-bottom:10px">{{data}}</option>' +
					'   </select>' +
					'</div>',
				//    replace: true,  overflow-y:hidden;remove the y-direction overflow-hidden
				link: function($scope, elem, attr, ctrl) {
					$scope.getData1();
					$scope.change1();
					$scope.tempdatas = $scope.datas1; //下拉框选项副本
					$scope.hidden = true; //选择框是否隐藏
					$scope.searchField1 = ''; //文本框数据
					//将下拉选的数据值赋值给文本框
					$scope.change1 = function(x) {
						$scope.searchField1 = x;
						$scope.hidden = true;
					}
					//获取的数据值与下拉选逐个比较，如果包含则放在临时变量副本，并用临时变量副本替换下拉选原先的数值，如果数据为空或找不到，就用初始下拉选项副本替换
					$scope.changeKeyValue1 = function(v) {

						var newDate = []; //临时下拉选副本
						//如果包含就添加
						angular.forEach($scope.datas1, function(data, index, array) {
							if((data + "").indexOf(v) >= 0) {
								newDate.unshift(data);
							}
						});
						//用下拉选副本替换原来的数据
						$scope.datas1 = newDate;
						//下拉选展示
						$scope.hidden = false;
						//如果不包含或者输入的是空字符串则用初始变量副本做替换
						if($scope.datas1.length == 0 || '' == v) {
							$scope.datas1 = $scope.tempdatas;
						}
						console.log($scope.datas1);
					}
				}
			};
		})
		.directive('hotrent', ['readData','$timeout', 'mouseEvent','hotRentService', function(readData, $timeout, mouseEvent,hotRentService) {
			return {
				restrict: 'EA',
				templateUrl: '/partials/mydirectives/directive-hotrent.html',
				scope: {
				},
				link: function(scope, element, attr) {
					scope.imageid = 4;
					scope.left = 0;
					var promise = readData.query();
					var step = 0;
					var time = null;
					promise.then(function(data) {
						 angular.forEach(data, function(data,index,array){
						//data等价于array[index]
						data.train_station = false;
						data.backpack = false;
						data.park = false;
						data.school = false;
						data.big_family = false;
						data.shopping_mall = false;
						data.offical_rental = false;
						data.university = false;
						var dataresults = data.ER_Description.split(";");
						console.log("lengthhhh",dataresults);
						var uniindex = 0
						dataresults.pop();
						uniindex = dataresults.indexOf('university');
						console.log("length",dataresults.length);
						for(var i =0;i<dataresults.length;i++)
						{
							switch (dataresults[i])
							{
							     case "train_station":
							     	data.train_station = true;
							   	 break;
							     case "backpack":
									data.backpack = true;
							    break;
							     case "park":
									data.park = true;
							    break;
							     case "school":
									data.school = true;
							    break;
							     case "big_family":
									data.big_family = true;
							    break;
							     case "shopping_mall":
									data.shopping_mall = true;
							    break;
							     case "offical_rental":
									data.offical_rental = true;
							    break;
							    case "university":
							     	data.university = true;
							     break;
							    case "":
							    	data.university = false;
							    	 break;
							    default:
							    	data.university = true;
							    	 break;

							}
						}
						if (uniindex == dataresults.length-1 || uniindex==-1){
								data.university = false;
							}
						if(data.university){
							data.uniname = dataresults[uniindex + 1];
						}
					});
						scope.carouselimages = data;
						hotRentService.set(data);
						console.log("scope.carouselimages",scope.carouselimages);
					});
					scope.prev = function(){
						if(scope.imageid >4 ){
							scope.imageid--;
							scope.left = scope.left+341.25;
							element.find("ul").css({
								'left': scope.left + 'px'
							});
						}
					}
					scope.next = function(){
						if(scope.imageid <scope.carouselimages.length ){
							scope.imageid++;
							scope.left = scope.left-341.25;
							element.find("ul").css({
								'left': scope.left + 'px'
							});
						}
					}
				}
			}
		}])
  .controller('MainCtrl', ['$scope', '$translate', '$localStorage', '$window','indexService',
    function(              $scope,   $translate,   $localStorage,   $window,indexService ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

      // config
      $scope.app = {
        name: 'Angulr',
        version: '1.3.3',
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
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
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = {en:'English', tw:'繁體中文',ch:'简体中文'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

  }]);
