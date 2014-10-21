/**
 * Created by radu on 05/08/14.
 */
dexterApp.controller('MainCtrl', function ($scope, $http, $cookies, $modal, $location) {
    $scope.sessionId            = $cookies.session;
    $scope.loggedUser           = {};
    $scope.sidebarToggled       = false;

    $scope.$on("select_sidebar_cat", function(event, cat){
        $scope.category = cat;

        $http.post(
            apiUrl + 'menus/find.json',
            {
                'sessionId' : $scope.sessionId,
                'category'  : $scope.category
            }).success(function(data) {
                $scope.menus = data;
            }).error(function(data, status) {
            });
    });

    $scope.$on('login', function() {
        $scope.sessionId = $cookies.session;
    });

    $http.post(
        apiUrl + 'users/loggedIn.json',
        {
            'sessionId': $scope.sessionId
        }).success(function(data) {
            $scope.loggedUser = data;
        }).error(function(data, status) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    $scope.sidebarToggle = function($event) {
        $event.preventDefault();
        $("#wrapper").toggleClass("toggled");
        $scope.sidebarToggled = !$scope.sidebarToggled;
    };


    $scope.login = function () {
        var loginModal = $modal.open({
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        });

        loginModal.result.then(function (result) {
            $scope.loggedUser = result;
        });
    };

    $scope.register = function () {
        var loginModal = $modal.open({
            templateUrl: 'partials/register.html',
            controller: 'RegisterCtrl'
        });

        /**loginModal.result.then(function (result) {
            $scope.loggedUser = result;
        });*/
    };

    $scope.logout = function () {
        $http.post(
            apiUrl + 'users/logout.json',
            {
                'sessionId': $scope.sessionId
            }).success(function(data) {
                if(data.success == 'true') {
                    $scope.loggedUser.success = 'false';
                } else {
                    alert('There was an error logging you out. Please try again later.');
                }
            }).error(function(data, status) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };
});