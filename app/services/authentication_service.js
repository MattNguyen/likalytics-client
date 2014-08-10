'use strict';

//var BPromise = require('bluebird');

var Authentication = function($http, $rootScope, AUTH_EVENTS, UserSession) {
  var Authentication = function(data) {
    return angular.extend(this, data);
  };

  Authentication.isAuthenticated = false;

  Authentication.login = function() {
    return FB.login(function(response) {
      if (response.status === 'connected') {
        console.log('connected');
        FB.api('/me', function(res) {
          var userProfile = {
            fid: res.id,
            email: res.email,
            first_name: res.first_name,
            last_name: res.last_name,
            gender: res.gender,
            access_token: response.authResponse.access_token
          };

          $http.post('http://localhost:8080/api/users', userProfile)
          .then(function(res) {
            UserSession.create(res);
            Authentication.isAuthenticated = true;
            sessionStorage.setItem('token', res.data.sessionToken);

            // send event to MainController
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          })
          .catch(function(err) {
            console.log(err);
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          });
        });
      } else {
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    }, {scope: 'public_profile,email,user_friends,read_stream,publish_actions'});
  };

  Authentication.logout = function() {
    FB.logout();
    Authentication.isAuthenticated = false;
  };

  Authentication.checkIfLoggedIn = function() {
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        console.log('connected');
        if (sessionStorage.getItem('token')) {
          $http.get('http://localhost:8080/api/current_user')
          .then(function(user) {
            Authentication.isAuthenticated = true;
            UserSession.create(user);
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          })
          .catch(function(err) {
            console.log(err);
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          });
        } else {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
      } else if (response.status === 'not_authorized') {
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      } else {
        // redirect to login flow
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    });
  };

  return Authentication;
};

module.exports = Authentication;
