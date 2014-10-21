/**
 * Created by ashcrok on 10/10/2014.
 */

dexterApp.controller('NewPosterCtrl', function($http, $scope, $modalInstance, $cookies) {

    $scope.input = {};

    $scope.ok = function() {
        if(!$scope.input.url || !$scope.input.link) {
            $scope.error = 'true';
            $scope.errorMessage = 'The ulr and link of the poster cannot be blank.';
        } else {
            $scope.error = 'false';
            var url         = $scope.input.url;
            var link        = $scope.input.link;
            var sessionId   = $cookies.session;

            $http.post(
                apiUrl + 'posters/add.json',
                {
                    'author'    : sessionId,
                    'url'       : url,
                    'link'      : link
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

    $scope.isPicture = function() {
        if ($scope.input.url) {
            return true;
        }
        /* TODO: Verify if the Get action on the url is valid (not 404) */
    }

});