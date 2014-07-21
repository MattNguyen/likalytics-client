var MainController = function($scope, Authentication) {
  $scope.auth = Authentication;
  $scope.currentUser = null;

  $scope.setCurrentUser = function(user) {
    $scope.currentUser = user;
  };
};

module.exports = MainController;
