/**
 * @Date:   2017-06-30T10:20:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-18T12:33:08+10:00
 */
app.controller('MailCtrl', ['$scope', '$http','mails', function($scope, $http,mails) {
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
  //=======================================
  vm.getMessages();

  $http.post('/staff/msg_received', vm.msg_received)
    .then(function(response) {
      console.log("response", response);
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
      name: 'Staff to Staff',
      filter: 'starred'
    },
    {
      name: 'Customer to Staff',
      filter: 'sent'
    },
    {
      name: 'Landlord to Staff',
      filter: 'important'
    },
    {
      name: 'Thirdparty to Staff',
      filter: 'draft'
    },
    {
      name: 'Staff to Customer',
      filter: 'trash'
    },
    {
      name: 'Staff to Landlord',
      filter: 'trash'
    },
    {
      name: 'Staff to Thirdparty',
      filter: 'trash'
    }
  ];
  /*angular.forEach($scope.msg_direct, function(value, key) {
    for (var i = 0; i < array.length; i++) {
      array[i]
    }

  });*/


  vm.labels = [{
      name: 'Angular',
      filter: 'angular',
      color: '#23b7e5'
    },
    {
      name: 'Bootstrap',
      filter: 'bootstrap',
      color: '#7266ba'
    },
    {
      name: 'Client',
      filter: 'client',
      color: '#fad733'
    },
    {
      name: 'Work',
      filter: 'work',
      color: '#27c24c'
    }
  ];

  vm.addLabel = function() {
    vm.labels.push({
      name: vm.newLabel.name,
      filter: angular.lowercase(vm.newLabel.name),
      color: '#ccc'
    });
    vm.newLabel.name = '';
  }

  vm.labelClass = function(label) {
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
  mails.all().then(function(mails) {
    $scope.mails = mails;
  });
}]);

app.controller('MailDetailCtrl', ['$scope', 'mails', '$stateParams', function($scope, mails, $stateParams) {
  mails.get($stateParams.mailId).then(function(mail) {
    $scope.mail = mail;
  })
}]);

app.controller('MailNewCtrl', ['$scope', 'mails', '$http', '$state', function($scope, mails, $http, $state) {
  /*  $scope.mail = {
      to: '',
      subject: '',
      content: ''
    }*/
  var vm = this;
  vm.mail = {
    StaffID: 1,
    IdReceiver: '',
    to: '',
    title: '',
    content: '',
    msg_direct_comment: ''
  }
/*  vm.tolist = [
    {name: 'James', email:'james@gmail.com'},
    {name: 'Luoris Kiso', email:'luoris.kiso@hotmail.com'},
    {name: 'Lucy Yokes', email:'lucy.yokes@gmail.com'}
  ];*/



  /*$http.post('/staff/admin_customer_check', {
    'inputStr': ''
  }).then(function(response) {
    angular.forEach(response.data, function(value, key) {
      var customer = new Customer({
        name: value.CName,
        email: value.CEmail
      });
      customer.save();
    });
  }, function(x) {
    console.log('Server Error');
  });*/
  vm.getCustomers = function() {
        mails.getCustomers()
            .then(function(customers) {
                    vm.tolist = customers;
                    var chosenSelect=$("#OneChosen");
                    angular.forEach(vm.tolist, function(value, key) {
                      var html ="<option value='"+value.name+"' class='ng-binding ng-scope'>"+value.email+"</option>";
                      chosenSelect.append(html);
                    console.log('albums returned to controller.',customers);
                  });
                },
                function(data) {
                    console.log('albums retrieval failed.')

       });
     }
  vm.getCustomers();
  /*  for (var i = 0; i < array.length; i++) {
      array[i]
    }*/

  vm.Send = function() {
    $state.go('app.mail.list');
    /*$http.post('/staff/msg_write',$scope.mail)
        .then(function(response) {
          console.log("response", response);
        }, function(x) {
          console.log('Server Error');
        });*/
  }

}]);

angular.module('app').directive('labelColor', function() {
  return function(scope, $el, attrs) {
    $el.css({
      'color': attrs.color
    });
  }
});
