'use strict';

var RouteRestrictor = function($rootScope, $location) {
  $rootScope.$on('$stateChangeStart', function(event, next) {
    if (next.access.loginRequired && !sessionStorage.token) {
      $location.path('/login');
    }
  });
};

module.exports = RouteRestrictor;
