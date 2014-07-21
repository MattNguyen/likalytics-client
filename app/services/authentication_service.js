var Authentication = function($http) {
  Authentication = function(data) {
    return angular.extend(this, data)
  };

  Authentication.isAuthenticated = false;

  Authentication.login = function() {
    FB.login(function(res) {
      Authentication.isAuthenticated = true;
      console.log(res);
    }, {scope: 'public_profile,email,user_friends,read_stream,publish_actions'});
  };

  Authentication.logout = function() {
    FB.logout();
    Authentication.isAuthenticated = false;
  };

  Authentication.watchAuthStatusChange = function() {
    FB.Event.subscribe('auth.authResponseChange', function(response) {
      if (response.status === 'connected') {
        //make api call to auth endpoint with access_token
        //
      }
    });
  };

  return Authentication;
};

module.exports = Authentication;
