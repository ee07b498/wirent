/**
 * @Date:   2017-06-30T10:20:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-09-01T16:34:42+10:00
 */
app.controller('MailCtrl', ['$scope', '$http', '$state', 'mails', 'getDataCommonService', function($scope, $http, $state, mails, getDataCommonService) {
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
    },
    {
        name: 'Sent',
        filter: '0'
      },
    {
      name: 'Staff to Staff',
      filter: '1'
    },
    {
      name: 'Customer to Staff',
      filter: '2'
    },
    {
      name: 'Landlord to Staff',
      filter: '3'
    },
    {
      name: 'Thirdparty to Staff',
      filter: '4'
    },
    {
      name: 'Staff to Customer',
      filter: '5'
    },
    {
      name: 'Staff to Landlord',
      filter: '6'
    },
    {
      name: 'Staff to Thirdparty',
      filter: '7'
    }
  ];
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
  $scope.fold = $stateParams.fold;
  console.log(typeof $scope.fold);

  switch ($scope.fold) {
    case '0':
      $scope.msg_sent = {};
      $scope.msg_sent.IdSender = 3;
      $scope.msg_sent.IdReceiver = 0;
      $scope.msg_sent.msg_direct_comment = '% to %';

      $http.post('/staff/msg_trace', $scope.msg_sent)
        .then(function(response) {
          console.log("response", response);
          $scope.mails = response.data;
        }, function(x) {
          console.log('Server Error');
        });
      break;
    case '1':
      $scope.msg_received = {};
      $scope.msg_received.StaffID = 3;
      $scope.msg_received.msg_direct_comment = 'Staff to Staff';

      $http.post('/staff/msg_received', $scope.msg_received)
        .then(function(response) {
          console.log("response", response);
          $scope.mails = response.data;
        }, function(x) {
          console.log('Server Error');
        });
      break;
    case '2':
      $scope.msg_received = {};
      $scope.msg_received.StaffID = 3;
      $scope.msg_received.msg_direct_comment = 'Customer to Staff';

      $http.post('/staff/msg_received', $scope.msg_received)
        .then(function(response) {
          console.log("response", response);
          $scope.mails = response.data;
        }, function(x) {
          console.log('Server Error');
        });
      break;
    case '3':
      $scope.msg_received = {};
      $scope.msg_received.StaffID = 3;
      $scope.msg_received.msg_direct_comment = 'Landlord to Staff';

      $http.post('/staff/msg_received', $scope.msg_received)
        .then(function(response) {
          console.log("response", response);
          $scope.mails = response.data;
        }, function(x) {
          console.log('Server Error');
        });
      break;
    case '4':
      $scope.msg_received = {};
      $scope.msg_received.StaffID = 3;
      $scope.msg_received.msg_direct_comment = 'Thirdparty to Staff';

      $http.post('/staff/msg_received', $scope.msg_received)
        .then(function(response) {
          console.log("response", response);
          $scope.mails = response.data;
        }, function(x) {
          console.log('Server Error');
        });
      break;
    case '5':
      $scope.msg_received = {};
      $scope.msg_received.StaffID = 3;
      $scope.msg_received.msg_direct_comment = 'Staff to Customer';

      $http.post('/staff/msg_received', $scope.msg_received)
        .then(function(response) {
          console.log("response", response);
          $scope.mails = response.data;
        }, function(x) {
          console.log('Server Error');
        });
      break;
    case '6':
      $scope.msg_received = {};
      $scope.msg_received.StaffID = 3;
      $scope.msg_received.msg_direct_comment = 'Staff to Landlord';

      $http.post('/staff/msg_received', $scope.msg_received)
        .then(function(response) {
          console.log("response", response);
          $scope.mails = response.data;
        }, function(x) {
          console.log('Server Error');
        });
      break;
    case '7':
      $scope.msg_received = {};
      $scope.msg_received.StaffID = 3;
      $scope.msg_received.msg_direct_comment = 'Staff to Thirdparty';

      $http.post('/staff/msg_received', $scope.msg_received)
        .then(function(response) {
          console.log("response", response);
          $scope.mails = response.data;
        }, function(x) {
          console.log('Server Error');
        });
      break;
      default:
        $scope.msg_received = {};
        $scope.msg_received.StaffID = 3;
        $scope.msg_received.msg_direct_comment = 'Customer to Staff';

        $http.post('/staff/msg_received', $scope.msg_received)
          .then(function(response) {
            console.log("response", response);
            $scope.mails = response.data;
          }, function(x) {
            console.log('Server Error');
          });
        break;
  }
  // mails.all().then(function(mails) {
  //   $scope.mails = mails;
  // });


}]);

app.controller('MailDetailCtrl', ['$scope', '$http', '$state', 'mails', '$stateParams', function($scope, $http, $state, mails, $stateParams) {
  $scope.fold = $stateParams.foldId;
  $scope.contents = "";
  switch ($scope.fold) {
    case '0':
      $scope.msg_sent = {};
      $scope.msg_sent.IdSender = 3;
      $scope.msg_sent.IdReceiver = 0;
      $scope.msg_sent.msg_direct_comment = '% to %';

      $http.post('/staff/msg_trace', $scope.msg_sent)
        .then(function(response) {
          console.log("response", response);
          $scope.mails = response.data;
          angular.forEach($scope.mails, function(value, key){
              if (value.idMsg_sr == $stateParams.mailId) {
                  $scope.mail = value;
                  $scope.mail.from = 'Staff';
                  //******标记信息已读******//
                  $http.post('/staff/msg_confirm', {'idMsg_sr':value.idMsg_sr})
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
      break;
    case '1':
      $scope.msg_received = {};
      $scope.msg_received.StaffID = 3;
      $scope.msg_received.msg_direct_comment = 'Staff to Staff';

      $http.post('/staff/msg_received', $scope.msg_received)
        .then(function(response) {
          console.log("response", response);
          $scope.mails = response.data;
          angular.forEach($scope.mails, function(value, key){
              if (value.idMsg_sr == $stateParams.mailId) {
                  $scope.mail = value;
                  $scope.mail.from = 'Staff';
                  //******标记信息已读******//
                  $http.post('/staff/msg_confirm', {'idMsg_sr':value.idMsg_sr})
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
      break;
    case '2':
      $scope.msg_received = {};
      $scope.msg_received.StaffID = 3;
      $scope.msg_received.msg_direct_comment = 'Customer to Staff';

      $http.post('/staff/msg_received', $scope.msg_received)
        .then(function(response) {
          console.log("response", response);
          $scope.mails = response.data;
          console.log(typeof $stateParams.mailId);
          angular.forEach($scope.mails, function(value, key){
              if (value.idMsg_sr == $stateParams.mailId) {
                $scope.mail = value;
                $scope.mail.from = 'Customer';
                //******标记信息已读******//
                $http.post('/staff/msg_confirm', {'idMsg_sr':value.idMsg_sr})
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
      break;
    case '3':
      $scope.msg_received = {};
      $scope.msg_received.StaffID = 3;
      $scope.msg_received.msg_direct_comment = 'Landlord to Staff';

      $http.post('/staff/msg_received', $scope.msg_received)
        .then(function(response) {
          console.log("response", response);
          $scope.mails = response.data;
          angular.forEach($scope.mails, function(value, key){
              if (value.idMsg_sr == $stateParams.mailId) {
                  $scope.mail = value;
                  $scope.mail.from = 'Landlord';
                  //******标记信息已读******//
                  $http.post('/staff/msg_confirm', {'idMsg_sr':value.idMsg_sr})
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
      break;
    case '4':
      $scope.msg_received = {};
      $scope.msg_received.StaffID = 3;
      $scope.msg_received.msg_direct_comment = 'Thirdparty to Staff';

      $http.post('/staff/msg_received', $scope.msg_received)
        .then(function(response) {
          console.log("response", response);
          $scope.mails = response.data;
          angular.forEach($scope.mails, function(value, key){
              if (value.idMsg_sr == $stateParams.mailId) {
                  $scope.mail = value;
                  $scope.mail.from = 'Thirdparty';
                  //******标记信息已读******//
                  $http.post('/staff/msg_confirm', {'idMsg_sr':value.idMsg_sr})
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
      break;
    case '5':
      $scope.msg_received = {};
      $scope.msg_received.StaffID = 3;
      $scope.msg_received.msg_direct_comment = 'Staff to Customer';

      $http.post('/staff/msg_received', $scope.msg_received)
        .then(function(response) {
          console.log("response", response);
          $scope.mails = response.data;
          angular.forEach($scope.mails, function(value, key){
              if (value.idMsg_sr == $stateParams.mailId) {
                  $scope.mail = value;
                  $scope.mail.from = 'Staff';
                  //******标记信息已读******//
                  $http.post('/staff/msg_confirm', {'idMsg_sr':value.idMsg_sr})
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
      break;
    case '6':
      $scope.msg_received = {};
      $scope.msg_received.StaffID = 3;
      $scope.msg_received.msg_direct_comment = 'Staff to Landlord';

      $http.post('/staff/msg_received', $scope.msg_received)
        .then(function(response) {
          console.log("response", response);
          $scope.mails = response.data;
          angular.forEach($scope.mails, function(value, key){
              if (value.idMsg_sr == $stateParams.mailId) {
                $scope.mail = value;
                $scope.mail.from = 'Staff';
                //******标记信息已读******//
                $http.post('/staff/msg_confirm', {'idMsg_sr':value.idMsg_sr})
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
      break;
    case '7':
      $scope.msg_received = {};
      $scope.msg_received.StaffID = 3;
      $scope.msg_received.msg_direct_comment = 'Staff to Thirdparty';

      $http.post('/staff/msg_received', $scope.msg_received)
        .then(function(response) {
          console.log("response", response);
          $scope.mails = response.data;
          angular.forEach($scope.mails, function(value, key){
              if (value.idMsg_sr == $stateParams.mailId) {
                  $scope.mail = value;
                  $scope.mail.from = 'Staff';
                  //******标记信息已读******//
                  $http.post('/staff/msg_confirm', {'idMsg_sr':value.idMsg_sr})
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
      break;
      default:
        $scope.msg_received = {};
        $scope.msg_received.StaffID = 3;
        $scope.msg_received.msg_direct_comment = 'Customer to Staff';

        $http.post('/staff/msg_received', $scope.msg_received)
          .then(function(response) {
            console.log("response", response);
            $scope.mails = response.data;
            angular.forEach($scope.mails, function(value, key){
                if (value.idMsg_sr == $stateParams.mailId) {
                  $scope.mail = value;
                  $scope.mail.from = 'Customer';
                  //******标记信息已读******//
                  $http.post('/staff/msg_confirm', {'idMsg_sr':value.idMsg_sr})
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
        break;
  }

  $scope.Send = function(){
    $scope.Reply = {};
    $scope.Reply.title = $scope.mail.title;
    $scope.Reply.content = $scope.contents;
    $scope.Reply.StaffID = 3;
    $scope.Reply.IdReceiver = $scope.mail.idSender;
    $scope.Reply.msg_direct_comment = $scope.msg_received.msg_direct_comment;
    console.log($scope.Reply);
    $http.post('/staff/msg_write', $scope.Reply)
      .then(function(response) {
        console.log("response", response);
        $state.go("app.mail.list");
      }, function(x) {
        console.log('Server Error');
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
  vm.tolist = [];
  if (JSON.stringify(getDataCommonService.get()) !== "{}") {
    $localStorage.tolist = getDataCommonService.get().data;
    vm.tolist = $localStorage.tolist;
  } else {
    vm.tolist = $localStorage.tolist;
  }

  vm.Send = function() {
    // TODO: 管理员ID 以及客户ID 需要跟用户名和email关联，这里无法找到
    // StaffID和IdReceiver暂时使用固定值
    vm.writeData = {};
    vm.writeData.title = vm.mail.title;
    vm.writeData.content = vm.mail.content;
    vm.writeData.StaffID = 3;
    vm.writeData.IdReceiver = 1;
    vm.writeData.msg_direct_comment = 'Staff to Customer';
    console.log(vm.mail);
    console.log(vm.writeData);
    $http.post('/staff/msg_write',vm.writeData)
        .then(function(response) {
          console.log("response", response);
        }, function(x) {
          console.log('Server Error');
        });
      $state.go('app.mail.list');
  }

}]);

angular.module('app').directive('labelColor', function() {
  return function(scope, $el, attrs) {
    $el.css({
      'color': attrs.color
    });
  }
});
