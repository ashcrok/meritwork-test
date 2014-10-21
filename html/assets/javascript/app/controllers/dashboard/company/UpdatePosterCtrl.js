/**
 * Created by ashcrok on 10/10/2014.
 */
dexterApp.controller('UpdatePosterCtrl', function($http, $scope, $modalInstance, posterId) {

    $scope.input = {};

    $http.get(
        apiUrl + "posters/poster/" + posterId + ".json"
        ).success(function(data) {
            $scope.input.url    = data.url;
            $scope.input.link   = data.link;
        });

    $scope.ok = function() {
        if(!$scope.input.url || !$scope.input.link) {
            $scope.error = 'true';
            $scope.errorMessage = 'The ulr and link of the poster cannot be blank.';
        } else {
            $scope.error = 'false';
            var url         = $scope.input.url;
            var link        = $scope.input.link;

            $http.post(
                apiUrl + 'posters/update.json',
                {
                    'id'        : $posterId,
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