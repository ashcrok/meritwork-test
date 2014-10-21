/**
 * Created by ashcrok on 10/2/2014.
 */
dexterApp.controller('UserManagementCtrl', function ($scope, $http, $cookies, $modal) {

    $scope.sidebarCategory = 'dashboard';
    $scope.$emit('select_sidebar_cat', $scope.sidebarCategory);


});