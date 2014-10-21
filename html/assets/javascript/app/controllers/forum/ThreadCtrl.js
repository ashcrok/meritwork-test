/**
 * Created by ashcrok on 9/23/14.
 */

dexterApp.controller('ThreadCtrl', function ($scope, $http, $cookies, $modal, $location, $route, $routeParams) {

    $scope.sidebarCategory  = 'main';
    $scope.currentThread    = $routeParams.thread;
    $scope.currentPage      = $routeParams.page;
    $scope.$emit('select_sidebar_cat', $scope.sidebarCategory);

    $scope.sessionId        = $cookies.session;
    $scope.loggedUser       = {};

    $scope.thread           = {};

    /* Get User Details */
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

    /* Get Thread Details */
    $http.get(
        apiUrl + 'threads/thread/' + $scope.currentThread + '.json'
        ).success(function(data) {
            $scope.thread = data;
        });

    /* Get the User Post Count */
    $http.get(
        apiUrl + "posts/count/" + $scope.currentThread + ".json"
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

    /* Get the proper list of comments (posts) */
    $http.get(
        apiUrl + "posts/list/" + $scope.currentThread + "/" + $scope.currentPage + ".json"
        ).success(function(data) {
            $scope.posts = data;
        });


    $scope.newPost = function(){
        var newPostModal = $modal.open({
            templateUrl: 'partials/forum/newPost.html',
            controller: 'NewPostCtrl'
        });

        newPostModal.result.then(function (result) {
            location.reload();
        });
    };

    $scope.updatePost = function(postId) {
        var newPostModal = $modal.open({
            templateUrl: 'partials/forum/updatePost.html',
            controller: 'UpdatePostCtrl',
            resolve: {
                postId: function() {
                    return postId;
                }
            }
        });

        newPostModal.result.then(function (result) {
            location.reload();
        });
    };

    $scope.deletePost = function(postId) {
        $http.post(
            apiUrl + 'posts/delete.json',
            {
                'id': postId
            }).success(function(data) {
                if(data.success) {
                    location.reload();
                } else {
                    $scope.error = 'true';
                    $scope.errorMessage = data.error;
                }
            }).error(function(data, status) {
                console.log(data);
                console.log(status);
            });
    };

    $scope.updateThread = function(threadId) {
        var threadSettingsModal = $modal.open({
            templateUrl: 'partials/forum/threadSettings.html',
            controller: 'ThreadSettingsCtrl',
            resolve: {
                threadId: function() {
                    return threadId;
                }
            }
        });

        threadSettingsModal.result.then(function (result) {
            location.reload();
        });    };


    $scope.updatePostPerm = function(post) {
        return post.author == $scope.loggedUser.user.username;
    };

    $scope.deletePostPerm = function(post) {
        return post.author == $scope.loggedUser.user.username;
    };

});