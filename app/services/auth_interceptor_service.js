'use strict';

var AuthInterceptor = function($rootScope, $q) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if (sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + sessionStorage.token;
      }

      return config;
    },

    response: function(res) {
      if (res.status === 401) {
        // handle case when request isn't authorized
      }

      return res || $q.when(res);
    }
  };
};

module.exports = AuthInterceptor;
