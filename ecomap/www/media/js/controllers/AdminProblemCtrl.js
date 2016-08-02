app.controller('ProblemCtrl', ['$scope', '$http', 'toaster', 'msg', 'msgError', 'Upload',
  function($scope, $http, toaster,  msg, msgError, Upload) {

    $scope.msg = msg;
    $scope.msgError = msgError;
    $scope.newProblemType = {};
    $scope.newProblemTypeForm = {};

    $scope.addProblemTypeModal = false;
    $scope.showAddPpoblemTypeModal = function() {
      $scope.addProblemTypeModal = true;
    };

    $scope.check = function(formFile) {
      if (formFile.$error.maxSize) {
        return toaster.pop('error', 'Фото профілю', 'Розмір фото перевищує максимально допустимий!');
      } else {
        return true
      }
    };
    $scope.addProblemSubmit = function(newProblemType) {
      Upload.upload({
      url: '/api/problem_type',
      method: 'POST',
      cache: false,
      headers: {
        'Cache-Control': 'no-cache'
      },
      data: {
        file: newProblemType.picFile,
        problem_type_name: newProblemType.name,
        problem_type_radius: newProblemType.radius
      }
      }).then(function successCallback(data) {
        $scope.loadProblemType();
        $scope.addProblemTypeModal = false;
        $scope.msg.createSuccess('типу проблеми');
      }, function errorCallback(response) {
        $scope.addProblemTypeModal = false;
        $scope.msg.createError('типу проблеми', arguments[0]['data']['msg']);
      });
    };

    $scope.showEditProblemTypeModal= function(id, picture, name, radius) {
      $scope.editProblemTypeObj = {
        'id': id,
        'picture': picture,
        'name': name,
        'radius': radius
      };
      $scope.editProblemTypeModal = true;
      $scope.pathLogo = '/image/markers/'+ $scope.editProblemTypeObj.picture;
    }
    $scope.editProblemSubmit = function(editProblemTypeObj){
      Upload.upload({
      url: '/api/problem_type',
      method: 'PUT',
      cache: false,
      headers: {
        'Cache-Control': 'no-cache'
      },
      data: {
        file: editProblemTypeObj.picFile,
        problem_type_name: editProblemTypeObj.name,
        problem_type_radius: editProblemTypeObj.radius,
        problem_type_id: editProblemTypeObj.id,

      }
      }).then(function successCallback(data) {
        $scope.loadProblemType();
        $scope.editProblemTypeModal = false;
        $scope.msg.editSuccess('типу проблеми');
      }, function errorCallback(response) {
        $scope.editProblemTypeModal = false;
        $scope.msg.editError('типу проблеми', arguments[0]['data']['msg']);
      })
    };

    $scope.deleteProblemType = function(id) {
      $http({
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        url: '/api/problem_type',
        data: {
          'problem_type_id': id
        }
      }).then(function successCallback(data) {
        $scope.loadProblemType();
        $scope.msg.deleteSuccess('типу проблеми');
      }, function errorCallback(response) {
        $scope.msg.deleteError('типу проблеми', arguments[0]['data']['msg']);
      })
    };

  }])
