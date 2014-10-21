/**
 * Created by radu on 29/09/14.
 */
dexterApp.controller('ThreadSettingsCtrl', function ($scope,
                                                     $http,
                                                     $cookies,
                                                     $modal,
                                                     $modalInstance,
                                                     $location,
                                                     threadId) {

    $scope.input = {};

    /* Get Thread Details */
    $http.get(
        apiUrl + 'threads/thread/' + threadId + '.json'
    ).success(function(data) {
            $scope.input        = data;
            $scope.readPerm     = parseInt($scope.input.perm / 10);
            $scope.writePerm    = $scope.input.perm % 10;
            if($scope.input.locked == 1) {
                $scope.input.locked = true;
            } else {
                $scope.input.locked = false;
            }
        });


    /* TODO: Update permissions bugged */
    $scope.ok = function () {
        if(!$scope.input.title) {
            $scope.error = 'true';
            $scope.errorMessage = 'The text content cannot be empty';
        } else {
            $scope.error = 'false';

            var lock = 0;
            if ($scope.input.locked) {
                lock = 1;
            } else {
                lock = 0;
            }

            $http.post(
                apiUrl + 'threads/update.json',
                {
                    'id'    : threadId,
                    'title' : $scope.input.title,
                    'perm'  : $scope.readPerm + "" +  $scope.writePerm,
                    'locked': lock
                }).success(function(data) {
                    if(data.success == 'true') {
                        $modalInstance.close(data);
                    } else {
                        $scope.error = 'true';
                        $scope.errorMessage = data.error;
                    }
                }).error(function(data, status) {
                    $scope.error = 'true';
                    $scope.errorMessage = data.error;
                });
        }
    };


    $scope.delete = function () {
        $http.post(
            apiUrl + 'threads/delete.json',
            {
                'id': threadId
            }).success(function(data) {
                if(data.success) {
                    $modalInstance.close(data);
                    location.href = demoUrl + "#/forum/1";
                } else {
                    $scope.error = 'true';
                    $scope.errorMessage = data.error;
                }
            }).error(function(data, status) {
                console.log(data);
                console.log(status);
            });
    };


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});