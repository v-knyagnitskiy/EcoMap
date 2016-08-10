app.controller('UserSubscriptionsTableCtrl', ['$scope', '$state', '$http', '$cookies', '$window', '$rootScope',
  function($scope, $state, $http, $cookies, $window, $rootScope) {
    $scope.redirectUserAfterDelete();
    $scope.sortType = 'id'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFish = '';
    $rootScope.metadata = function(){
      metaTags = {
        'title': "Екологічні проблеми України",
        'description': 'Профіль користувача'
      }
      return metaTags;
    }
    $scope.selectCountObj = {
      '1': '5',
      '2': '10',
      '3': '15',
      '4': '20'
    }
    $scope.selectCount = {
      'selected': '5'
    }
    $scope.filterTable = {
      'param': '',
      'order': 1
    }
    $scope.filterClick = false;
    $scope.sortFilter = function(filtr){
          $scope.filterClick = true;
          $scope.filterTable.param = filtr;
          var par = "order_"+$scope.filterTable.param;
          $scope.filterTable[par] = $scope.filterTable[par]?0:1;
          $scope.loadProblems();
    }
    $scope.getStatus = function(status) {
      var statuses = {
        'Unsolved': 'Не вирішено',
        'Solved': 'Вирішено'
      };
      return statuses[status];
    };

    $scope.showTable = false;
    $scope.nickname = false;
    $scope.searchNick = null;
    $scope.loadProblems = function() {
      var user_id = $cookies.get('id');
      $scope.msg = msg;
      $scope.fromPage = 1;
      $scope.bigCurrentPage = 1;
      $scope.problemsLength = $scope.selectCount['selected'];
      $scope.bigTotalItems = $scope.problemsLength / $scope.selectCount['selected'] * 10;
      $scope.$watch('bigCurrentPage', function(newValue, oldValue) {
        var stepCount = $scope.selectCount['selected'];
        if ($scope.searchNick){
            $scope.showTable = ($cookies.get('role')=='admin')?true:false;
            $scope.nickname = true;
            $http({
              method: 'GET',
              url: '/api/nickname_subscriptions',
              params: {
                nickname: $scope.searchNick, 
                filtr: $scope.filterTable.param || 'date_subscriptions',
                order: $scope.filterTable["order_"+$scope.filterTable.param] || 0,
                per_page: $scope.selectCount['selected'],
                offset: $scope.selectCount['selected'] * newValue - stepCount
              }
            }).then(function successCallback(response) {
             $scope.subscriptions = response.data[0];
             $scope.problemsLength = response.data[1][0]['total_problem_count'];
             $scope.count = response.data[1][0]['total_problem_count'];
             $scope.bigTotalItems = $scope.problemsLength / $scope.selectCount['selected'] * 10;
           })
        } else if($cookies.get('role')=='admin'){
          $scope.showTable = true;
          $http({
            method: 'GET',
            url: '/api/usersSubscriptions',
            params: {
              filtr: $scope.filterTable.param || 'date_subscriptions',
              order: $scope.filterTable["order_"+$scope.filterTable.param] || 0,
              per_page: $scope.selectCount['selected'],
              offset: $scope.selectCount['selected'] * newValue - stepCount,
            }
          }).then(function successCallback(response) {
            $scope.subscriptions = response.data[0];
            console.log($scope.subscriptions)
            $scope.problemsLength = response.data[1][0]['total_problem_count'];
            $scope.count = response.data[1][0]['total_problem_count'];
            $scope.bigTotalItems = $scope.problemsLength / $scope.selectCount['selected'] * 10;
          })
        }else{  
        $scope.nickname = false;    
        $http({
          method: 'GET',
          url: 'api/usersSubscriptions/' + user_id,
          params: {
            filtr: $scope.filterTable.param || 'date_subscriptions',
            order: $scope.filterTable["order_"+$scope.filterTable.param] || 0,
            per_page: $scope.selectCount['selected'],
            offset: $scope.selectCount['selected'] * newValue - stepCount,
          }
        }).then(function successCallback(response) {
          $scope.subscriptions = response.data[0];
          $scope.problemsLength = response.data[1][0]['total_problem_count'];
          $scope.count = response.data[1][0]['total_problem_count'];
          $scope.bigTotalItems = $scope.problemsLength / $scope.selectCount['selected'] * 10;
        })
        }            
      })
    };

    $scope.loadProblems();

    $scope.triggerDetailModal = function(problem_id) {
      var url = '/#/detailedProblem/' + problem_id;
      window.open(url, '_blank');
    }
  }
]);