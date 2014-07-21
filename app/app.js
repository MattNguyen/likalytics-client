'use strict';

var angular = require('angular');

// Services
var Authentication = require('./services/authentication_service');

// Controllers
var MainController = require('./controllers/main_controller');

// App
var app = angular.module('likalyzer', [require('angular-ui-router')]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');

  $urlRouterProvider.otherwise('/');
}]);

app.factory('Authentication', ['$http', Authentication]);
app.controller('MainController', ['$scope', 'Authentication', MainController]);

app.run(['$rootScope', '$window', 'Authentication', function($rootScope, $window, auth) {
  $window.fbAsyncInit = function() {
    FB.init({
      appId: '306263542879837',
      cookie: true,
      status: true,
      xfbml: true,
      channelUrl: '/channel.html'
    });

    auth.watchAuthStatusChange();
  };

  (function(d){
    var js,
    id = 'facebook-jssdk',
    ref = d.getElementsByTagName('script')[0];

    if (d.getElementById(id)) {
      return;
    }

    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = '//connect.facebook.net/en_US/all.js';

    ref.parentNode.insertBefore(js, ref);

  }(document));
}]);
