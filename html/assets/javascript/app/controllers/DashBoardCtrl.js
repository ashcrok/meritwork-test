/**
 * Created by radu on 05/08/14.
 */
dexterApp.controller('DashBoardCtrl', function ($scope, $http, $cookies, $modal) {

    $scope.sidebarCategory = 'dashboard';
    $scope.$emit('select_sidebar_cat', $scope.sidebarCategory);


    /* Get User Number of Threads */
    $http.post(
        apiUrl + 'threads/countUser.json',
        {
            'sessionId': $scope.sessionId
        }).success(function(data) {
            $scope.nrThreads = data;
        }).error(function(data, status) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    /* Get User Number of Comments */
    $http.post(
        apiUrl + 'posts/countUser.json',
        {
            'sessionId': $scope.sessionId
        }).success(function(data) {
            $scope.nrPosts = data;
        }).error(function(data, status) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
});