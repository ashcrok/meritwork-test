/**
 * Created by ashcrok on 9/10/14.
 */

dexterApp.controller('EditCtrl', function($scope, $http, $cookies) {

    $scope.sidebarCategory = 'dashboard';
    $scope.$emit('select_sidebar_cat', $scope.sidebarCategory);

    var sessionId               = $cookies.session;
    $scope.loggedUser           = {};
    $scope.sidebarToggled       = false;

    $http.post(
        apiUrl + 'users/loggedIn.json',
        {
            'sessionId': sessionId
        }).success(function(data) {
            $scope.loggedUser = data;
            /* --> USERDATA DEFAULT VALUES
            $scope.input.email = $scope.loggedUser.user.email;
            $scope.input.firstName = $scope.loggedUser.user.firstName;
            $scope.input.lastName = $scope.loggedUser.user.lastName;
            $scope.input.avatar = $scope.loggedUser.user.avatar;
            */
        }).error(function(data, status) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    $scope.sidebarToggle = function() {
        $("#wrapper").toggleClass("toggled");
        $scope.sidebarToggled = !$scope.sidebarToggled;
    };


    $scope.changeData = function() {
        if (!$scope.input) {
            $scope.errorData = 'true';
            $scope.errorMessageData = 'No changes have been detected.';
        } else {
            $scope.errorData = 'false';
            if ($scope.input.email) {
                var email = $scope.input.email;
            } else {
                var email = $scope.loggedUser.user.email;
            }
            if ($scope.input.firstName) {
                var firstName = $scope.input.firstName;
            } else {
                var firstname = $scope.loggedUser.user.firstName;
            }
            if ($scope.input.lastName) {
                var lastName = $scope.input.lastName;
            } else {
                var lastName = $scope.loggedUser.user.lastName;
            }
            if ($scope.input.avatar) {
                var avatar = $scope.input.avatar;
            } else {
                var avatar = $scope.loggedUser.user.avatar;
            }

            $http.post(
                apiUrl + 'users/update.json',
                {
                    'sessionId':    sessionId,
                    'email':        email,
                    'firstName':    firstName,
                    'lastName':     lastName,
                    'avatar':       avatar
                }).success(function(data) {
                    if(data.success == true) {
                        $scope.successData = 'true';
                        $scope.successMessageData = 'All data has been saved.';
                    } else {
                        $scope.successData = 'true';
                        $scope.successMessageData = 'All data has been saved. (2)';
                    }
                }).error(function(data, status) {

                });
        }
    };


    $scope.changePassword = function(){
        if (!$scope.input) {
            $scope.errorPassword = 'true';
            $scope.errorMessagePassword = 'No changes detected.';
        } else {
            if (!$scope.input.currentPassword || !$scope.input.newPassword || !$scope.input.confirmNewPassword) {
                $scope.errorPassword = 'true';
                $scope.errorMessagePassword = 'All fields must be completed.';
            } else {
                var jssha1             = new jsSHA($scope.input.currentPassword, "TEXT");
                var currentPassword    = jssha1.getHash("SHA-1", "HEX");
                if (currentPassword != $scope.loggedUser.user.password) {
                    $scope.errorPassword = 'true';
                    $scope.errorMessagePassword = 'Current Password is not correct.';
                } else {
                    if ($scope.input.newPassword != $scope.input.confirmNewPassword) {
                        $scope.errorPassword = 'true';
                        $scope.errorMessagePassword = 'New Password and Confirm New Password must be the same.';
                    } else {
                        $scope.errorPassword = 'false';
                        var jssha2          = new jsSHA($scope.input.newPassword, "TEXT");
                        var newPassword     = jssha2.getHash("SHA-1", "HEX");
                        $http.post(
                            apiUrl + 'users/update.json',
                            {
                                'sessionId': sessionId,
                                'password':  newPassword
                            }).success(function(data) {
                                if (data.success == true) {
                                    $scope.successPassword = 'true';
                                    $scope.successMessagePassword = 'Password change success.';
                                } else {
                                    $scope.successPassword = 'true';
                                    $scope.successMessagePassword = 'Password change success. (2)';
                                    console.log(data);
                                }
                            }).error(function(data,status){

                            });
                    }
                }
            }
        }
    };


    $scope.closeErrorPassword = function() {
        $scope.errorPassword = 'false';
    }

    $scope.closeSuccessPassword = function() {
        $scope.successPassword = 'false';
    }

    $scope.closeErrorData = function() {
        $scope.errorData = 'false';
    }

    $scope.closeSuccessData = function() {
        $scope.successData = 'false';
    }
});