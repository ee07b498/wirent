/**
 * @Date:   2017-06-30T10:20:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-18T12:24:10+10:00
 */
// A RESTful factory for retreiving mails from 'mails.json'
app.factory('mails', ['$http', '$q', function($http, $q) {
  var path = 'js/app/mail/mails.json';
  var mails = $http.get(path).then(function(resp) {
    return resp.data.mails;
  });

  function all() {
    return mails;
  };

  function get(id) {
    return mails.then(function(mails) {
      for (var i = 0; i < mails.length; i++) {
        if (mails[i].id == id) return mails[i];
      }
      return null;
    })
  };
  var tolist = [];
  function Customer(music) {
    this.name = music.name;
    this.email = music.email;
  }
  Customer.prototype.save = function() {
    // 操作数据库，将数据保存到具体的数据表中
    tolist.push({
      name: this.name,
      email: this.email
    })
  }

  function getCustomers() {
    var def = $q.defer();
    $http({
      method: 'post',
      url: '/staff/admin_customer_check',
      data: {
        'inputStr': ''
      }
    }).success(function(data, status, headers, config) {
      tolist = [];
      console.log('get success...');
      angular.forEach(data, function(value, key) {
        var customer = new Customer({
          name: value.CName,
          email: value.CEmail
        });
        customer.save();
      });
      def.resolve(tolist);
    }).error(function(data, status, headers, config) {
      console.log('get error...');
      def.reject("Failed to get albums");
    });
    return def.promise;
  }
  //==============get the received messages==============
  function getMessages() {
    var msg_received = {};
    msg_received.StaffID = 3;
    msg_received.msg_direct_comment = '% to Staff';
    var def = $q.defer();
    $http({
      method: 'post',
      url: '/staff/msg_received',
      data: msg_received
    }).success(function(data, status, headers, config) {
      console.log('get success...');
      def.resolve(data);
    }).error(function(data, status, headers, config) {
      console.log('get error...');
      def.reject("Failed to get albums");
    });
    return def.promise;
  }
  return {
    all: all,
    get: get,
    getCustomers: getCustomers,
    getMessages: getMessages
  }
}]);
