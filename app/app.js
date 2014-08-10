'use strict';

var angular = require('angular');

// Services
var Authentication = require('./services/authentication_service');
var UserSession = require('./services/user_session_service');
var AuthInterceptor = require('./services/auth_interceptor_service');

// Controllers
var MainController = require('./controllers/main_controller');

// Initial Scripts
var FacebookInitializer = require('./config/initializers/facebook');
var RouteRestrictor = require('./config/initializers/route_restrictor');

// App
var app = angular.module('likalyzer', [require('angular-ui-router')]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    access: {
      loginRequired: true
    }
  });

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    access: {
      loginRequired: false
    }
  });

  $urlRouterProvider.otherwise('/');
}]);

app.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  notAuthenticated: 'auth-not-authenticated'
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});

app.factory('UserSession', UserSession);
app.factory('Authentication', ['$http', '$rootScope', 'AUTH_EVENTS', 'UserSession', Authentication]);
app.factory('AuthInterceptor', ['$rootScope', '$q', AuthInterceptor]);

app.controller('MainController', ['$scope', '$location', 'AUTH_EVENTS', 'Authentication', 'UserSession', MainController]);

// Run initialization scripts
app.run(['$window', 'Authentication', FacebookInitializer]);
app.run(['$rootScope', '$location', RouteRestrictor]);
