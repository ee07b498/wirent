'use strict'
angular.module('andy')
  .factory('wechatService',function(){
    var wechat = {};
    return {
      getClassname : function () {
        return wechat.classname;
      },

      setClassname : function (classname) {
        wechat.classname = classname;
      }
    }
  })
  .controller('footerCtrl',['$location','$rootScope','$anchorScroll','$scope','$element','wechatService',function($location,$rootScope,$anchorScroll,$scope,$element,wechatService){

     $scope.wechatShow = false;
     $scope.showWechat = function(){
       $scope.wechatShow = !$scope.wechatShow;
       wechatService.setClassname($scope.wechatShow);
       $rootScope.$broadcast('wechat', $scope.wechatShow);
     };
  }]);
