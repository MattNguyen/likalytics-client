'use strict';

var FacebookInitializer = function($window, auth) {
  $window.fbAsyncInit = function() {
    FB.init({
      appId: '306263542879837',
      cookie: true,
      status: true,
      xfbml: true,
      channelUrl: '/channel.html'
    });

    auth.checkIfLoggedIn();
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
};

module.exports = FacebookInitializer;
