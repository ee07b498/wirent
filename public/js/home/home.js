/**
 * @Date:   2017-08-22T10:58:54+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-09-08T16:00:58+10:00
 */



  'use strict';
  angular.module('andy')
   .controller('HomeController', [
    '$cookies',
    '$rootScope',
    '$state',
    '$scope',
    '$element',
    '$http',
    '$animate',
    '$timeout',
    'SearchService',
    'updateService',
    'getDataService',
    '$modal',
    '$log',
    function ($cookies, $rootScope, $state, $scope, $element, $http,$animate, $timeout, SearchService, updateService, getDataService,$modal, $log) {
     var hello = true;
     //						var address = {};
     var active = true;
     var data = {};
     var data1 = {};
     var count = 0;
     var business = {};
     $scope.datas = []; //下拉框选项
     $scope.datas1 = []; //下拉框选项
     var entireData = {};
		 var shareData = {};
     var ER_Feature = '';
     /*****************anchorscroll********************/

     /***************ui-select multiple choices******************************/
           $scope.location = {};
           $scope.dataResults = [];
           $scope._location = {};
           $scope._dataResults = [];
           $scope.location.postcode = "";
           $scope.location.region = "";
           $scope.location.suburb = "";
           $scope.dataResults.push( $scope.location);
           $scope._location.postcode = "";
           $scope._location.region = "";
           $scope._location.suburb = "";
           $scope._dataResults.push( $scope._location);
           $scope.person = {};
           $scope.people = [];
           $scope._person = {};
           $scope._people = [];
           $scope.multipleLocationDemo = {};
           $scope.multipleLocationDemo.selectedLocationWithGroupBy = [];
           $scope._multipleLocationDemo = {};
           $scope._multipleLocationDemo._selectedLocationWithGroupBy = [];
           $scope.multipleDemo = {};
           $scope.multipleDemo.selectedPeopleWithGroupBy = [];
           $scope._multipleDemo = {};
           $scope._multipleDemo._selectedPeopleWithGroupBy = [];
           $scope.someGroupFn = function (item){
           if (item.suburb[0] >= 'A' && item.suburb[0] <= 'M')
              return 'From A - M';
           if (item.suburb[0] >= 'N' && item.suburb[0] <= 'Z')
              return 'From N - Z';
           };
           $scope.someGroupFnStation = function (item){
           if (item.station[0] >= 'A' && item.station[0] <= 'M')
              return 'From A - M';
           if (item.station[0] >= 'N' && item.station[0] <= 'Z')
              return 'From N - Z';
           };

          /***************get the value from the input***********************************/
          function unique(arr) {
                var comparer = function compareObject(a, b) {
                    if (a.suburb == b.suburb) {
                        if (a.postcode < b.postcode) {
                            return -1;
                        } else if (a.postcode > b.postcode) {
                            return 1;
                        } else {
                            return 0;
                        }
                    } else {
                        if (a.suburb < b.suburb) {
                            return -1;
                        } else {
                            return 1;
                        }
                    }
                }

                arr.sort(comparer);
                // console.log("Sorted: " + JSON.stringify(arr));
                for (var i = 0; i < arr.length - 1; ++i) {
                    if (comparer(arr[i], arr[i+1]) === 0) {
                        arr.splice(i, 1);
                        // console.log("Splicing: " + JSON.stringify(arr));
                    }
                }
                return arr;
            }
            function uniqueStation(arr) {
                  var comparer = function compareObject(a, b) {
                      if (a.suburb == b.suburb) {
                          if (a.station < b.station) {
                              return -1;
                          } else if (a.station > b.station) {
                              return 1;
                          } else {
                              return 0;
                          }
                      } else {
                          if (a.suburb < b.suburb) {
                              return -1;
                          } else {
                              return 1;
                          }
                      }
                  }
                  arr.sort(comparer);
                  // console.log("Sorted: " + JSON.stringify(arr));
                  for (var i = 0; i < arr.length - 1; ++i) {
                      if (comparer(arr[i], arr[i+1]) === 0) {
                          arr.splice(i, 1);
                          // console.log("Splicing: " + JSON.stringify(arr));
                      }
                  }
                  return arr;
              }
           $scope.fn = function(search) {
              //do something with search
              console.log(search);
              data.inputStr = search;
              if(data.inputStr && data.inputStr.length > 2) {
               $http.post('/customer/filt_address', data)
                .then(function(r) {
                 console.log('search===>',search);
                 console.log('r===>',r);
                 $scope.dataResults = unique(r.data);
                console.log('$scope.dataResults===>',$scope.dataResults);
                 console.log($scope.dataResults);
                }, function(e) {
                 console.log("数据有误"+ e);
                })
              } else {

              }
          }
          $scope._fn = function(search) {
             //do something with search
             console.log(search);
             data1.inputStr = search;
             if(data1.inputStr && data1.inputStr.length > 2) {
              $http.post('/customer/filt_address', data1)
               .then(function(r) {
                console.log('search===>',search);
                console.log('r===>',r);
                $scope._dataResults = unique(r.data);
               console.log('$scope.dataResults===>',$scope._dataResults);
                console.log($scope._dataResults);
               }, function(e) {
                console.log("数据有误"+ e);
               })
             } else {

             }
         }
     /************************************************/

     //model types
     $scope.myMode = 'Entire';
     $scope.Modes = [{id: 1,name: 'Entire'}, {id: 2,name: 'Share'},
     {id: 3, name: 'New Homes'}, {id: 4,name: 'Sold'}];
     // property types
     $scope.myPropertyType = '';
     $scope.propertyTypes = [{ id: 1,propertyType: 'House'},
     {id: 2, propertyType: 'Apartment'},{id: 3,propertyType: 'Unit'},
     {id: 4, propertyType: 'Studio'}];

     //select minPrice
     $scope.myMinPrice = 0;
     //select maxPrice
     $scope.myMaxPrice = 2000;
     $scope.myMinPrice_Share = 0;
     //select maxPrice
     $scope.myMaxPrice_Share = 2000;
     $scope.Prices = [{ id: 1, price: '' }, { id: 2, price: '50' }, { id: 3, price: '100' },{ id: 4, price: '150' }
               ,{ id: 5, price: '200' },{ id: 6, price: '250' },{ id: 7, price: '300' },{ id: 8, price: '350' }
               ,{ id: 9, price: '400' },{ id: 10, price: '450' },{ id: 11, price: '500' },{ id: 12, price: '550' }
               ,{ id: 13, price: '600' },{ id: 14, price: '650' },{ id: 15, price: '700' },{ id: 16, price: '750' }
               ,{ id: 17, price: '800' },{ id: 18, price: '850' },{ id: 19, price: '900' },{ id: 20, price: '950' }
               ,{ id: 21, price: '1000' },{ id: 22, price: '1100' },{ id: 23, price: '1200' },{ id: 24, price: '1300'}
               ,{ id: 25, price: '1400' },{ id: 26, price: '1500' },{ id: 27, price: '1600' },{ id: 28, price: '1700' }
               ,{ id: 29, price: '1800' },{ id: 30, price: '1900' }];
     //select bedsNum
     $scope.minBedNum = 0;
     $scope.maxBedNum = 10;
     $scope.minBedNum_Share = 0;
     $scope.maxBedNum_Share = 10;
     $scope.bedsNum = [{ id: 1, num: '1' }, { id: 2, num: '2' }, { id: 3, num: '3' },{ id: 4, num: '4' }
             ,{ id: 5, num: '5' },{ id: 6, num: '6' },{ id: 7, num: '7' },{ id: 8, num: '8' },{ id: 9, num: '9' }
             ,{ id: 10, num: '10' }];
     //select bathNum
     $scope.minBathNum = 0;
     $scope.maxBathNum = 10;
     $scope.minBathNum_Share = 0;
     $scope.maxBathNum_Share = 10;
     $scope.bathsNum = [{ id: 1, num: '0' }, { id: 2, num: '1' }, { id: 3, num: '2' },{ id: 4, num: '3' }
             ,{ id: 5, num: '4' },{ id: 6, num: '5' },{ id: 7, num: '6' },{ id: 8, num: '7' },{ id: 9, num: '8' },{ id: 10, num: '9' },{ id: 11, num: '10' }];
     //select parkingNum
     $scope.myParkingNum = 0;
     $scope.minParkingNum = 0;
     $scope.maxParkingNum = 10;
     $scope.minParkingNum_Share = 0;
     $scope.maxParkingNum_Share = 10;
     $scope.parkingsNum = [{ id: 1, num: '0' }, { id: 2, num: '1' }, { id: 3, num: '2' },{ id: 4, num: '3' }
             ,{ id: 5, num: '4' },{ id: 6, num: '5' },{ id: 7, num: '6' },{ id: 8, num: '7' },{ id: 9, num: '8' },{ id: 10, num: '9' },{ id: 11, num: '10' }];

     function SetCredentials(searchData) {
      $rootScope.globals = {
       currentData: {
        data: searchData
       }
      };
      // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
      var cookieExp = new Date();
      cookieExp.setDate(cookieExp.getDate() + 7);
      $cookies.globals = $rootScope.globals;
     }
     /**
      * features update code starts
      */
     $scope.nosmoking = function (){
      $scope.no_smoking = !$scope.no_smoking;
     }
     $scope.nopets = function (){
      $scope.no_pets = !$scope.no_pets;
     }
     $scope.girlonly = function (){
      $scope.girl_only = !$scope.girl_only;
     }
     $scope.boyonly = function (){
      $scope.boy_only = !$scope.boy_only;
     }
     $scope.full_kitchen = function (){
      $scope.fullkitchen = !$scope.fullkitchen;
     }
     $scope.coffee_bar = function (){
      $scope.coffee = !$scope.coffee;
     }
     $scope.aircondition_click = function (){
      $scope.aircondition = !$scope.aircondition;
     }
     $scope.media_click = function (){
      $scope.media = !$scope.media;
     }
     $scope.laundry_click = function (){
      $scope.laundry = !$scope.laundry;
     }
     $scope.col_furniture = function (){
      $scope.furniture = !$scope.furniture;
     }


   /***************************features update ends *******************************************/

   /*******************************************************************************************
    * search by different features
    *******************************************************************************************/
   $scope.features_Submit = function(){
 //			alert($scope.wardrob);
    var arr_key = [$scope.girl_only,$scope.boy_only,
        $scope.furniture,$scope.laundry,
        $scope.fullkitchen,$scope.coffee,$scope.aircondition,$scope.media,
        $scope.no_smoking,$scope.no_pets];
    var arr_value = ["girl_only","boy_only","furniture","laundry","full_kitchen"
         ,"coffee_bar","aircondition","media","no_smoking","no_pets"];
    var arr_features = [];
    for(var i=0;i<arr_key.length;i++){
       if(arr_key[i]){
        arr_features.push("%"+arr_value[i]+";");
       }
    }
    if(arr_features.length==0){
     arr_features.push("");
    }
    ER_Feature = arr_features.join('');
    entireData = {
        ER_Suburb: '',
        ER_Region: '',
        ER_Type: $scope.myPropertyType,
        ER_PriceMin: $scope.myMinPrice,
        ER_PriceMax: 10000,
        ER_BedRoomMin: $scope.minBedNum,
        ER_BedRoomMax: 20,
        ER_BathRoomMin: $scope.minBathNum,
        ER_BathRoomMax: 10,
        ER_ParkingMin: $scope.myParkingNum,
        ER_ParkingMax: 10,
        ER_AreaMin: 0,
        ER_AreaMax: 50000,
        ER_AvailableDate: '2200-01-01',
        ER_Description:'',
        ER_Feature: ER_Feature
       }
    console.log("arr_features",arr_features.join(''));
    $http.post('/customer/filt/entire', entireData)
       .then(function(r) {
        SearchService.set(r);
        updateService.set(entireData);
        //SetCredentials(r);
        console.log('r===>', r);
        if(r.data.length > 0) {
 //								$state.go('app.listpage');
         $state.go('app.listpage');
        }
        //

       }, function(e) {
         console.log('r===>', e);
       });
   }


   /**************************************商家专区 starts****************************************************/
     $scope.businessSearch = function(TPDetail){
      business.TPDetail = TPDetail;
      business.TPServLoc = '';
      $http.post('/customer/filt_thirdparty', business)
       .then(function(r) {
        SearchService.set(r);
        updateService.set(TPDetail);
        console.log('r===>', r);
        if(r.data.length > 0) {
         $state.go('app.business');
        }
        //

       }, function(e) {

       });
     }
   /**************************************商家专区 ends****************************************************/

     /****************************datepicker control code************************************/
     $scope.today = function() {
      $scope.dt = new Date();
     };
     $scope.today();

     $scope.clear = function() {
      $scope.dt = null;
     };

     // Disable weekend selection
     /*$scope.disabled = function(date, mode) {
       return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
     };*/

     $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
     };
     $scope.toggleMin();

     $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
     };

     $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
     };

     $scope.initDate = new Date('2016-15-20');
     $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
     $scope.format = $scope.formats[0];


    /************************filter orderby*******************************/
    $scope.orderleft = false;
    $scope.orderright = false;
    $scope.sortBy = function(orderName){
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
    /************************filter orderby*******************************/

    /****************************train filter starts*****************************/
    /* $scope.get_Chatswood = function(str1,str2){
         if(t1Arr.length<=0){
          t1Arr.push(str2);
          console.log(str2);
          angular.element("."+str2).css({'background-color': '#fcb514'});
         }else{
          for(var i=0; i<t1Arr.length; i++) {
           if(t1Arr[i] == str2) {
             t1Arr.splice(i, 1);
             angular.element("."+str2).css({'background-color': '#4d555d'});
           }else{
            t1Arr.push(str2);
            angular.element("."+str2).css({'background-color': '#fcb514'});
           }
         }
         }
     }
     $scope.get_Hornsby = function(str1,str2){
         if(t1Arr.length<=0){
          t1Arr.push(str2);
          console.log(str2);
          angular.element("."+str2).css({'background-color': '#fcb514'});
         }else{
          for(var i=0; i<t1Arr.length; i++) {
           if(t1Arr[i] == str2) {
             t1Arr.splice(i, 1);
             angular.element("."+str2).css({'background-color': '#4d555d'});
           }else{
            t1Arr.push(str2);
            angular.element("."+str2).css({'background-color': '#fcb514'});
           }
         }
         }
     }*/
     /*****************************************************************
         ********************entire rental station filter*****************
         ****************************************************************/
     $scope.Chatswood=false;$scope.Hornsby=false;$scope.Epping=false;$scope.MQ_Uni=false;$scope.Rodes=false;$scope.allT1=false;
     $scope.Burwood=false;$scope.Straithfield=false;$scope.Greensquare=false;$scope.Mascot=false;$scope.Lidcome_T2=false;$scope.allT2=false;
     $scope.Central_T3=false;$scope.Sydenham=false;$scope.Campsie=false;$scope.Bankstown=false;$scope.Liverpool_T3=false;$scope.allT3=false;
     $scope.Central_T4=false;$scope.Redfern=false;$scope.Wollicreek=false;$scope.Rockdale=false;$scope.Hurstville=false;$scope.allT4=false;
     $scope.Parramatta=false;$scope.Westmead=false;$scope.Blacktown=false;$scope.Merrylands=false;$scope.Liverpool_T5=false;$scope.allT5=false;
      $scope.Clyde=false;$scope.Rosehill=false;$scope.Camellia=false;$scope.Carlingford=false;$scope.allT6=false;
     $scope.Lidcome_T7=false;$scope.Olympic_Park=false;$scope.allT7=false;
      // T1
     $scope.get_Chatswood = function (){
      $scope.Chatswood = !$scope.Chatswood;
      if($scope.Chatswood==true &&$scope.Hornsby==true&&$scope.Epping==true&&$scope.MQ_Uni==true&&$scope.Rodes==true)
      {
       $scope.allT1 = true;
       $scope.Chatswood=false ;$scope.Hornsby=false; $scope.Epping=false; $scope.MQ_Uni=false; $scope.Rodes=false;
      }else if($scope.Chatswood==false || $scope.Hornsby==false || $scope.Epping==false || $scope.MQ_Uni==false || $scope.Rodes==false){
       $scope.allT1 = false;
      }
      station_selection();

     }

     $scope.get_Hornsby = function (){
      $scope.Hornsby = !$scope.Hornsby;
      if($scope.Chatswood==true &&$scope.Hornsby==true&&$scope.Epping==true&&$scope.MQ_Uni==true&&$scope.Rodes==true)
      {
       $scope.allT1 = true;
       $scope.Chatswood=false ;$scope.Hornsby=false; $scope.Epping=false; $scope.MQ_Uni=false; $scope.Rodes=false;
      }else if($scope.Chatswood==false || $scope.Hornsby==false || $scope.Epping==false || $scope.MQ_Uni==false || $scope.Rodes==false){
       $scope.allT1 = false;
      }
      station_selection();
     }
     $scope.get_Epping = function (){
      $scope.Epping = !$scope.Epping;
      if($scope.Chatswood==true &&$scope.Hornsby==true&&$scope.Epping==true&&$scope.MQ_Uni==true&&$scope.Rodes==true)
      {
       $scope.allT1 = true;
       $scope.Chatswood=false ;$scope.Hornsby=false; $scope.Epping=false; $scope.MQ_Uni=false; $scope.Rodes=false;
      }else if($scope.Chatswood==false || $scope.Hornsby==false || $scope.Epping==false || $scope.MQ_Uni==false || $scope.Rodes==false){
       $scope.allT1 = false;
      }
        station_selection();
     }
     $scope.get_MQ_Uni = function (){
      $scope.MQ_Uni = !$scope.MQ_Uni;
      if($scope.Chatswood==true &&$scope.Hornsby==true&&$scope.Epping==true&&$scope.MQ_Uni==true&&$scope.Rodes==true)
      {
       $scope.allT1 = true;
       $scope.Chatswood=false ;$scope.Hornsby=false; $scope.Epping=false; $scope.MQ_Uni=false; $scope.Rodes=false;

      }else if($scope.Chatswood==false || $scope.Hornsby==false || $scope.Epping==false || $scope.MQ_Uni==false || $scope.Rodes==false){
       $scope.allT1 = false;
      }
        station_selection();
     }
     $scope.get_Rodes = function (){
      $scope.Rodes = !$scope.Rodes;
      if($scope.Chatswood==true &&$scope.Hornsby==true&&$scope.Epping==true&&$scope.MQ_Uni==true&&$scope.Rodes==true)
      {
       $scope.allT1 = true;
       $scope.Chatswood=false ;$scope.Hornsby=false; $scope.Epping=false; $scope.MQ_Uni=false; $scope.Rodes=false;
      }else if($scope.Chatswood==false || $scope.Hornsby==false || $scope.Epping==false || $scope.MQ_Uni==false || $scope.Rodes==false){
       $scope.allT1 = false;
      }
        station_selection();
     }

     $scope.get_All_T1 = function(){
      $scope.allT1 = !$scope.allT1;

      if($scope.allT1)
      {
       $scope.Chatswood = false;
       $scope.Hornsby = false;
       $scope.Epping = false;
       $scope.MQ_Uni = false;
       $scope.Rodes = false;
      }
      else{

      }
        station_selection();
     }

     // T2
     $scope.get_Burwood = function (){
      $scope.Burwood = !$scope.Burwood;
      if($scope.Burwood==true &&$scope.Straithfield==true&&$scope.Greensquare==true&&$scope.Mascot==true&&$scope.Lidcome_T2==true)
      {
       $scope.allT2 = true;
       $scope.Burwood=false; $scope.Straithfield=false; $scope.Greensquare=false; $scope.Mascot=false; $scope.Lidcome_T2=false;
      }else if($scope.Burwood==false || $scope.Straithfield==false || $scope.Greensquare==false || $scope.Mascot==false || $scope.Lidcome_T2==false){
       $scope.allT2 = false;
      }
        station_selection();
     }
     $scope.get_Straithfield = function (){
      $scope.Straithfield = !$scope.Straithfield;
      if($scope.Burwood==true &&$scope.Straithfield==true&&$scope.Greensquare==true&&$scope.Mascot==true&&$scope.Lidcome_T2==true)
      {
       $scope.Burwood=false; $scope.Straithfield=false; $scope.Greensquare=false; $scope.Mascot=false; $scope.Lidcome_T2=false;
       $scope.allT2 = true;
      }else if($scope.Burwood==false || $scope.Straithfield==false || $scope.Greensquare==false || $scope.Mascot==false || $scope.Lidcome_T2==false){
       $scope.allT2 = false;
      }
        station_selection();
     }
     $scope.get_Greensquare = function (){
      $scope.Greensquare = !$scope.Greensquare;
      if($scope.Burwood==true &&$scope.Straithfield==true&&$scope.Greensquare==true&&$scope.Mascot==true&&$scope.Lidcome_T2==true)
      {
       $scope.Burwood=false; $scope.Straithfield=false; $scope.Greensquare=false; $scope.Mascot=false; $scope.Lidcome_T2=false;
       $scope.allT2 = true;
      }else if($scope.Burwood==false || $scope.Straithfield==false || $scope.Greensquare==false || $scope.Mascot==false || $scope.Lidcome_T2==false){
       $scope.allT2 = false;
      }
        station_selection();
     }
     $scope.get_Mascot = function (){
      $scope.Mascot = !$scope.Mascot;
      if($scope.Burwood==true &&$scope.Straithfield==true&&$scope.Greensquare==true&&$scope.Mascot==true&&$scope.Lidcome_T2==true)
      {
       $scope.Burwood=false; $scope.Straithfield=false; $scope.Greensquare=false; $scope.Mascot=false; $scope.Lidcome_T2=false;
       $scope.allT2 = true;
      }else if($scope.Burwood==false || $scope.Straithfield==false || $scope.Greensquare==false || $scope.Mascot==false || $scope.Lidcome_T2==false){
       $scope.allT2 = false;
      }
        station_selection();
     }
     $scope.get_Lidcome_T2 = function (){
      $scope.Lidcome_T2 = !$scope.Lidcome_T2;
      if($scope.Burwood==true &&$scope.Straithfield==true&&$scope.Greensquare==true&&$scope.Mascot==true&&$scope.Lidcome_T2==true)
      {
       $scope.Burwood=false; $scope.Straithfield=false; $scope.Greensquare=false; $scope.Mascot=false; $scope.Lidcome_T2=false;
       $scope.allT2 = true;
      }else if($scope.Burwood==false || $scope.Straithfield==false || $scope.Greensquare==false || $scope.Mascot==false || $scope.Lidcome_T2==false){
       $scope.allT2 = false;
      }
        station_selection();
     }

     $scope.get_All_T2 = function(){
      $scope.allT2 = !$scope.allT2;

      if($scope.allT2)
      {
       $scope.Burwood = false;
       $scope.Straithfield = false;
       $scope.Greensquare = false;
       $scope.Mascot = false;
       $scope.Lidcome_T2 = false;
      }
      else{

      }
      station_selection();
     }

     // T3
     $scope.get_Central_T3 = function (){
      $scope.Central_T3 = !$scope.Central_T3;
      if($scope.Central_T3==true &&$scope.Sydenham==true&&$scope.Campsie==true&&$scope.Bankstown==true&&$scope.Liverpool_T3==true)
      {
       $scope.allT3 = true;
       $scope.Central_T3=false; $scope.Sydenham=false; $scope.Campsie=false; $scope.Bankstown=false; $scope.Liverpool_T3=false;
      }else if($scope.Central_T3==false || $scope.Sydenham==false || $scope.Campsie==false || $scope.Bankstown==false || $scope.Liverpool_T3==false){
       $scope.allT3 = false;
      }
        station_selection();
     }
     $scope.get_Sydenham = function (){
      $scope.Sydenham = !$scope.Sydenham;
      if($scope.Central_T3==true &&$scope.Sydenham==true&&$scope.Campsie==true&&$scope.Bankstown==true&&$scope.Liverpool_T3==true)
      {
       $scope.allT3 = true;
       $scope.Central_T3=false; $scope.Sydenham=false; $scope.Campsie=false; $scope.Bankstown=false; $scope.Liverpool_T3=false;
      }else if($scope.Central_T3==false || $scope.Sydenham==false || $scope.Campsie==false || $scope.Bankstown==false || $scope.Liverpool_T3==false){
       $scope.allT3 = false;
      }
      station_selection();
     }
     $scope.get_Campsie = function (){
      $scope.Campsie = !$scope.Campsie;
      if($scope.Central_T3==true &&$scope.Sydenham==true&&$scope.Campsie==true&&$scope.Bankstown==true&&$scope.Liverpool_T3==true)
      {
       $scope.allT3 = true;
       $scope.Central_T3=false; $scope.Sydenham=false; $scope.Campsie=false; $scope.Bankstown=false; $scope.Liverpool_T3=false;
      }else if($scope.Central_T3==false || $scope.Sydenham==false || $scope.Campsie==false || $scope.Bankstown==false || $scope.Liverpool_T3==false){
       $scope.allT3 = false;
      }
      station_selection();
     }
     $scope.get_Bankstown = function (){
      $scope.Bankstown = !$scope.Bankstown;
      if($scope.Central_T3==true &&$scope.Sydenham==true&&$scope.Campsie==true&&$scope.Bankstown==true&&$scope.Liverpool_T3==true)
      {
       $scope.allT3 = true;
       $scope.Central_T3=false; $scope.Sydenham=false; $scope.Campsie=false; $scope.Bankstown=false; $scope.Liverpool_T3=false;
      }else if($scope.Central_T3==false || $scope.Sydenham==false || $scope.Campsie==false || $scope.Bankstown==false || $scope.Liverpool_T3==false){
       $scope.allT3 = false;
      }
      station_selection();
     }
     $scope.get_Liverpool_T3 = function (){
      $scope.Liverpool_T3 = !$scope.Liverpool_T3;
      if($scope.Central_T3==true &&$scope.Sydenham==true&&$scope.Campsie==true&&$scope.Bankstown==true&&$scope.Liverpool_T3==true)
      {
       $scope.allT3 = true;
       $scope.Central_T3=false; $scope.Sydenham=false; $scope.Campsie=false; $scope.Bankstown=false; $scope.Liverpool_T3=false;
      }else if($scope.Central_T3==false || $scope.Sydenham==false || $scope.Campsie==false || $scope.Bankstown==false || $scope.Liverpool_T3==false){
       $scope.allT3 = false;
      }
      station_selection();
     }

     $scope.get_All_T3 = function(){
      $scope.allT3 = !$scope.allT3;

      if($scope.allT3)
      {
       $scope.Central_T3 = false;
       $scope.Sydenham = false;
       $scope.Campsie = false;
       $scope.Bankstown = false;
       $scope.Liverpool_T3 = false;
      }
      else{

      }
      station_selection();
     }

     // T4
     $scope.get_Central_T4 = function (){
      $scope.Central_T4 = !$scope.Central_T4;
      if($scope.Central_T4==true &&$scope.Redfern==true&&$scope.Wollicreek==true&&$scope.Rockdale==true&&$scope.Hurstville==true)
      {
       $scope.allT4 = true;
       $scope.Central_T4=false; $scope.Redfern=false; $scope.Wollicreek=false; $scope.Rockdale=false; $scope.Hurstville=false;
      }else if($scope.Central_T4==false || $scope.Redfern==false || $scope.Wollicreek==false || $scope.Rockdale==false || $scope.Hurstville==false){
       $scope.allT4 = false;
      }
      station_selection();
     }
     $scope.get_Redfern = function (){
      $scope.Redfern = !$scope.Redfern;
      if($scope.Central_T4==true &&$scope.Redfern==true&&$scope.Wollicreek==true&&$scope.Rockdale==true&&$scope.Hurstville==true)
      {
       $scope.allT4 = true;
       $scope.Central_T4=false; $scope.Redfern=false; $scope.Wollicreek=false; $scope.Rockdale=false; $scope.Hurstville=false;
      }else if($scope.Central_T4==false || $scope.Redfern==false || $scope.Wollicreek==false || $scope.Rockdale==false || $scope.Hurstville==false){
       $scope.allT4 = false;
      }
      station_selection();
     }
     $scope.get_Wollicreek = function (){
      $scope.Wollicreek = !$scope.Wollicreek;
      if($scope.Central_T4==true &&$scope.Redfern==true&&$scope.Wollicreek==true&&$scope.Rockdale==true&&$scope.Hurstville==true)
      {
       $scope.allT4 = true;
       $scope.Central_T4=false; $scope.Redfern=false; $scope.Wollicreek=false; $scope.Rockdale=false; $scope.Hurstville=false;
      }else if($scope.Central_T4==false || $scope.Redfern==false || $scope.Wollicreek==false || $scope.Rockdale==false || $scope.Hurstville==false){
       $scope.allT4 = false;
      }
      station_selection();
     }
     $scope.get_Rockdale = function (){
      $scope.Rockdale = !$scope.Rockdale;
      if($scope.Central_T4==true &&$scope.Redfern==true&&$scope.Wollicreek==true&&$scope.Rockdale==true&&$scope.Hurstville==true)
      {
       $scope.allT4 = true;
       $scope.Central_T4=false; $scope.Redfern=false; $scope.Wollicreek=false; $scope.Rockdale=false; $scope.Hurstville=false;
      }else if($scope.Central_T4==false || $scope.Redfern==false || $scope.Wollicreek==false || $scope.Rockdale==false || $scope.Hurstville==false){
       $scope.allT4 = false;
      }
      station_selection();
     }
     $scope.get_Hurstville = function (){
      $scope.Hurstville = !$scope.Hurstville;
      if($scope.Central_T4==true &&$scope.Redfern==true&&$scope.Wollicreek==true&&$scope.Rockdale==true&&$scope.Hurstville==true)
      {
       $scope.allT4 = true;
       $scope.Central_T4=false; $scope.Redfern=false; $scope.Wollicreek=false; $scope.Rockdale=false; $scope.Hurstville=false;
      }else if($scope.Central_T4==false || $scope.Redfern==false || $scope.Wollicreek==false || $scope.Rockdale==false || $scope.Hurstville==false){
       $scope.allT4 = false;
      }
      station_selection();
     }

     $scope.get_All_T4 = function(){
      $scope.allT4 = !$scope.allT4;

      if($scope.allT4)
      {
       $scope.Central_T4 = false;
       $scope.Redfern = false;
       $scope.Wollicreek = false;
       $scope.Rockdale = false;
       $scope.Hurstville = false;
      }
      else{

      }
      station_selection();
     }

     // T5
     $scope.get_Parramatta = function (){
      $scope.Parramatta = !$scope.Parramatta;
      if($scope.Parramatta==true &&$scope.Westmead==true&&$scope.Blacktown==true&&$scope.Merrylands==true&&$scope.Liverpool_T5==true)
      {
       $scope.allT5 = true;
       $scope.Parramatta=false; $scope.Westmead=false; $scope.Blacktown=false; $scope.Merrylands=false; $scope.Liverpool_T5=false;
      }else if($scope.Parramatta==false || $scope.Westmead==false || $scope.Blacktown==false || $scope.Merrylands==false || $scope.Liverpool_T5==false){
       $scope.allT5 = false;
      }
      station_selection();
     }
     $scope.get_Westmead = function (){
      $scope.Westmead = !$scope.Westmead;
      if($scope.Parramatta==true &&$scope.Westmead==true&&$scope.Blacktown==true&&$scope.Merrylands==true&&$scope.Liverpool_T5==true)
      {
       $scope.allT5 = true;
       $scope.Parramatta=false; $scope.Westmead=false; $scope.Blacktown=false; $scope.Merrylands=false; $scope.Liverpool_T5=false;
      }else if($scope.Parramatta==false || $scope.Westmead==false || $scope.Blacktown==false || $scope.Merrylands==false || $scope.Liverpool_T5==false){
       $scope.allT5 = false;
      }
      station_selection();
     }
     $scope.get_Blacktown = function (){
      $scope.Blacktown = !$scope.Blacktown;
      if($scope.Parramatta==true &&$scope.Westmead==true&&$scope.Blacktown==true&&$scope.Merrylands==true&&$scope.Liverpool_T5==true)
      {
       $scope.allT5 = true;
       $scope.Parramatta=false; $scope.Westmead=false; $scope.Blacktown=false; $scope.Merrylands=false; $scope.Liverpool_T5=false;
      }else if($scope.Parramatta==false || $scope.Westmead==false || $scope.Blacktown==false || $scope.Merrylands==false || $scope.Liverpool_T5==false){
       $scope.allT5 = false;
      }
      station_selection();
     }
     $scope.get_Merrylands = function (){
      $scope.Merrylands = !$scope.Merrylands;
      if($scope.Parramatta==true &&$scope.Westmead==true&&$scope.Blacktown==true&&$scope.Merrylands==true&&$scope.Liverpool_T5==true)
      {
       $scope.allT5 = true;
       $scope.Parramatta=false; $scope.Westmead=false; $scope.Blacktown=false; $scope.Merrylands=false; $scope.Liverpool_T5=false;
      }else if($scope.Parramatta==false || $scope.Westmead==false || $scope.Blacktown==false || $scope.Merrylands==false || $scope.Liverpool_T5==false){
       $scope.allT5 = false;
      }
      station_selection();
     }
     $scope.get_Liverpool_T5 = function (){
      $scope.Liverpool_T5 = !$scope.Liverpool_T5;
      if($scope.Parramatta==true &&$scope.Westmead==true&&$scope.Blacktown==true&&$scope.Merrylands==true&&$scope.Liverpool_T5==true)
      {
       $scope.allT5 = true;
       $scope.Parramatta=false; $scope.Westmead=false; $scope.Blacktown=false; $scope.Merrylands=false; $scope.Liverpool_T5=false;
      }else if($scope.Parramatta==false || $scope.Westmead==false || $scope.Blacktown==false || $scope.Merrylands==false || $scope.Liverpool_T5==false){
       $scope.allT5 = false;
      }
      station_selection();
     }

     $scope.get_All_T5 = function(){
      $scope.allT5 = !$scope.allT5;
      if($scope.allT5)
      {
       $scope.Parramatta = false;
       $scope.Westmead = false;
       $scope.Blacktown = false;
       $scope.Merrylands = false;
       $scope.Liverpool_T5 = false;
      }
      else{

      }
      station_selection();
     }
     //T6
     $scope.get_Clyde = function (){
      $scope.Clyde = !$scope.Clyde;
      if($scope.Clyde==true &&$scope.Rosehill==true&&$scope.Camellia==true&&$scope.Carlingford==true)
      {
       $scope.allT6 = true;
       $scope.Clyde=false; $scope.Rosehill=false; $scope.Camellia=false; $scope.Carlingford=false;
      }else if($scope.Clyde==false || $scope.Rosehill==false || $scope.Camellia==false || $scope.Carlingford==false){
       $scope.allT6 = false;
      }
      station_selection();
     }
     $scope.get_Rosehill = function (){
      $scope.Rosehill = !$scope.Rosehill;
      if($scope.Clyde==true &&$scope.Rosehill==true&&$scope.Camellia==true&&$scope.Carlingford==true)
      {
       $scope.allT6 = true;
       $scope.Clyde=false; $scope.Rosehill=false; $scope.Camellia=false; $scope.Carlingford=false;
      }else if($scope.Clyde==false || $scope.Rosehill==false || $scope.Camellia==false || $scope.Carlingford==false){
       $scope.allT6 = false;
      }
      station_selection();
     }
     $scope.get_Camellia = function (){
      $scope.Camellia = !$scope.Camellia;
      if($scope.Clyde==true &&$scope.Rosehill==true&&$scope.Camellia==true&&$scope.Carlingford==true)
      {
       $scope.allT6 = true;
       $scope.Clyde=false; $scope.Rosehill=false; $scope.Camellia=false; $scope.Carlingford=false;
      }else if($scope.Clyde==false || $scope.Rosehill==false || $scope.Camellia==false || $scope.Carlingford==false){
       $scope.allT6 = false;
      }
      station_selection();
     }
     $scope.get_Carlingford = function (){
      $scope.Carlingford = !$scope.Carlingford;
      if($scope.Clyde==true &&$scope.Rosehill==true&&$scope.Camellia==true&&$scope.Carlingford==true)
      {
       $scope.allT6 = true;
       $scope.Clyde=false; $scope.Rosehill=false; $scope.Camellia=false; $scope.Carlingford=false;
      }else if($scope.Clyde==false || $scope.Rosehill==false || $scope.Camellia==false || $scope.Carlingford==false){
       $scope.allT6 = false;
      }
      station_selection();
     }
     $scope.get_All_T6 = function(){
      $scope.allT6 = !$scope.allT6;
      if($scope.allT6)
      {
       $scope.Clyde = false;
       $scope.Rosehill = false;
       $scope.Camellia = false;
       $scope.Carlingford = false;
      }
      else{

      }
      station_selection();
     }
     //T7
     $scope.get_Lidcome_T7 = function (){
      $scope.Lidcome_T7 = !$scope.Lidcome_T7;
      if($scope.Lidcome_T7==true &&$scope.Olympic_Park==true)
      {
       $scope.allT7 = true;
       $scope.Lidcome_T7=false; $scope.Olympic_Park=false;
      }else if($scope.Lidcome_T7==false || $scope.Olympic_Park==false){
       $scope.allT7 = false;
      }
      station_selection();
     }
     $scope.get_Olympic_Park = function (){
      $scope.Olympic_Park = !$scope.Olympic_Park;
      if($scope.Lidcome_T7==true &&$scope.Olympic_Park==true)
      {
       $scope.allT7 = true;
       $scope.Lidcome_T7=false; $scope.Olympic_Park=false;
      }else if($scope.Lidcome_T7==false || $scope.Olympic_Park==false){
       $scope.allT7 = false;
      }
      station_selection();
     }
     $scope.get_All_T7 = function(){
      $scope.allT7 = !$scope.allT7;
      if($scope.allT7)
      {
       $scope.Lidcome_T7 = false;
       $scope.Olympic_Park = false;
      }
      else{

      }
      station_selection();
     }
     function addStation (station,suburb) {
          this.station = station;
          this.suburb = suburb;
          }
     function station_selection(station){
      var station_key = [
      $scope.Chatswood,$scope.Hornsby,$scope.Epping,$scope.MQ_Uni,$scope.Rodes,$scope.allT1,
      $scope.Burwood,$scope.Straithfield,$scope.Greensquare,$scope.Mascot,$scope.Lidcome_T2,$scope.allT2,
      $scope.Central_T3,$scope.Sydenham,$scope.Campsie,$scope.Bankstown,$scope.Liverpool_T3,$scope.allT3,
      $scope.Central_T4,$scope.Redfern,$scope.Wollicreek,$scope.Rockdale,$scope.Hurstville,$scope.allT4,
      $scope.Parramatta,$scope.Westmead,$scope.Blacktown,$scope.Merrylands,$scope.Liverpool_T5,$scope.allT5,
      $scope.Clyde,$scope.Rosehill,$scope.Camellia,$scope.Carlingford,$scope.allT6,
      $scope.Lidcome_T7,$scope.Olympic_Park,$scope.allT7
      ];
     var station_value = ["Chatswood","Hornsby","Epping","MQ_Uni","Rodes","AllT1",
          "Burwood","Straithfield","Greensquare","Mascot","Lidcome_T2","AllT2",
          "Central_T3","Sydenham","Campsie","Bankstown","Liverpool_T3","AllT3",
          "Central_T4","Redfern","Wollicreek","Rockdale","Hurstville","AllT4",
          "Parramatta","Westmead","Blacktown","Merrylands","Liverpool_T5","AllT5",
          "Clyde","Rosehill","Camellia","Carlingford","AllT6",
          "Lidcome_T7","Olympic_Park","AllT7"];
    var station_suburb = ["Chatswood","Hornsby","Epping","MQ_Uni","Rodes","Chatswood Hornsby Epping MQ_Uni Rodes",
         "Burwood","Straithfield","Greensquare","Mascot","Lidcome_T2","Burwood Straithfield Greensquare Mascot Lidcome_T2",
         "Central_T3","Sydenham","Campsie","Bankstown","Liverpool_T3","Central_T3 Sydenham Campsie Bankstown Liverpool_T3",
         "Central_T4","Redfern","Wollicreek","Rockdale","Hurstville","Central_T4 Redfern Wollicreek Rockdale Hurstville",
         "Parramatta","Westmead","Blacktown","Merrylands","Liverpool_T5","Parramatta Westmead Blacktown Merrylands Liverpool_T5",
         "Clyde","Rosehill","Camellia","Carlingford","Clyde Rosehill Camellia Carlingford",
         "Lidcome_T7","Olympic_Park","Lidcome_T7 Olympic_Park"];
         for(var i=0;i<station_key.length;i++){
          if(station_key[i]){
            if(i>34){
             angular.element("."+station_value[i]).css({'background-color': '#999999'});
            }else if(i>=30){
             angular.element("."+station_value[i]).css({'background-color': '#336699'});
            }else if(i>=24){
             angular.element("."+station_value[i]).css({'background-color': '#cc00a1'});
            }else if(i>=18){
             angular.element("."+station_value[i]).css({'background-color': '#0073c7'});
            }else if(i>=12){
             angular.element("."+station_value[i]).css({'background-color': '#f47424'});
            }else if(i>=6){
             angular.element("."+station_value[i]).css({'background-color': '#26ae4e'});
            }else if(i>=0){
             angular.element("."+station_value[i]).css({'background-color': '#fcb514'});
            }
           }else{
            angular.element("."+station_value[i]).css({'background-color': '#4d555d'});
           }
          }
          for (var i = 0; i < station_key.length; i++) {
            if (station_key[i] ===true) {
              var add1 = new addStation(station_value[i],station_suburb[i]);
              $scope.people[$scope.people.length] = add1;
              $scope.people = uniqueStation($scope.people);
              $scope.multipleDemo.selectedPeopleWithGroupBy = $scope.people;
            }else {
              $scope.multipleDemo.selectedPeopleWithGroupBy = $scope.people;
              for (var j = 0; j <$scope.multipleDemo.selectedPeopleWithGroupBy.length; j++) {
                var index = station_suburb.indexOf($scope.multipleDemo.selectedPeopleWithGroupBy[j].suburb);
                if (station_key[index]===false && index>=0 ) {
                  $scope.multipleDemo.selectedPeopleWithGroupBy.splice(j, 1);
                }
              }
            }
          }
     }

     /*****************************************************************
         ********************share rental station filter*****************
         ****************************************************************/
     $scope._Chatswood=false;$scope._Hornsby=false;$scope._Epping=false;$scope._MQ_Uni=false;$scope._Rodes=false;$scope._allT1=false;
     $scope._Burwood=false;$scope._Straithfield=false;$scope._Greensquare=false;$scope._Mascot=false;$scope._Lidcome_T2=false;$scope._allT2=false;
     $scope._Central_T3=false;$scope._Sydenham=false;$scope._Campsie=false;$scope._Bankstown=false;$scope._Liverpool_T3=false;$scope._allT3=false;
     $scope._Central_T4=false;$scope._Redfern=false;$scope._Wollicreek=false;$scope._Rockdale=false;$scope._Hurstville=false;$scope._allT4=false;
     $scope._Parramatta=false;$scope._Westmead=false;$scope._Blacktown=false;$scope._Merrylands=false;$scope._Liverpool_T5=false;$scope._allT5=false;
      $scope._Clyde=false;$scope._Rosehill=false;$scope._Camellia=false;$scope._Carlingford=false;$scope._allT6=false;
     $scope._Lidcome_T7=false;$scope._Olympic_Park=false;$scope._allT7=false;
      // T1
     $scope._get_Chatswood = function (){
      $scope._Chatswood = !$scope._Chatswood;
      if($scope._Chatswood==true &&$scope._Hornsby==true&&$scope._Epping==true&&$scope._MQ_Uni==true&&$scope._Rodes==true)
      {
       $scope._allT1 = true;
       $scope._Chatswood=false ;$scope._Hornsby=false; $scope._Epping=false; $scope._MQ_Uni=false; $scope._Rodes=false;
      }else if($scope._Chatswood==false || $scope._Hornsby==false || $scope._Epping==false || $scope._MQ_Uni==false || $scope._Rodes==false){
       $scope._allT1 = false;
      }
      _station_selection();

     }

     $scope._get_Hornsby = function (){
      $scope._Hornsby = !$scope._Hornsby;
      if($scope._Chatswood==true &&$scope._Hornsby==true&&$scope._Epping==true&&$scope._MQ_Uni==true&&$scope._Rodes==true)
      {
       $scope._allT1 = true;
       $scope._Chatswood=false ;$scope._Hornsby=false; $scope._Epping=false; $scope._MQ_Uni=false; $scope._Rodes=false;
      }else if($scope._Chatswood==false || $scope._Hornsby==false || $scope._Epping==false || $scope._MQ_Uni==false || $scope._Rodes==false){
       $scope._allT1 = false;
      }
      _station_selection();
     }
     $scope._get_Epping = function (){
      $scope._Epping = !$scope._Epping;
      if($scope._Chatswood==true &&$scope._Hornsby==true&&$scope._Epping==true&&$scope._MQ_Uni==true&&$scope._Rodes==true)
      {
       $scope._allT1 = true;
       $scope._Chatswood=false ;$scope._Hornsby=false; $scope._Epping=false; $scope._MQ_Uni=false; $scope._Rodes=false;
      }else if($scope._Chatswood==false || $scope._Hornsby==false || $scope._Epping==false || $scope._MQ_Uni==false || $scope._Rodes==false){
       $scope._allT1 = false;
      }
      _station_selection();
     }
     $scope._get_MQ_Uni = function (){
      $scope._MQ_Uni = !$scope._MQ_Uni;
      if($scope._Chatswood==true &&$scope._Hornsby==true&&$scope._Epping==true&&$scope._MQ_Uni==true&&$scope._Rodes==true)
      {
       $scope._allT1 = true;
       $scope._Chatswood=false ;$scope._Hornsby=false; $scope._Epping=false; $scope._MQ_Uni=false; $scope._Rodes=false;
      }else if($scope._Chatswood==false || $scope._Hornsby==false || $scope._Epping==false || $scope._MQ_Uni==false || $scope._Rodes==false){
       $scope._allT1 = false;
      }
      _station_selection();
     }
     $scope._get_Rodes = function (){
      $scope._Rodes = !$scope._Rodes;
     if($scope._Chatswood==true &&$scope._Hornsby==true&&$scope._Epping==true&&$scope._MQ_Uni==true&&$scope._Rodes==true)
      {
       $scope._allT1 = true;
       $scope._Chatswood=false ;$scope._Hornsby=false; $scope._Epping=false; $scope._MQ_Uni=false; $scope._Rodes=false;
      }else if($scope._Chatswood==false || $scope._Hornsby==false || $scope._Epping==false || $scope._MQ_Uni==false || $scope._Rodes==false){
       $scope._allT1 = false;
      }
      _station_selection();
     }

     $scope._get_All_T1 = function(){
      $scope._allT1 = !$scope._allT1;

      if($scope._allT1)
      {
       $scope._Chatswood = false;
       $scope._Hornsby = false;
       $scope._Epping = false;
       $scope._MQ_Uni = false;
       $scope._Rodes = false;
      }
      else{

      }
      _station_selection();
     }

     // T2
     $scope._get_Burwood = function (){
      $scope._Burwood = !$scope._Burwood;
      if($scope._Burwood==true &&$scope._Straithfield==true&&$scope._Greensquare==true&&$scope._Mascot==true&&$scope._Lidcome_T2==true)
      {
       $scope._allT2 = true;
       $scope._Burwood=false; $scope._Straithfield=false; $scope._Greensquare=false; $scope._Mascot=false; $scope._Lidcome_T2=false;
      }else if($scope._Burwood==false || $scope._Straithfield==false || $scope._Greensquare==false || $scope._Mascot==false || $scope._Lidcome_T2==false){
       $scope._allT2 = false;
      }
      _station_selection();
     }
     $scope._get_Straithfield = function (){
      $scope._Straithfield = !$scope._Straithfield;
      if($scope._Burwood==true &&$scope._Straithfield==true&&$scope._Greensquare==true&&$scope._Mascot==true&&$scope._Lidcome_T2==true)
      {
       $scope._allT2 = true;
       $scope._Burwood=false; $scope._Straithfield=false; $scope._Greensquare=false; $scope._Mascot=false; $scope._Lidcome_T2=false;
      }else if($scope._Burwood==false || $scope._Straithfield==false || $scope._Greensquare==false || $scope._Mascot==false || $scope._Lidcome_T2==false){
       $scope._allT2 = false;
      }
      _station_selection();
     }
     $scope._get_Greensquare = function (){
      $scope._Greensquare = !$scope._Greensquare;
      if($scope._Burwood==true &&$scope._Straithfield==true&&$scope._Greensquare==true&&$scope._Mascot==true&&$scope._Lidcome_T2==true)
      {
       $scope._allT2 = true;
       $scope._Burwood=false; $scope._Straithfield=false; $scope._Greensquare=false; $scope._Mascot=false; $scope._Lidcome_T2=false;
      }else if($scope._Burwood==false || $scope._Straithfield==false || $scope._Greensquare==false || $scope._Mascot==false || $scope._Lidcome_T2==false){
       $scope._allT2 = false;
      }
      _station_selection();
     }
     $scope._get_Mascot = function (){
      $scope._Mascot = !$scope._Mascot;
      if($scope._Burwood==true &&$scope._Straithfield==true&&$scope._Greensquare==true&&$scope._Mascot==true&&$scope._Lidcome_T2==true)
      {
       $scope._allT2 = true;
       $scope._Burwood=false; $scope._Straithfield=false; $scope._Greensquare=false; $scope._Mascot=false; $scope._Lidcome_T2=false;
      }else if($scope._Burwood==false || $scope._Straithfield==false || $scope._Greensquare==false || $scope._Mascot==false || $scope._Lidcome_T2==false){
       $scope._allT2 = false;
      }
      _station_selection();
     }
     $scope._get_Lidcome_T2 = function (){
      $scope._Lidcome_T2 = !$scope._Lidcome_T2;
      if($scope._Burwood==true &&$scope._Straithfield==true&&$scope._Greensquare==true&&$scope._Mascot==true&&$scope._Lidcome_T2==true)
      {
       $scope._allT2 = true;
       $scope._Burwood=false; $scope._Straithfield=false; $scope._Greensquare=false; $scope._Mascot=false; $scope._Lidcome_T2=false;
      }else if($scope._Burwood==false || $scope._Straithfield==false || $scope._Greensquare==false || $scope._Mascot==false || $scope._Lidcome_T2==false){
       $scope._allT2 = false;
      }
      _station_selection();
     }

     $scope._get_All_T2 = function(){
      $scope._allT2 = !$scope._allT2;

      if($scope._allT2)
      {
       $scope._Burwood = false;
       $scope._Straithfield = false;
       $scope._Greensquare = false;
       $scope._Mascot = false;
       $scope._Lidcome_T2 = false;
      }
      else{

      }
      _station_selection();
     }

     // T3
     $scope._get_Central_T3 = function (){
      $scope._Central_T3 = !$scope._Central_T3;
      if($scope._Central_T3==true &&$scope._Sydenham==true&&$scope._Campsie==true&&$scope._Bankstown==true&&$scope._Liverpool_T3==true)
      {
       $scope._allT3 = true;
       $scope._Central_T3=false; $scope._Sydenham=false; $scope._Campsie=false; $scope._Bankstown=false; $scope._Liverpool_T3=false;
      }else if($scope._Central_T3==false || $scope._Sydenham==false || $scope._Campsie==false || $scope._Bankstown==false || $scope._Liverpool_T3==false){
       $scope._allT3 = false;
      }
      _station_selection();
     }
     $scope._get_Sydenham = function (){
      $scope._Sydenham = !$scope._Sydenham;
      if($scope._Central_T3==true &&$scope._Sydenham==true&&$scope._Campsie==true&&$scope._Bankstown==true&&$scope._Liverpool_T3==true)
      {
       $scope._allT3 = true;
       $scope._Central_T3=false; $scope._Sydenham=false; $scope._Campsie=false; $scope._Bankstown=false; $scope._Liverpool_T3=false;
      }else if($scope._Central_T3==false || $scope._Sydenham==false || $scope._Campsie==false || $scope._Bankstown==false || $scope._Liverpool_T3==false){
       $scope._allT3 = false;
      }
      _station_selection();
     }
     $scope._get_Campsie = function (){
      $scope._Campsie = !$scope._Campsie;
      if($scope._Central_T3==true &&$scope._Sydenham==true&&$scope._Campsie==true&&$scope._Bankstown==true&&$scope._Liverpool_T3==true)
      {
       $scope._allT3 = true;
       $scope._Central_T3=false; $scope._Sydenham=false; $scope._Campsie=false; $scope._Bankstown=false; $scope._Liverpool_T3=false;
      }else if($scope._Central_T3==false || $scope._Sydenham==false || $scope._Campsie==false || $scope._Bankstown==false || $scope._Liverpool_T3==false){
       $scope._allT3 = false;
      }
      _station_selection();
     }
     $scope._get_Bankstown = function (){
      $scope._Bankstown = !$scope._Bankstown;
      if($scope._Central_T3==true &&$scope._Sydenham==true&&$scope._Campsie==true&&$scope._Bankstown==true&&$scope._Liverpool_T3==true)
      {
       $scope._allT3 = true;
       $scope._Central_T3=false; $scope._Sydenham=false; $scope._Campsie=false; $scope._Bankstown=false; $scope._Liverpool_T3=false;
      }else if($scope._Central_T3==false || $scope._Sydenham==false || $scope._Campsie==false || $scope._Bankstown==false || $scope._Liverpool_T3==false){
       $scope._allT3 = false;
      }
      _station_selection();
     }
     $scope._get_Liverpool_T3 = function (){
      $scope._Liverpool_T3 = !$scope._Liverpool_T3;
      if($scope._Central_T3==true &&$scope._Sydenham==true&&$scope._Campsie==true&&$scope._Bankstown==true&&$scope._Liverpool_T3==true)
      {
       $scope._allT3 = true;
       $scope._Central_T3=false; $scope._Sydenham=false; $scope._Campsie=false; $scope._Bankstown=false; $scope._Liverpool_T3=false;
      }else if($scope._Central_T3==false || $scope._Sydenham==false || $scope._Campsie==false || $scope._Bankstown==false || $scope._Liverpool_T3==false){
       $scope._allT3 = false;
      }
      _station_selection();
     }

     $scope._get_All_T3 = function(){
      $scope._allT3 = !$scope._allT3;

      if($scope._allT3)
      {
       $scope._Central_T3 = false;
       $scope._Sydenham = false;
       $scope._Campsie = false;
       $scope._Bankstown = false;
       $scope._Liverpool_T3 = false;
      }
      else{

      }
      _station_selection();
     }

     // T4
     $scope._get_Central_T4 = function (){
      $scope._Central_T4 = !$scope._Central_T4;
      if($scope._Central_T4==true &&$scope._Redfern==true&&$scope._Wollicreek==true&&$scope._Rockdale==true&&$scope._Hurstville==true)
      {
       $scope._allT4 = true;
       $scope._Central_T4=false; $scope._Redfern=false; $scope._Wollicreek=false; $scope._Rockdale=false; $scope._Hurstville=false;
      }else if($scope._Central_T4==false || $scope._Redfern==false || $scope._Wollicreek==false || $scope._Rockdale==false || $scope._Hurstville==false){
       $scope._allT4 = false;
      }
      _station_selection();
     }
     $scope._get_Redfern = function (){
      $scope._Redfern = !$scope._Redfern;
       if($scope._Central_T4==true &&$scope._Redfern==true&&$scope._Wollicreek==true&&$scope._Rockdale==true&&$scope._Hurstville==true)
      {
       $scope._allT4 = true;
       $scope._Central_T4=false; $scope._Redfern=false; $scope._Wollicreek=false; $scope._Rockdale=false; $scope._Hurstville=false;
      }else if($scope._Central_T4==false || $scope._Redfern==false || $scope._Wollicreek==false || $scope._Rockdale==false || $scope._Hurstville==false){
       $scope._allT4 = false;
      }
      _station_selection();
     }
     $scope._get_Wollicreek = function (){
      $scope._Wollicreek = !$scope._Wollicreek;
       if($scope._Central_T4==true &&$scope._Redfern==true&&$scope._Wollicreek==true&&$scope._Rockdale==true&&$scope._Hurstville==true)
      {
       $scope._allT4 = true;
       $scope._Central_T4=false; $scope._Redfern=false; $scope._Wollicreek=false; $scope._Rockdale=false; $scope._Hurstville=false;
      }else if($scope._Central_T4==false || $scope._Redfern==false || $scope._Wollicreek==false || $scope._Rockdale==false || $scope._Hurstville==false){
       $scope._allT4 = false;
      }
      _station_selection();
     }
     $scope._get_Rockdale = function (){
      $scope._Rockdale = !$scope._Rockdale;
       if($scope._Central_T4==true &&$scope._Redfern==true&&$scope._Wollicreek==true&&$scope._Rockdale==true&&$scope._Hurstville==true)
      {
       $scope._allT4 = true;
       $scope._Central_T4=false; $scope._Redfern=false; $scope._Wollicreek=false; $scope._Rockdale=false; $scope._Hurstville=false;
      }else if($scope._Central_T4==false || $scope._Redfern==false || $scope._Wollicreek==false || $scope._Rockdale==false || $scope._Hurstville==false){
       $scope._allT4 = false;
      }
      _station_selection();
     }
     $scope._get_Hurstville = function (){
      $scope._Hurstville = !$scope._Hurstville;
       if($scope._Central_T4==true &&$scope._Redfern==true&&$scope._Wollicreek==true&&$scope._Rockdale==true&&$scope._Hurstville==true)
      {
       $scope._allT4 = true;
       $scope._Central_T4=false; $scope._Redfern=false; $scope._Wollicreek=false; $scope._Rockdale=false; $scope._Hurstville=false;
      }else if($scope._Central_T4==false || $scope._Redfern==false || $scope._Wollicreek==false || $scope._Rockdale==false || $scope._Hurstville==false){
       $scope._allT4 = false;
      }
      _station_selection();
     }

     $scope._get_All_T4 = function(){
      $scope._allT4 = !$scope._allT4;

      if($scope._allT4)
      {
       $scope._Central_T4 = false;
       $scope._Redfern = false;
       $scope._Wollicreek = false;
       $scope._Rockdale = false;
       $scope._Hurstville = false;
      }
      else{


      }
      _station_selection();
     }

     // T5
     $scope._get_Parramatta = function (){
      $scope._Parramatta = !$scope._Parramatta;
      if($scope._Parramatta==true &&$scope._Westmead==true&&$scope._Blacktown==true&&$scope._Merrylands==true&&$scope._Liverpool_T5==true)
      {
       $scope._allT5 = true;
       $scope._Parramatta=false; $scope._Westmead=false; $scope._Blacktown=false; $scope._Merrylands=false; $scope._Liverpool_T5=false;
      }else if($scope._Parramatta==false || $scope._Westmead==false || $scope._Blacktown==false || $scope._Merrylands==false || $scope._Liverpool_T5==false){
       $scope._allT5 = false;
      }
      _station_selection();
     }
     $scope._get_Westmead = function (){
      $scope._Westmead = !$scope._Westmead;
      if($scope._Parramatta==true &&$scope._Westmead==true&&$scope._Blacktown==true&&$scope._Merrylands==true&&$scope._Liverpool_T5==true)
      {
       $scope._allT5 = true;
       $scope._Parramatta=false; $scope._Westmead=false; $scope._Blacktown=false; $scope._Merrylands=false; $scope._Liverpool_T5=false;
      }else if($scope._Parramatta==false || $scope._Westmead==false || $scope._Blacktown==false || $scope._Merrylands==false || $scope._Liverpool_T5==false){
       $scope._allT5 = false;
      }
      _station_selection();
     }
     $scope._get_Blacktown = function (){
      $scope._Blacktown = !$scope._Blacktown;
      if($scope._Parramatta==true &&$scope._Westmead==true&&$scope._Blacktown==true&&$scope._Merrylands==true&&$scope._Liverpool_T5==true)
      {
       $scope._allT5 = true;
       $scope._Parramatta=false; $scope._Westmead=false; $scope._Blacktown=false; $scope._Merrylands=false; $scope._Liverpool_T5=false;
      }else if($scope._Parramatta==false || $scope._Westmead==false || $scope._Blacktown==false || $scope._Merrylands==false || $scope._Liverpool_T5==false){
       $scope._allT5 = false;
      }
      _station_selection();
     }
     $scope._get_Merrylands = function (){
      $scope._Merrylands = !$scope._Merrylands;
      if($scope._Parramatta==true &&$scope._Westmead==true&&$scope._Blacktown==true&&$scope._Merrylands==true&&$scope._Liverpool_T5==true)
      {
       $scope._allT5 = true;
       $scope._Parramatta=false; $scope._Westmead=false; $scope._Blacktown=false; $scope._Merrylands=false; $scope._Liverpool_T5=false;
      }else if($scope._Parramatta==false || $scope._Westmead==false || $scope._Blacktown==false || $scope._Merrylands==false || $scope._Liverpool_T5==false){
       $scope._allT5 = false;
      }
      _station_selection();
     }
     $scope._get_Liverpool_T5 = function (){
      $scope._Liverpool_T5 = !$scope._Liverpool_T5;
      if($scope._Parramatta==true &&$scope._Westmead==true&&$scope._Blacktown==true&&$scope._Merrylands==true&&$scope._Liverpool_T5==true)
      {
       $scope._allT5 = true;
       $scope._Parramatta=false; $scope._Westmead=false; $scope._Blacktown=false; $scope._Merrylands=false; $scope._Liverpool_T5=false;
      }else if($scope._Parramatta==false || $scope._Westmead==false || $scope._Blacktown==false || $scope._Merrylands==false || $scope._Liverpool_T5==false){
       $scope._allT5 = false;
      }
      _station_selection();
     }

     $scope._get_All_T5 = function(){
      $scope._allT5 = !$scope._allT5;
      if($scope._allT5)
      {
       $scope._Parramatta = false;
       $scope._Westmead = false;
       $scope._Blacktown = false;
       $scope._Merrylands = false;
       $scope._Liverpool_T5 = false;
      }
      else{

      }
      _station_selection();
     }
     //T6
     $scope._get_Clyde = function (){
      $scope._Clyde = !$scope._Clyde;
      if($scope._Clyde==true &&$scope._Rosehill==true&&$scope._Camellia==true&&$scope._Carlingford==true)
      {
       $scope._allT6 = true;
       $scope._Clyde=false; $scope._Rosehill=false; $scope._Camellia=false; $scope._Carlingford=false;
      }else if($scope._Clyde==false || $scope._Rosehill==false || $scope._Camellia==false || $scope._Carlingford==false){
       $scope._allT6 = false;
      }
      _station_selection();
     }
     $scope._get_Rosehill = function (){
      $scope._Rosehill = !$scope._Rosehill;
      if($scope._Clyde==true &&$scope._Rosehill==true&&$scope._Camellia==true&&$scope._Carlingford==true)
      {
       $scope._allT6 = true;
       $scope._Clyde=false; $scope._Rosehill=false; $scope._Camellia=false; $scope._Carlingford=false;
      }else if($scope._Clyde==false || $scope._Rosehill==false || $scope._Camellia==false || $scope._Carlingford==false){
       $scope._allT6 = false;
      }
      _station_selection();
     }
     $scope._get_Camellia = function (){
      $scope._Camellia = !$scope._Camellia;
      if($scope._Clyde==true &&$scope._Rosehill==true&&$scope._Camellia==true&&$scope._Carlingford==true)
      {
       $scope._allT6 = true;
       $scope._Clyde=false; $scope._Rosehill=false; $scope._Camellia=false; $scope._Carlingford=false;
      }else if($scope._Clyde==false || $scope._Rosehill==false || $scope._Camellia==false || $scope._Carlingford==false){
       $scope._allT6 = false;
      }
      _station_selection();
     }
     $scope._get_Carlingford = function (){
      $scope._Carlingford = !$scope._Carlingford;
      if($scope._Clyde==true &&$scope._Rosehill==true&&$scope._Camellia==true&&$scope._Carlingford==true)
      {
       $scope._allT6 = true;
       $scope._Clyde=false; $scope._Rosehill=false; $scope._Camellia=false; $scope._Carlingford=false;
      }else if($scope._Clyde==false || $scope._Rosehill==false || $scope._Camellia==false || $scope._Carlingford==false){
       $scope._allT6 = false;
      }
      _station_selection();
     }
     $scope._get_All_T6 = function(){
      $scope._allT6 = !$scope._allT6;
      if($scope._allT6)
      {
       $scope._Clyde = false;
       $scope._Rosehill = false;
       $scope._Camellia = false;
       $scope._Carlingford = false;
      }
      else{


      }
      _station_selection();
     }
     //T7
     $scope._get_Lidcome_T7 = function (){
      $scope._Lidcome_T7 = !$scope._Lidcome_T7;
      if($scope._Lidcome_T7==true &&$scope._Olympic_Park==true)
      {
       $scope._allT7 = true;
       $scope._Lidcome_T7=false; $scope._Olympic_Park=false;
      }else if($scope._Lidcome_T7==false || $scope._Olympic_Park==false){
       $scope._allT7 = false;
      }
      _station_selection();
     }
     $scope._get_Olympic_Park = function (){
      $scope._Olympic_Park = !$scope._Olympic_Park;
      if($scope._Lidcome_T7==true &&$scope._Olympic_Park==true)
      {
       $scope._allT7 = true;
       $scope._Lidcome_T7=false; $scope._Olympic_Park=false;
      }else if($scope._Lidcome_T7==false || $scope._Olympic_Park==false){
       $scope._allT7 = false;
      }
      _station_selection();
     }
     $scope._get_All_T7 = function(){
      $scope._allT7 = !$scope._allT7;
      if($scope.allT7)
      {
       $scope._Lidcome_T7 = false;
       $scope._Olympic_Park = false;
      }
      else{

      }
      _station_selection();
     }
     function _station_selection(){
      var _station_key = [
      $scope._Chatswood,$scope._Hornsby,$scope._Epping,$scope._MQ_Uni,$scope._Rodes,$scope._allT1,
      $scope._Burwood,$scope._Straithfield,$scope._Greensquare,$scope._Mascot,$scope._Lidcome_T2,$scope._allT2,
      $scope._Central_T3,$scope._Sydenham,$scope._Campsie,$scope._Bankstown,$scope._Liverpool_T3,$scope._allT3,
      $scope._Central_T4,$scope._Redfern,$scope._Wollicreek,$scope._Rockdale,$scope._Hurstville,$scope._allT4,
      $scope._Parramatta,$scope._Westmead,$scope._Blacktown,$scope._Merrylands,$scope._Liverpool_T5,$scope._allT5,
      $scope._Clyde,$scope._Rosehill,$scope._Camellia,$scope._Carlingford,$scope._allT6,
      $scope._Lidcome_T7,$scope._Olympic_Park,$scope._allT7
      ];
     var _station_value = ["_Chatswood","_Hornsby","_Epping","_MQ_Uni","_Rodes","_AllT1",
          "_Burwood","_Straithfield","_Greensquare","_Mascot","_Lidcome_T2","_AllT2",
          "_Central_T3","_Sydenham","_Campsie","_Bankstown","_Liverpool_T3","_AllT3",
          "_Central_T4","_Redfern","_Wollicreek","_Rockdale","_Hurstville","_AllT4",
          "_Parramatta","_Westmead","_Blacktown","_Merrylands","_Liverpool_T5","_AllT5",
          "_Clyde","_Rosehill","_Camellia","_Carlingford","_AllT6",
          "_Lidcome_T7","_Olympic_Park","_AllT7"];
      var _station_suburb = ["Chatswood","Hornsby","Epping","MQ_Uni","Rodes","Chatswood Hornsby Epping MQ_Uni Rodes",
           "Burwood","Straithfield","Greensquare","Mascot","Lidcome_T2","Burwood Straithfield Greensquare Mascot Lidcome_T2",
           "Central_T3","Sydenham","Campsie","Bankstown","Liverpool_T3","Central_T3 Sydenham Campsie Bankstown Liverpool_T3",
           "Central_T4","Redfern","Wollicreek","Rockdale","Hurstville","Central_T4 Redfern Wollicreek Rockdale Hurstville",
           "Parramatta","Westmead","Blacktown","Merrylands","Liverpool_T5","Parramatta Westmead Blacktown Merrylands Liverpool_T5",
           "Clyde","Rosehill","Camellia","Carlingford","Clyde Rosehill Camellia Carlingford",
           "Lidcome_T7","Olympic_Park","Lidcome_T7 Olympic_Park"];
     for(var i=0;i<_station_key.length;i++){
      if(_station_key[i]){
        if(i>34){
         angular.element("."+_station_value[i]).css({'background-color': '#999999'});
        }else if(i>=30){
         angular.element("."+_station_value[i]).css({'background-color': '#336699'});
        }else if(i>=24){
         angular.element("."+_station_value[i]).css({'background-color': '#cc00a1'});
        }else if(i>=18){
         angular.element("."+_station_value[i]).css({'background-color': '#0073c7'});
        }else if(i>=12){
         angular.element("."+_station_value[i]).css({'background-color': '#f47424'});
        }else if(i>=6){
         angular.element("."+_station_value[i]).css({'background-color': '#26ae4e'});
        }else if(i>=0){
         angular.element("."+_station_value[i]).css({'background-color': '#fcb514'});
        }

       }else{
        angular.element("."+_station_value[i]).css({'background-color': '#4d555d'});
       }
      }
      for (var i = 0; i < _station_key.length; i++) {
        if (_station_key[i] ===true) {
          var add1 = new addStation(_station_value[i],_station_suburb[i]);
          $scope._people[$scope._people.length] = add1;
          $scope._people = uniqueStation($scope._people);
          $scope._multipleDemo._selectedPeopleWithGroupBy = $scope._people;
        }else {
          $scope._multipleDemo._selectedPeopleWithGroupBy = $scope._people;
          for (var j = 0; j <$scope._multipleDemo._selectedPeopleWithGroupBy.length; j++) {
            var index = _station_suburb.indexOf($scope._multipleDemo._selectedPeopleWithGroupBy[j].suburb);
            if (_station_key[index]===false && index>=0 ) {
              $scope._multipleDemo._selectedPeopleWithGroupBy.splice(j, 1);
            }
          }
        }
      }
     }
     /****************************train filter ends*****************************/

/********************************************************************************
                                search ----share and entire search
********************************************************************************/
     $scope.include_area = true;
     $scope.include_area_share = true;
     $http.get('/customer/profile')
     .then(function(r) {
       console.log(r);
       if(r.data.customer_login_status){
         //search for the results of properties
           $scope.entireLocationSearch = function(theme) {
             if(theme !==null){
               $scope.include_area = false;
             }
             var regionArr = [];
             var result = [];
             var suburb = "";
             var region = "";
             var station = "";
            console.log($scope.multipleLocationDemo.selectedLocationWithGroupBy);
            //selected items which are an array
            for (var i = 0; i < $scope.multipleLocationDemo.selectedLocationWithGroupBy.length; i++) {
              suburb = $scope.multipleLocationDemo.selectedLocationWithGroupBy[i].suburb+","+suburb;
              regionArr[regionArr.length] = $scope.multipleLocationDemo.selectedLocationWithGroupBy[i].region;
            }
             regionArr.forEach(function(item) {
                  if(result.indexOf(item) < 0) {
                      result.push(item);
                  }
             });
             regionArr = result;
             for (var i = 0; i < regionArr.length; i++) {
                 region = regionArr[i] +","+ region;
             }
             entireData = {
              CID:r.data.CID,
              ER_Suburb: suburb,
              ER_Region: region,
              include_area:$scope.include_area,
              ER_Type: $scope.myPropertyType,
              ER_PriceMin: $scope.myMinPrice,
              ER_PriceMax: $scope.myMaxPrice,
              ER_BedRoomMin: $scope.minBedNum,
              ER_BedRoomMax: $scope.maxBedNum,
              ER_BathRoomMin: $scope.minBathNum,
              ER_BathRoomMax: $scope.maxBathNum,
              ER_ParkingMin: $scope.minParkingNum,
              ER_ParkingMax: $scope.maxParkingNum,
              ER_AreaMin: 0,
              ER_AreaMax: 50000,
              ER_AvailableDate: '2200-01-01',
              ER_Description: theme ||'',
              ER_Feature: ER_Feature
             };
            console.log(entireData);
            delete entireData.OrderBy;
            delete entireData.PageID;
            if (entireData.ER_Region === "") {
               entireData.ER_Description = entireData.ER_Description.slice(1,entireData.ER_Description.length-1);
            }else {
               entireData.ER_Suburb = suburb.slice(0,entireData.ER_Suburb.length-1);
               entireData.ER_Region = region.slice(0,entireData.ER_Region.length-1);
            }
              console.log(entireData);
            // getDataService.getDataRequests('/customer/filt/entire/count',entireData).then(function(result){
            //   console.log(result);
            //      $scope.data = result;
            //      console.log($scope.data);
            //      return result;
            //  },function(error){
            //    console.log("error" + error);
            //  })
            $http.post('/customer/filt/entire/count',entireData).then(function(result){
               console.log(result);
              //  result = Math.ceil(result/20);
               entireData.OrderBy = 'ER_AvailableDate';
               entireData.PageID = 0;
               console.log(entireData);
                $http.post('/customer/filt/entire/tenant', entireData)
                 .then(function(r) {
                  SearchService.set(r);
                  updateService.set(entireData);
                  console.log('r===>', r);
                   $state.go('app.listpage');
                 }, function(e) {

                 });
             },function(error){
               console.log("error" + error);
             });
           }
           /************************share search login status starts**************/

           /************share rooms data filter get starts**************/
          $scope.shareLocationSearch = function(theme){
            if(theme !==null){
              $scope.include_area = false;
            }
            var regionArr = [];
            var result = [];
            var suburb = "";
            var region = "";
            var station = "";
            //selected items which are an array
            for (var i = 0; i < $scope._multipleLocationDemo._selectedLocationWithGroupBy.length; i++) {
              suburb = $scope._multipleLocationDemo._selectedLocationWithGroupBy[i].suburb+","+suburb;
              regionArr[regionArr.length] = $scope._multipleLocationDemo._selectedLocationWithGroupBy[i].region;
            }
             regionArr.forEach(function(item) {
                  if(result.indexOf(item) < 0) {
                      result.push(item);
                  }
             });
             regionArr = result;
             for (var i = 0; i < regionArr.length; i++) {
                 region = regionArr[i]+ region;
             }
             shareData = {
              CID:r.data.CID,
              ER_Suburb: suburb,
              ER_Region: region,
              include_area:$scope.include_area_share,
              ER_Type: $scope.myPropertyType,
              SRName:'',
              SRPriceMin: $scope.myMinPrice_Share,
              SRPriceMax: $scope.myMaxPrice_Share,
              SRAreaMin: 0,
              SRAreaMax: 5000,
              SRAvailableDate: '2200-01-01',
              ER_Description: theme ||'',
              ER_Feature: ER_Feature
             };
             getDataService.getDataRequests('/customer/filt/share/count', shareData).then(function(result){
                 $scope.data = result;
                 console.log($scope.data);
                 return result;
             },function(error){
               console.log("error" + error);
             }).then(function(result){
               console.log(result);
               result = Math.ceil(result/20);
               shareData.OrderBy = 'SRAvailableDate';
               shareData.PageID = 0;
               console.log(shareData);

                $http.post('/customer/filt/share/tenant', shareData)
                 .then(function(r) {
                   if (shareData.ER_Region === "") {
                      shareData.ER_Description = shareData.ER_Description.slice(1,shareData.ER_Description.length-1);
                   }else {
                      shareData.ER_Suburb = suburb.slice(0,shareData.ER_Suburb.length-1);
                      shareData.ER_Region = region.slice(0,shareData.ER_Region.length-1);
                   }
                  SearchService.set(r);
                  updateService.set(shareData);
                  console.log('r===>', r);
                   $state.go('app.listpageShare');
                 }, function(e) {
                    console.log("error" + error);
                 });
             },function(error){
               console.log("error" + error);
             });
          }
          /************share rooms data filter get ends**************/

          /**********************entire property station search starts*************************************/
          $scope.entireStationSearch = function(theme) {
            var suburb = "";
            var region = "";
            var station = "";
            var arrsuburbs = [];
            console.log($scope.multipleDemo.selectedPeopleWithGroupBy);
            for (var i = 0; i < $scope.multipleDemo.selectedPeopleWithGroupBy.length; i++) {
              if ($scope.multipleDemo.selectedPeopleWithGroupBy[i].suburb.indexOf(" ")>=0) {
                arrsuburbs = $scope.multipleDemo.selectedPeopleWithGroupBy[i].suburb.split(" ");
                for (var j = 0; j < arrsuburbs.length; j++) {
                  suburb =  arrsuburbs[j] + "," + suburb;
                }
              }else {
                suburb = $scope.multipleDemo.selectedPeopleWithGroupBy[i].suburb + "," + suburb;
              }
            }
            station = suburb;
            entireData = {
             CID:r.data.CID,
             ER_Suburb: suburb,
             ER_Region: region,
            //  include_area:$scope.include_area,
             include_area: false,
             ER_Type: $scope.myPropertyType,
             ER_PriceMin: $scope.myMinPrice,
             ER_PriceMax: $scope.myMaxPrice,
             ER_BedRoomMin: $scope.minBedNum,
             ER_BedRoomMax: $scope.maxBedNum,
             ER_BathRoomMin: $scope.minBathNum,
             ER_BathRoomMax: $scope.maxBathNum,
             ER_ParkingMin: $scope.minParkingNum,
             ER_ParkingMax: $scope.maxParkingNum,
             ER_AreaMin: 0,
             ER_AreaMax: 50000,
             ER_AvailableDate: '2200-01-01',
             ER_Description: theme ||'',
             ER_Feature: ER_Feature
            };
           console.log(entireData);
           getDataService.getDataRequests('/customer/filt/entire/count',entireData).then(function(result){
                $scope.data = result;
                console.log($scope.data);
                return result;
            },function(error){
              console.log("error" + error);
            }).then(function(result){
              result = Math.ceil(result/20);
              entireData.OrderBy = 'ER_AvailableDate';
              entireData.PageID = 0;
              console.log(entireData);
               $http.post('/customer/filt/entire/tenant', entireData)
                .then(function(r) {
                  /****************************************************
                  station search region will be empty string,
                  so here put suburb,description--station, region--NSW together
                  **************************************************/
                  if (entireData.ER_Region === "") {
                     entireData.ER_Description = suburb.slice(0,entireData.ER_Suburb.length-1)+" "+ entireData.ER_Description.slice(1,entireData.ER_Description.length-1)+", NSW";
                  }else {
                     entireData.ER_Suburb = suburb.slice(0,entireData.ER_Suburb.length-1);
                     entireData.ER_Region = region.slice(0,entireData.ER_Region.length-1);
                  }
                 SearchService.set(r);
                 updateService.set(entireData);
                 console.log('r===>', r);
                  $state.go('app.listpage');
                }, function(e) {

                });
            },function(error){
              console.log("error" + error);
            });
          }
          /****************share station search with login starts***************************/
          $scope.shareStationSearch = function(theme){
            var suburb = "";
            var region = "";
            var station = "";
            var arrsuburbs = [];
            console.log($scope._multipleDemo._selectedPeopleWithGroupBy);
            for (var i = 0; i < $scope._multipleDemo._selectedPeopleWithGroupBy.length; i++) {
              if ($scope._multipleDemo._selectedPeopleWithGroupBy[i].suburb.indexOf(" ")>=0) {
                arrsuburbs = $scope._multipleDemo._selectedPeopleWithGroupBy[i].suburb.split(" ");
                for (var j = 0; j < arrsuburbs.length; j++) {
                  suburb = arrsuburbs[j] + "," + suburb;
                }
              }else {
                suburb = $scope._multipleDemo._selectedPeopleWithGroupBy[i].suburb + "," + suburb;
              }
            }
             station = suburb;
             shareData = {
              CID:r.data.CID,
              ER_Suburb: suburb,
              ER_Region:region,
              // include_area:$scope.include_area_share,
              include_area: false,
              ER_Type: $scope.myPropertyType,
              SRName:'',
              SRPriceMin: $scope.myMinPrice_Share,
              SRPriceMax: $scope.myMaxPrice_Share,
              SRAreaMin: 0,
              SRAreaMax: 5000,
              SRAvailableDate: '2200-01-01',
              ER_Description: theme||'',
              ER_Feature: ER_Feature
             };
             getDataService.getDataRequests('/customer/filt/share/count', shareData).then(function(result){
                 $scope.data = result;
                 console.log($scope.data);
                 return result;
             },function(error){
               console.log("error" + error);
             }).then(function(result){
               result = Math.ceil(result/20);
               shareData.OrderBy = 'SRAvailableDate';
               shareData.PageID = 0;
               console.log(shareData);
                $http.post('/customer/filt/share/tenant', shareData)
                 .then(function(r) {
                   /****************************************************
                   station search region will be empty string,
                   so here put suburb,description--station, region--NSW together
                   **************************************************/
                   if (shareData.ER_Region === "") {
                      shareData.ER_Description = suburb.slice(0,shareData.ER_Suburb.length-1)+" "+ shareData.ER_Description.slice(1,shareData.ER_Description.length-1)+", NSW";
                   }else {
                      shareData.ER_Suburb = suburb.slice(0,shareData.ER_Suburb.length-1);
                      shareData.ER_Region = region.slice(0,shareData.ER_Region.length-1);
                   }
                  SearchService.set(r);
                  updateService.set(shareData);
                  console.log('r===>', r);
                   $state.go('app.listpageShare');
                 }, function(e) {

                 });
             },function(error){
               console.log("error" + error);
             });
          }
          /*****************share station search with login ends*************************/
          /**********************entire property station search ends*************************************/

        }else {
            //search for the results of properties
            $scope.entireLocationSearch = function(theme) {
            if(theme !==null){
              $scope.include_area = false;
            }
            var regionArr = [];
            var result = [];
            var suburb = "";
            var region = "";
            var station = "";
             console.log($scope.multipleLocationDemo.selectedLocationWithGroupBy);
             //selected items which are an array
             for (var i = 0; i < $scope.multipleLocationDemo.selectedLocationWithGroupBy.length; i++) {
               suburb = $scope.multipleLocationDemo.selectedLocationWithGroupBy[i].suburb+","+suburb;
               regionArr[regionArr.length] = $scope.multipleLocationDemo.selectedLocationWithGroupBy[i].region;
             }
              regionArr.forEach(function(item) {
                   if(result.indexOf(item) < 0) {
                       result.push(item);
                   }
              });
              regionArr = result;
              for (var i = 0; i < regionArr.length; i++) {
                  region = regionArr[i]+","+region;
              }
              entireData = {
               ER_Suburb: suburb,
               ER_Region: region,
               include_area:$scope.include_area,
               ER_Type: $scope.myPropertyType,
               ER_PriceMin: $scope.myMinPrice,
               ER_PriceMax: $scope.myMaxPrice,
               ER_BedRoomMin: $scope.minBedNum,
               ER_BedRoomMax: $scope.maxBedNum,
               ER_BathRoomMin: $scope.minBathNum,
               ER_BathRoomMax: $scope.maxBathNum,
               ER_ParkingMin: $scope.minParkingNum,
               ER_ParkingMax: $scope.maxParkingNum,
               ER_AreaMin: 0,
               ER_AreaMax: 50000,
               ER_AvailableDate: '2200-01-01',
               ER_Description: theme ||'',
               ER_Feature: ER_Feature
              };
             console.log(entireData);
             if (entireData.ER_Region === "") {
                entireData.ER_Description = entireData.ER_Description.slice(1,entireData.ER_Description.length-1);
             }else {
                entireData.ER_Suburb = suburb.slice(0,entireData.ER_Suburb.length-1);
                entireData.ER_Region = region.slice(0,entireData.ER_Region.length-1);
             }
             console.log(entireData);

             getDataService.getDataRequests('/customer/filt/entire/count',entireData).then(function(result){
                  $scope.data = result;
                  console.log($scope.data);
                  return result;
              },function(error){
                console.log("error" + error);
              }).then(function(result){
                var _entireData = {};
                _entireData = entireData;
                result = Math.ceil(result/20);
                _entireData.OrderBy = 'ER_AvailableDate';
                _entireData.PageID = 0;
                 console.log(entireData);
                 $http.post('/customer/filt/entire', _entireData)
                  .then(function(r) {
                   SearchService.set(r);
                   updateService.set(_entireData);
                   console.log('r===>', r);
                    $state.go('app.listpage');
                  }, function(e) {

                  });
              },function(error){
                console.log("error" + error);
              });

            }
            /****************entire search without login ends******************************/

            /***************share rooms search without login starts************************/
            $scope.shareLocationSearch = function(theme){
              if(theme !==null){
                $scope.include_area_share = false;
              }
              var regionArr = [];
              var result = [];
              var suburb = "";
              var region = "";
              var station = "";
              //selected items which are an array
              for (var i = 0; i < $scope._multipleLocationDemo._selectedLocationWithGroupBy.length; i++) {
                suburb = $scope._multipleLocationDemo._selectedLocationWithGroupBy[i].suburb+","+suburb;
                regionArr[regionArr.length] = $scope._multipleLocationDemo._selectedLocationWithGroupBy[i].region;
              }
               regionArr.forEach(function(item) {
                    if(result.indexOf(item) < 0) {
                        result.push(item);
                    }
               });
               regionArr = result;
               for (var i = 0; i < regionArr.length; i++) {
                   region = regionArr[i] +","+ region;
               }
               shareData = {
                ER_Suburb: suburb,
                ER_Region: region,
                include_area:$scope.include_area_share,
                ER_Type: $scope.myPropertyType,
                SRPriceMin: $scope.myMinPrice_Share,
                SRPriceMax: $scope.myMaxPrice_Share,
                SRName:'',
                SRAreaMin: 0,
                SRAreaMax: 50000,
                SRAvailableDate: '2200-01-01',
                ER_Description: theme||'',
                ER_Feature: ER_Feature
               };
              console.log(shareData);
              if (shareData.ER_Region === "") {
                 shareData.ER_Description = shareData.ER_Description.slice(1,shareData.ER_Description.length-1);
              }else {
                 shareData.ER_Suburb = suburb.slice(0,shareData.ER_Suburb.length-1);
                 shareData.ER_Region = region.slice(0,shareData.ER_Region.length-1);
              }
              getDataService.getDataRequests('/customer/filt/share/count',shareData).then(function(result){
                   $scope.data = result;
                   console.log($scope.data);
                   return result;
               },function(error){
                 console.log("error" + error);
               }).then(function(result){
                 result = Math.ceil(result/20);
                 shareData.OrderBy = 'SRAvailableDate';
                 shareData.PageID = 0;
                 console.log(shareData);

                  $http.post('/customer/filt/share', shareData)
                   .then(function(r) {

                    SearchService.set(r);
                    updateService.set(shareData);
                    console.log('r===>', r);
                     $state.go('app.listpageShare');
                   }, function(e) {

                   });
               },function(error){
                 console.log("error" + error);
               });
            }
            /**************************share rooms data filter get ends**************************/

            /*******************entire station search without login starts***********************/
            //search for the results of properties
              $scope.entireStationSearch = function(theme) {
                var suburb = "";
                var region = "";
                var station = "";
                var arrsuburbs = [];
                console.log($scope.multipleDemo.selectedPeopleWithGroupBy);
                for (var i = 0; i < $scope.multipleDemo.selectedPeopleWithGroupBy.length; i++) {
                  if ($scope.multipleDemo.selectedPeopleWithGroupBy[i].suburb.indexOf(" ")>=0) {
                    arrsuburbs = $scope.multipleDemo.selectedPeopleWithGroupBy[i].suburb.split(" ");
                    for (var j = 0; j < arrsuburbs.length; j++) {
                      suburb =  arrsuburbs[j] + "," + suburb;
                    }
                  }else {
                    suburb =  $scope.multipleDemo.selectedPeopleWithGroupBy[i].suburb + "," + suburb;
                  }
                }
                station = suburb;
                entireData = {
                 ER_Suburb: suburb,
                 ER_Region: region,
                //  include_area:$scope.include_area,
                 include_area:false, //station search 的时候不检查周边suburb
                 ER_Type: $scope.myPropertyType,
                 ER_PriceMin: $scope.myMinPrice,
                 ER_PriceMax: $scope.myMaxPrice,
                 ER_BedRoomMin: $scope.minBedNum,
                 ER_BedRoomMax: $scope.maxBedNum,
                 ER_BathRoomMin: $scope.minBathNum,
                 ER_BathRoomMax: $scope.maxBathNum,
                 ER_ParkingMin: $scope.minParkingNum,
                 ER_ParkingMax: $scope.maxParkingNum,
                 ER_AreaMin: 0,
                 ER_AreaMax: 50000,
                 ER_AvailableDate: '2200-01-01',
                 ER_Description: theme||'',
                 ER_Feature: ER_Feature
                };
               console.log(entireData);
               getDataService.getDataRequests('/customer/filt/entire/count',entireData).then(function(result){
                    $scope.data = result;
                    console.log($scope.data);
                    return result;
                },function(error){
                  console.log("error" + error);
                }).then(function(result){
                  var _entireData = {};
                  _entireData = entireData;
                  result = Math.ceil(result/20);
                  _entireData.OrderBy = 'ER_AvailableDate';
                  _entireData.PageID = 0;
                  console.log(entireData);

                   $http.post('/customer/filt/entire', _entireData)
                    .then(function(r) {
                      /****************************************************
                      station search region will be empty string,
                      so here put suburb,description--station, region--NSW together
                      **************************************************/
                      if (entireData.ER_Region === "") {
                         entireData.ER_Description = suburb.slice(0,entireData.ER_Suburb.length-1)+" "+ entireData.ER_Description.slice(1,entireData.ER_Description.length-1)+", NSW";
                      }else {
                         entireData.ER_Suburb = suburb.slice(0,entireData.ER_Suburb.length-1);
                         entireData.ER_Region = region.slice(0,entireData.ER_Region.length-1);
                      }
                     SearchService.set(r);
                     updateService.set(_entireData);
                     console.log('r===>', r);
                      $state.go('app.listpage');
                    }, function(e) {

                    });
                },function(error){
                  console.log("error" + error);
                });
              }
            /*******************entire room station search without login ends*************************/

            /*********************share room station search without login start************************/
            $scope.shareStationSearch = function(theme){
              var suburb = "";
              var region = "";
              var station = "";
              var arrsuburbs = [];
              console.log($scope._multipleDemo._selectedPeopleWithGroupBy);
              for (var i = 0; i < $scope._multipleDemo._selectedPeopleWithGroupBy.length; i++) {
                if ($scope._multipleDemo._selectedPeopleWithGroupBy[i].suburb.indexOf(" ")>=0) {
                  arrsuburbs = $scope._multipleDemo._selectedPeopleWithGroupBy[i].suburb.split(" ");
                  for (var j = 0; j < arrsuburbs.length; j++) {
                    suburb = arrsuburbs[j] + "," + suburb;
                  }
                }else {
                  suburb = $scope._multipleDemo._selectedPeopleWithGroupBy[i].suburb + "," + suburb;
                }
              }
              station = suburb;
               shareData = {
                ER_Suburb: suburb,
                ER_Region: region,
                // include_area:$scope.include_area_share,
                include_area:false, //station search 的时候不检查周边suburb
                ER_Type: $scope.myPropertyType,
                SRPriceMin: $scope.myMinPrice_Share,
                SRPriceMax: $scope.myMaxPrice_Share,
                SRName:'',
                SRAreaMin: 0,
                SRAreaMax: 50000,
                SRAvailableDate: '2200-01-01',
                ER_Description: theme||'',
                ER_Feature: ER_Feature
               };
              console.log(shareData);
              getDataService.getDataRequests('/customer/filt/share/count',shareData).then(function(result){
                   $scope.data = result;
                   console.log($scope.data);
                   return result;
               },function(error){
                 console.log("error" + error);
               }).then(function(result){
                 result = Math.ceil(result/20);
                 shareData.OrderBy = 'SRAvailableDate';
                 shareData.PageID = 0;
                 console.log(shareData);
                  $http.post('/customer/filt/share', shareData)
                   .then(function(r) {
                     /****************************************************
                     station search region will be empty string,
                     so here put suburb,description--station, region--NSW together
                     **************************************************/
                     if (shareData.ER_Region === "") {
                        shareData.ER_Description = suburb.slice(0,shareData.ER_Suburb.length-1)+" "+ shareData.ER_Description.slice(1,shareData.ER_Description.length-1)+", NSW";
                     }else {
                        shareData.ER_Suburb = suburb.slice(0,shareData.ER_Suburb.length-1);
                        shareData.ER_Region = region.slice(0,shareData.ER_Region.length-1);
                     }
                    SearchService.set(r);
                    updateService.set(shareData);
                    console.log('r===>', r);
                     $state.go('app.listpageShare');
                   }, function(e) {

                   });
               },function(error){
                 console.log("error" + error);
               });
            }
            /**********************share room station search without login ends***********************/
        }
      });

    }
   ])
	/*.animation('.fold-animation', ['$animateCss', function($animateCss) {
	  return {
	    enter: function(element, doneFn) {
	      var left = element[0].offsetLeft;
	      return $animateCss(element, {
	        from: { height:'0px' },
	        to: { height:left + 'px' },
	        duration: 1
	      });
	    }
	  }
	}])*/
