/**
 * Created by radu on 05/08/14.
 */
dexterApp.controller('LoginCtrl', function ($scope, $rootScope, $http, $location, $cookies, $modalInstance) {

    $scope.input = {};

    $scope.ok = function() {

        if(!$scope.input.username || !$scope.input.password) {
            $scope.error = 'true';
            $scope.errorMessage = 'The username or password field cannot be blank.';
        } else {
            $scope.error = 'false';
            var username    = $scope.input.username;
            var jssha       = new jsSHA($scope.input.password, "TEXT");
            var password    = jssha.getHash("SHA-1", "HEX");

            $http.post(
                apiUrl + 'users/login.json',
                {
                    'username': username,
                    'password': password,
                    'remember': 'true'
                }).success(function(data) {
                    if(data.success == 'true') {
                        $cookies.session = data.sessionId;
                        $rootScope.$broadcast('login');
                        $modalInstance.close(data);
                    } else {
                        console.log(data);
                    }
                }).error(function(data, status) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
//                console.log(data);
//                console.log(status);
                });
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});