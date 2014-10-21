/**
 * Created by ashcrok on 10/21/2014.
 */
myApp.controller('MainCtrl', function ($scope, $http, $window, $location) {

    $http.get(
        apiUrl + 'users/list/1.json'
        ).success(function(data) {
            $scope.users = data;
            for (user in $scope.users) {
                $scope.users[user]['type'] = parseInt($scope.users[user]['type']) + 1;
                $scope.users[user]['type'] = getGetOrdinal($scope.users[user]['type']);
            }
        }).error(function(data, status) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });



});