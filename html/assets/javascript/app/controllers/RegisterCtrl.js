/**
 * Created by ashcrok on 9/9/14.
 */
dexterApp.controller('RegisterCtrl', function ($scope, $http, $location, $cookies, $modalInstance) {

    $scope.input = {};

    $scope.ok = function() {

        if(!$scope.input.username || !$scope.input.password || !$scope.input.repeatPassword ||
            !$scope.input.email || !$scope.input.firstName || !$scope.input.lastName) {
            $scope.error = 'true';
            $scope.errorMessage = 'Complete all fields.';
        } else if ($scope.input.password != $scope.input.repeatPassword) {
            $scope.error = 'true';
            $scope.errorMessage = 'Password and Repeat Password do not coincide.';
        } else {
            $scope.error = 'false';
            var username    = $scope.input.username;
            var jssha       = new jsSHA($scope.input.password, "TEXT");
            var password    = jssha.getHash("SHA-1", "HEX");
            var email       = $scope.input.email;
            var firstName   = $scope.input.firstName;
            var lastName    = $scope.input.lastName;

            $http.post(
                apiUrl + 'users/add.json',
                {
                    'username': username,
                    'password': password,
                    'email': email,
                    'firstName': firstName,
                    'lastName': lastName
                }).success(function(data) {
                    if(data.success == true) {
                        //$cookies.session = data.sessionId;
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
});