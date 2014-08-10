'use strict';

var MainController = function($scope, $location, AUTH_EVENTS, Authentication, UserSession) {
  $scope.currentUser = null;

  $scope.setCurrentUser = function(user) {
    $scope.currentUser = user;
  };

  $scope.login = function() {
    console.log('logging in...');
    Authentication.login();
  };

  $scope.$on(AUTH_EVENTS.loginSuccess, function() {
    console.log('logged in');
    $scope.currentUser = UserSession;
    $location.path('/');
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function() {
    console.log('not authenticated');
  });
};

module.exports = MainController;
