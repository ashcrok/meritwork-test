/**
 * Created by ashcrok on 9/25/14.
 */

dexterApp.controller('NewPostCtrl', function ($scope, $rootScope, $http, $location, $cookies, $modalInstance, $route, $routeParams) {

    $scope.input = {};
    $scope.disabled = false;

    $scope.ok = function() {

        if(!$scope.input.text) {
            $scope.error = 'true';
            $scope.errorMessage = 'The text of the post cannot be blank.';
        } else {
            $scope.error = 'false';
            var text        = $scope.input.text;
            var threadId    = $routeParams.thread;
            var sessionId   = $cookies.session;

            $http.post(
                apiUrl + 'posts/add.json',
                {
                    'text':         text,
                    'thread':       threadId,
                    'author':       sessionId
                }).success(function(data) {
                    if(data.success) {
                        $modalInstance.close(data);
                    } else {
                        $scope.error = 'true';
                        $scope.errorMessage = data.error;
                    }
                }).error(function(data, status) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log(data);
                    console.log(status);
                });
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});