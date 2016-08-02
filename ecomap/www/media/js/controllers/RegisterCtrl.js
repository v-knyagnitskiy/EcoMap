app.controller('RegisterCtrl', ['$scope', '$http', '$cookies', '$rootScope', '$auth', '$state', 'msg', 'toaster',
  function($scope, $http, $cookies, $rootScope,$auth, $state, msg, toaster) {
    $scope.newUser = {};
    $rootScope.metadata = function(){
      metaTags = {
        'title': "Екологічні проблеми України",
        'description': 'Реєстрація'
      }
      return metaTags;
    }
    $scope.msg = msg;
    $scope.Register = function(user) {
      $scope.submitted = true;
      if (!user.email || !user.first_name || !user.last_name || !user.nickname || !user.password || !user.pass_confirm) {
        return null;
      }
      $rootScope.isFetching = true;
      if (user.password == user.pass_confirm) {
        $auth.signup(user).then(function successCallback(responce) {
          var credentials = {};
          credentials.email = $scope.newUser.email;
          credentials.password = $scope.newUser.password;
          $auth.login(credentials).then(function(responce) {
            $rootScope.UserCredentials = responce.data.name + ' ' + responce.data.surname ;
            $state.go('map');
            $scope.msg.registerSuccess();
            $rootScope.isFetching = false;
          });
        }, function errorCallback(responce) {
          $rootScope.isFetching = false;
        });
      }
    };
  }
]);