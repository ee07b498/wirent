/**
 * @Date:   2017-06-30T10:20:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-17T21:43:12+10:00
 */
app.controller('MailCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.msg_direct = {};
  $scope.msg_received = {};
  $scope.msg_received.StaffID = 1;
  $scope.msg_received.msg_direct_comment = '% to %';
  $http.post('/staff/msg_received',$scope.msg_received)
      .then(function(response) {
        console.log("response", response);
      }, function(x) {
        console.log('Server Error');
      });

  $http.get('/staff/msg_direct_check')
      .then(function(response) {
        console.log("response", response);
        $scope.msg_direct = response.data;
      }, function(x) {
        console.log('Server Error');
      });
      $scope.folds = [
        {name: 'Inbox', filter:''},
        {name: 'Staff to Staff', filter:'starred'},
        {name: 'Customer to Staff', filter:'sent'},
        {name: 'Landlord to Staff', filter:'important'},
        {name: 'Thirdparty to Staff', filter:'draft'},
        {name: 'Staff to Customer', filter:'trash'},
        {name: 'Staff to Landlord', filter:'trash'},
        {name: 'Staff to Thirdparty', filter:'trash'}
      ];
      /*angular.forEach($scope.msg_direct, function(value, key) {
        for (var i = 0; i < array.length; i++) {
          array[i]
        }

      });*/


  $scope.labels = [
    {name: 'Angular', filter:'angular', color:'#23b7e5'},
    {name: 'Bootstrap', filter:'bootstrap', color:'#7266ba'},
    {name: 'Client', filter:'client', color:'#fad733'},
    {name: 'Work', filter:'work', color:'#27c24c'}
  ];

  $scope.addLabel = function(){
    $scope.labels.push(
      {
        name: $scope.newLabel.name,
        filter: angular.lowercase($scope.newLabel.name),
        color: '#ccc'
      }
    );
    $scope.newLabel.name = '';
  }

  $scope.labelClass = function(label) {
    return {
      'b-l-info': angular.lowercase(label) === 'angular',
      'b-l-primary': angular.lowercase(label) === 'bootstrap',
      'b-l-warning': angular.lowercase(label) === 'client',
      'b-l-success': angular.lowercase(label) === 'work'
    };
  };

}]);

app.controller('MailListCtrl', ['$scope', 'mails', '$stateParams', function($scope, mails, $stateParams) {
  $scope.fold = $stateParams.fold;
  mails.all().then(function(mails){
    $scope.mails = mails;
  });
}]);

app.controller('MailDetailCtrl', ['$scope', 'mails', '$stateParams', function($scope, mails, $stateParams) {
  mails.get($stateParams.mailId).then(function(mail){
    $scope.mail = mail;
  })
}]);

app.controller('MailNewCtrl', ['$scope', 'mails','$http','$state',function($scope,mails,$http,$state) {
/*  $scope.mail = {
    to: '',
    subject: '',
    content: ''
  }*/
  $scope.Customers = {};
  $scope.mail = {
    StaffID:1,
    IdReceiver:'',
    to: '',
    title: '',
    content: '',
    msg_direct_comment:''
  }
  /*$scope.tolist = [
    {name: 'James', email:'james@gmail.com'},
    {name: 'Luoris Kiso', email:'luoris.kiso@hotmail.com'},
    {name: 'Lucy Yokes', email:'lucy.yokes@gmail.com'}
  ];*/
  $scope.tolist = [];
  $http.post('/staff/admin_customer_check', {
      'inputStr': ''
    }).then(function(response) {
      angular.forEach(response.data, function(value, key) {
        tolist.push({
          name: value.CName,
          email: value.CEmail
        });
        return tolist;
      });

    }, function(x) {
      console.log('Server Error');
    });
  console.log($scope.tolist);

  $scope.Send = function(){
    $state.go('app.mail.list');
    /*$http.post('/staff/msg_write',$scope.mail)
        .then(function(response) {
          console.log("response", response);
        }, function(x) {
          console.log('Server Error');
        });*/
  }

}]);

angular.module('app').directive('labelColor', function(){
  return function(scope, $el, attrs){
    $el.css({'color': attrs.color});
  }
});
