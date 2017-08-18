/**
 * @Date:   2017-06-30T10:20:04+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-17T21:42:51+10:00
 */
// A RESTful factory for retreiving mails from 'mails.json'
app.factory('mails', ['$http', function($http) {
  var path = 'js/app/mail/mails.json';
  var mails = $http.get(path).then(function(resp) {
    return resp.data.mails;
  });

  var factory = {};
  factory.all = function() {
    return mails;
  };
  factory.get = function(id) {
    return mails.then(function(mails) {
      for (var i = 0; i < mails.length; i++) {
        if (mails[i].id == id) return mails[i];
      }
      return null;
    })
  };
  return factory;
}]);
