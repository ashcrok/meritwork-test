/**
 * Created by ashcrok on 9/13/14.
 */

dexterApp.controller('ForumCtrl', function ($scope, $http, $cookies, $modal, $location, $route, $routeParams) {

    $scope.sidebarCategory  = 'main';
    $scope.currentPage      = $routeParams.page;
    $scope.$emit('select_sidebar_cat', $scope.sidebarCategory);

    $http.get(
        apiUrl + "threads/count.json"
        ).success(function(data) {
            var nrPages = Math.ceil(data / 10);
            var pages = [];
            for (i=0; i<nrPages; i++) {
                pages[i] = {
                    index: i+1,
                    available: true
                };
            }
            $scope.pages    = pages;
            $scope.nrPages  = nrPages;
            $scope.prevPage = parseInt($scope.currentPage) - 1;
            $scope.nextPage = parseInt($scope.currentPage) + 1;
        });

    $http.post(
        apiUrl + "threads/list.json",
        {
            'page'      : $routeParams.page,
            'sessionId' : $cookies.session
        }).success(function(data) {
            $scope.threads = data;
        });

    $scope.newThread = function(){
        var newThreadModal = $modal.open({
            templateUrl: 'partials/forum/newThread.html',
            controller: 'NewThreadCtrl'
        });

        newThreadModal.result.then(function (result) {
            //redirect to thread
        });
    };
});