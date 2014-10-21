/**
 * Created by radu on 14/08/14.
 */
'use strict';

var dexterApp = angular.module('dexterApp', [
    'ngRoute',
    'ngCookies',
    'ui.bootstrap',
    'textAngular'
]);

dexterApp.config(["$httpProvider", "$routeProvider", function($httpProvider, $routeProvider) {
    /*
     * HTTP Provider - Correct POST / GET requests
     */
    $httpProvider.defaults.transformRequest = function (data) {
        if(data == undefined){
            return data
        }
        return $.param(data)
    }

    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";

    /*
     * Route Provider -
     */
    $routeProvider.
        when('/', {
            templateUrl: 'partials/main.html',
            controller: 'HomeCtrl'
        }).
        when('/dashboard', {
            templateUrl: 'partials/dashboard.html',
            controller: 'DashBoardCtrl'
        }).
        when('/dashboard/company', {
            templateUrl: 'partials/dashboard/company.html',
            controller: 'CompanyCtrl'
        }).
        when('/dashboard/user-management', {
            templateUrl: 'partials/dashboard/userManagement.html',
            controller: 'UserManagementCtrl'
        }).
        when('/statistics', {
            templateUrl: 'partials/statistics.html',
            controller: 'StatisticsCtrl'
        }).
        when('/forum/:page', {
            templateUrl: 'partials/forum.html',
            controller: 'ForumCtrl'
        }).
        when('/forum/thread/:thread/page/:page', {
            templateUrl: 'partials/forum/thread.html',
            controller: 'ThreadCtrl'
        }).
        when('/qa', {
            templateUrl: 'partials/qa.html',
            controller: 'QaCtrl'
        }).
        when('/dashboard/editprofile', {
            templateUrl: 'partials/dashboard/edit.html',
            controller: 'EditCtrl'
        }).
        otherwise({
            redirectTo: '/dashboard'
        });
}]);