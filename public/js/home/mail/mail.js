/**
 * @Date:   2017-06-30T10:20:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-09-06T15:56:33+10:00
 */
var app = angular.module('andy');
app.controller('MailCtrl', ['$scope', '$http', '$state', 'mails', '$localStorage', 'getDataCommonService', function($scope, $http, $state, mails, $localStorage, getDataCommonService) {
  var vm = this;
  vm.msg_direct = {};
  vm.msg_received = {};
  vm.msg_received.StaffID = 3;
  vm.msg_received.msg_direct_comment = '% to Staff';

  vm.getMessages = function() {
    mails.getMessages()
      .then(function(messages) {
          vm.tolist = messages;
          console.log(messages);
        },
        function(data) {
          console.log('albums retrieval failed.')
        });
  }
  vm.getMessages();

  $http.post('/staff/msg_received', vm.msg_received)
    .then(function(response) {
      console.log("response", response);
      getDataCommonService.set(response.data, 'messages');
    }, function(x) {
      console.log('Server Error');
    });

  $http.get('/staff/msg_direct_check')
    .then(function(response) {
      console.log("response", response);
      vm.msg_direct = response.data;
    }, function(x) {
      console.log('Server Error');
    });
  vm.folds = [{
    name: 'Inbox',
    filter: ''
  }];
  $scope.labelClass = function(label) {
    return {
      'active': !~label
    };
  };
  //已发邮件
  $scope.trace_desc = {};
  $scope.trace_desc.IdSender = 3;
  $scope.trace_desc.IdReceiver = -1;
  $scope.trace_desc.msg_direct_comment = '% to %';
  $http.post('/staff/msg_trace', $scope.trace_desc)
    .then(function(response) {
      console.log("response", response);
    }, function(x) {
      console.log('Server Error');
    });


  vm.compose = function() {
    vm.getCustomers = function() {
      mails.getCustomers()
        .then(function(customers) {
            console.log('albums returned to controller.', customers);
            getDataCommonService.set(customers, 'customer');
            $state.go("app.mail.compose");
          },
          function(data) {
            console.log('albums retrieval failed.');
          });
    }
    vm.getCustomers();
  };

}]);

app.controller('MailListCtrl', ['$scope', '$http', 'mails', '$stateParams', '$localStorage', 'getDataCommonService', function($scope, $http, mails, $stateParams, $localStorage, getDataCommonService) {
  /***********pagination starts********************/
  $scope.maxSize = 5;
  // $scope.totalItems = $scope.customers.length;
  $scope.currentPage = 1;
  $scope.itemsPerPage = 7;
  /***********pagination ends********************/
  $scope.fold = $stateParams.fold;
  console.log(typeof $scope.fold);
  //landlord 检查未读邮件
  $http.post('/landlord/profile', {
      'LLEmail': $localStorage.landlord
    })
    .then(function(r) {
      console.log(r);
      if (r.data.landlord_login_status == 1) {
        $scope.landlordInfo = r.data;
        $scope.msg_received = {};
        $scope.msg_received.LLID = $scope.landlordInfo.LLID;
        $scope.msg_received.msg_direct_comment = '% to Landlord';
        console.log($scope.msg_received);
        $http.post('/landlord/received', $scope.msg_received)
          .then(function(response) {
            console.log("response", response);
            $scope.mails = response.data;
            $scope.totalItems = $scope.mails.length;
          }, function(x) {
            console.log('Server Error');
          });
      }
    });

}]);

app.controller('MailDetailCtrl', ['$scope', '$http', '$state', 'mails', '$stateParams', function($scope, $http, $state, mails, $stateParams) {
  $scope.fold = $stateParams.foldId;
  $scope.contents = "";
  $http.post('/landlord/profile', {
      'LLEmail': $localStorage.landlord
    })
    .then(function(r) {
      console.log(r);
      if (r.data.landlord_login_status == 1) {
        $scope.landlordInfo = r.data;
        $scope.msg_received = {};
        $scope.msg_received.LLID = $scope.landlordInfo.LLID;
        $scope.msg_received.msg_direct_comment = '% to Landlord';
        console.log($scope.msg_received);
        $http.post('/landlord/received', $scope.msg_received)
          .then(function(response) {
            console.log("response", response);
            $scope.mails = response.data;
            $scope.totalItems = $scope.mails.length;
            angular.forEach($scope.mails, function(value, key) {
              if (value.idMsg_sr == $stateParams.mailId) {
                $scope.mail = value;
                $scope.mail.from = 'Staff';
                //******标记信息已读******//
                $http.post('/landlord/confirm', {
                    'idMsg_sr': value.idMsg_sr
                  })
                  .then(function(response) {
                    console.log("response", response);
                  }, function(x) {
                    console.log('Server Error');
                  });
              }
            });
          }, function(x) {
            console.log('Server Error');
          });
      }
    });

  $scope.Send = function() {
    $http.post('/landlord/profile', {
        'LLEmail': $localStorage.landlord
      })
      .then(function(r) {
        console.log(r);
        if (r.data.landlord_login_status == 1) {
          $scope.landlordInfo = r.data;
          $scope.Reply = {};
          $scope.Reply.title = $scope.mail.title;
          $scope.Reply.content = $scope.contents;
          $scope.Reply.LLID = $scope.landlordInfo.LLID;
          $scope.Reply.IdReceiver = $scope.mail.idSender;
          $scope.Reply.msg_direct_comment = $scope.msg_received.msg_direct_comment;
          console.log($scope.Reply);
          $http.post('/landlord/write', $scope.Reply)
            .then(function(response) {
              console.log("response", response);
              $state.go("app.mail.list");
            }, function(x) {
              console.log('Server Error');
            });
        }
      });
  }
}]);

app.controller('MailNewCtrl', ['$scope', 'mails', '$http', '$state', '$localStorage', 'getDataCommonService', function($scope, mails, $http, $state, $localStorage, getDataCommonService) {
  var vm = this;
  vm.mail = {
    StaffID: 1,
    IdReceiver: '',
    to: '',
    title: '',
    content: '',
    msg_direct_comment: ''
  }
  vm.tolist = [{
      name: 'James',
      email: 'james@gmail.com'
    },
    {
      name: 'Luoris Kiso',
      email: 'luoris.kiso@hotmail.com'
    },
    {
      name: 'Lucy Yokes',
      email: 'lucy.yokes@gmail.com'
    }
  ];
  console.log(vm.tolist);
  /*if (JSON.stringify(getDataCommonService.get()) !== "{}") {
    $localStorage.tolist = getDataCommonService.get().data;
    vm.tolist = $localStorage.tolist;
  } else {
    vm.tolist = $localStorage.tolist;
  }*/

  vm.Send = function() {

    $http.post('/landlord/profile', {
        'LLEmail': $localStorage.landlord
      })
      .then(function(r) {
        console.log(r);
        if (r.data.landlord_login_status == 1) {
          $scope.landlordInfo = r.data;
          vm.writeData = {};
          vm.writeData.title = vm.mail.title;
          vm.writeData.content = vm.mail.content;
          vm.writeData.LLID = $scope.landlordInfo.LLID;
          vm.writeData.IdReceiver = 3;
          vm.writeData.msg_direct_comment = 'Landlord to Staff';
          console.log(vm.writeData);
          $http.post('/landlord/write', vm.writeData)
            .then(function(response) {
              console.log("response", response);
              $state.go("landlord.mail.list");
            }, function(x) {
              console.log('Server Error');
            });
        }
      });
    // $state.go('landlord.mail.list');
  }

}]);

angular.module('andy').directive('labelColor', function() {
  return function(scope, $el, attrs) {
    $el.css({
      'color': attrs.color
    });
  }
});
