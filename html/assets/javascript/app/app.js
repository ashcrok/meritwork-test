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
        });
}]);