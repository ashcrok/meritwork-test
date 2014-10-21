/**
 * Created by ashcrok on 10/2/2014.
 */
dexterApp.controller('CompanyCtrl', function ($scope, $http, $cookies, $modal) {

    $scope.sidebarCategory = 'dashboard';
    $scope.$emit('select_sidebar_cat', $scope.sidebarCategory);

    var sessionId = $cookies.session;


    /* ******************* ******************* ******************* ******************* ******************* */
    /* ***** POSTERS ***** ***** POSTERS ***** ***** POSTERS ***** ***** POSTERS ***** ***** POSTERS ***** */
    /* ******************* ******************* ******************* ******************* ******************* */

    $scope.currentPage      = 1;


    /* Initialize pagination */
    $http.post(
        apiUrl + "posters/countUser.json",
        {
            'sessionId' : sessionId
        }).success(function(data) {
            var nrPages = Math.ceil(data / 8);
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

    /* Initialize first list (page 1) */
    $http.post(
        apiUrl + 'posters/listUser.json',
        {
            'sessionId' : sessionId,
            'page'      : 1
        }).success(function(data) {
            $scope.posters = data;
        }).error(function(data, status) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });


    /* Update list and pagination when the page changes */
    $scope.changePage = function(nrPage) {
        $http.post(
            apiUrl + 'posters/listUser.json',
            {
                'sessionId' : sessionId,
                'page'      : nrPage
            }).success(function(data) {
                $scope.posters = data;
                $scope.currentPage = nrPage;

                $scope.prevPage = parseInt($scope.currentPage) - 1;
                $scope.nextPage = parseInt($scope.currentPage) + 1;
            }).error(function(data, status) {
                console.log(data);
                console.log(status);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }

    /* Add new Poster - call the modal */
    $scope.newPoster = function(){
        var newPostModal = $modal.open({
            templateUrl: 'partials/dashboard/company/newPoster.html',
            controller: 'NewPosterCtrl'
        });

        newPostModal.result.then(function(result) {
            location.reload();
        });
    };

    $scope.deletePoster = function(posterId) {
        $http.get(
            apiUrl + 'posters/delete/' + posterId
            ).success(function(data) {
                location.reload();
            }).error(function(data, status) {
                console.log(data);
                console.log(status);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }

    $scope.updatePoster = function(posterId) {
        var newPostModal = $modal.open({
            templateUrl: 'partials/dashboard/company/updatePoster.html',
            controller: 'UpdatePosterCtrl',
            resolve: {
                posterId: function() {
                    return posterId;
                }
            }
        });

        newPostModal.result.then(function(result) {
            location.reload();
        });
    }




    /* ******************* ******************* ******************* ******************* ******************* */
    /* ***** SURVEYS ***** ***** SURVEYS ***** ***** SURVEYS ***** ***** SURVEYS ***** ***** SURVEYS ***** */
    /* ******************* ******************* ******************* ******************* ******************* */

    $scope.currentPageSurvey = 1;
    $scope.checkbox = {};


    /* Initialize pagination */
    $http.post(
        apiUrl + "surveys/countUser.json",
        {
            'sessionId' : sessionId
        }).success(function(data) {
            $scope.nrSurveys = data;
            var nrPages = Math.ceil(data / 8);
            var pages = [];
            for (i=0; i<nrPages; i++) {
                pages[i] = {
                    index: i+1,
                    available: true
                };
            }
            $scope.pagesSurvey    = pages;
            $scope.nrPagesSurvey  = nrPages;
            $scope.prevPageSurvey = parseInt($scope.currentPageSurvey) - 1;
            $scope.nextPageSurvey = parseInt($scope.currentPageSurvey) + 1;
        });

    /* Initialize first list (page 1) */
    $http.post(
        apiUrl + 'surveys/listUser.json',
        {
            'sessionId' : sessionId,
            'page'      : 1
        }).success(function(data) {
            $scope.surveys = data;
        }).error(function(data, status) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });


    /* Add new Survey - call the modal */
    $scope.newSurvey = function(){
        var newPostModal = $modal.open({
            templateUrl: 'partials/dashboard/company/newSurvey.html',
            controller: 'NewSurveyCtrl'
        });

        newPostModal.result.then(function(result) {
            location.reload();
        });
    };

    $scope.deleteSurvey = function() {
        console.log($scope.checkbox);

        /*$http.get(
            apiUrl + 'posters/delete/' + posterId
        ).success(function(data) {
                location.reload();
            }).error(function(data, status) {
                console.log(data);
                console.log(status);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });*/
    }

});