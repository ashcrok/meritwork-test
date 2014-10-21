/**
 * Created by ashcrok on 10/21/2014.
 */
'use strict';

var myApp = angular.module('myApp', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
]);

myApp.config(["$httpProvider", "$routeProvider", function($httpProvider, $routeProvider) {
    /*
     * HTTP Provider - Correct POST / GET requests
     */
    $httpProvider.defaults.transformRequest = function (data) {
        if (data == undefined) {
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
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });

}]);