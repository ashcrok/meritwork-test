/**
 * Created by ashcrok on 9/25/14.
 */

dexterApp.controller('UpdatePostCtrl', function ($scope,
                                                 $rootScope,
                                                 $http,
                                                 $location,
                                                 $cookies,
                                                 $modalInstance,
                                                 postId) {

    $scope.input = {};
    $scope.disabled = false;

    var initialText;

    $http.get(
            apiUrl + "posts/post/" + postId + ".json"
        ).success(function(data) {
            $scope.input.text   = data.text;
            initialText         = data.text;
        });


    $scope.submit = function() {
        if(!$scope.input.text) {
            $scope.error = 'true';
            $scope.errorMessage = 'The text content cannot be empty';
        } else if ($scope.input.text == initialText) {
            $scope.error = 'true';
            $scope.errorMessage = 'No changes detected.';
        } else {
            $scope.error = 'false';

            $http.post(
                apiUrl + 'posts/update.json',
                {
                    'id'    : postId,
                    'text'  : $scope.input.text
                }).success(function(data) {
                    if(data.success == 'true') {
                        $modalInstance.close(data);
                    } else {
                        $scope.error = 'true';
                        $scope.errorMessage = data.error;
                    }
                }).error(function(data, status) {
                    $scope.error = 'true';
                    $scope.errorMessage = data.error;
                });
        }
    };


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});